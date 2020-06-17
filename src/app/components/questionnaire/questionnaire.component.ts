import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Maintenance, Question, Signature, Maintenance2 } from '../../models/questionnaire/questionnaire.model';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData, Profile, User } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QuestionnaireService } from 'src/app/modules/questionnaire/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['question',  'tooling', 'answer', 'action', 'comments', 'status'];
  displayedColumnsQuestions: string[] = ['question', 'answer', 'correct'];
  dataSource : any;
  dataSourceQuestions : any;
  notifyLoader : any;
  applicationData :ApplicationData;
  modalRef : BsModalRef;
  modalRef2 : BsModalRef;
  questionnaires : Maintenance[];
  averageMaintenanceClass = '';
  userMaintenance = '';
  idMaintenance = '';
  dateMaintenance = '';
  processSignDone = false;
  processSignPermission = false;
  processSignRejected = false;
  qualitySignDone = false;
  qualitySignPermission = false;
  qualitySignRejected = false;
  public profiles: Profile[];
  currentMaintenance : Maintenance;
  imgSrc = '';
  valueSign = '';
  actionSign : boolean;
  departmentSign = '';
  processSigner : string;
  qualitySigner : string;

  constructor(private questionnaireService: QuestionnaireService, 
    private element: ElementRef, 
    private  notify: Notify, 
    private historyService: HistoryService,
    private modalService : BsModalService,
    private serviceHistory : HistoryService) { }

  ngOnInit() {
    this.applicationData = JSON.parse( localStorage.getItem(Constants.localStorage) );
    this.getAllQuestionnaires();

    if(this.applicationData != null){
      this.profiles = this.applicationData.profiles; 
    }
    for (const profile of this.applicationData.profiles) {
      if(profile.idProfile==42){
        this.processSignPermission = true;
      }
      if(profile.idProfile==43){
        this.qualitySignPermission = true;
      }
    }
  }

  getAllQuestionnaires(){

    this.notifyLoader = this.notify.setLoading("Cargando cuestionarios",this.notifyLoader);
    this.questionnaireService.findAllQuestionnaires().subscribe( results =>{
      this.questionnaires = results.data;
      this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
      this.dataSource = new MatTableDataSource <Maintenance>(this.questionnaires);
      this.dataSource.paginator = this.paginator;
    });
  }

  openModalQuestionnaire(template:any, objMaintenance:Maintenance){
    this.currentMaintenance = objMaintenance;
    this.openModal(template);
    this.dateMaintenance = objMaintenance.dateMtce.replace('T',' ').substring(0,16);
    this.userMaintenance = objMaintenance.userName;
    this.idMaintenance = objMaintenance.pkMaintenance+"";
    this.averageMaintenanceClass = "c100 p45";
    this.processSignDone = false;
    this.processSignRejected = false;
    this.qualitySignDone = false;
    this.qualitySignRejected = false;
    this.processSignPermission = false;
    this.qualitySignPermission = false;
    this.notifyLoader = this.notify.setLoading("Cargando datos",this.notifyLoader)
    this.questionnaireService.findQuestionsByMaintenance(''+objMaintenance.pkMaintenance).subscribe(
      results =>{
        this.dataSourceQuestions = new MatTableDataSource <Question>(results.data);
        let array = new Array<Question>();
        array = results.data;
        let average = 0, total = 0;
        for (const iterator of array) {
          if(iterator.answer.toUpperCase() == iterator.correctAnswer.toUpperCase()) total+=100 ;
        }
        
        if(total != 0)
          average = total / (array.length*100);
        this.averageMaintenanceClass = "c100 p"+(Number(this.dosDecimales(average))*100);

      }
    );

    this.loadSignsOfMaintenance();
    this.imgSrc = "http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee="+objMaintenance.userName;
  }

  loadSignsOfMaintenance(){

    this.questionnaireService.findSignaturesByMaintenance(this.currentMaintenance.pkMaintenance+"").subscribe(
      resultsSignatures =>{
        console.log(resultsSignatures)
        let array = new Array<Signature>();
        array = resultsSignatures.data;
        for (const iterator of array) {
          if(iterator.department.toLowerCase()=="procesos" && iterator.approved) {
            this.processSignDone = true ;
            this.processSigner = iterator.username;
          }
          else if(iterator.department.toLowerCase()=="procesos" && !iterator.approved) this.processSignRejected = true ;
          if(iterator.department.toLowerCase()=="calidad" && iterator.approved) {
            this.qualitySignDone = true ;
            this.qualitySigner = iterator.username;
          }
          else if(iterator.department.toLowerCase()=="calidad" && !iterator.approved) this.qualitySignRejected = true ;
        }
        for (const profile of this.applicationData.profiles) {
          if(profile.idProfile==42){
            this.processSignPermission = true;
          }
          if(profile.idProfile==43){
            this.qualitySignPermission = true;
          }
        }
        this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader)
      }
    );
  }

  signMaintenance(department:string, action:boolean, template2:any){

    this.openModalConfirm(template2);
    this.valueSign = (action) ? 'aprobar' : 'denegar';
    this.actionSign = action;
    this.departmentSign = department;
    
  }

  addSignMaintenance(){
    let objSign = new Maintenance2();
    objSign.approved= this.actionSign;
    objSign.department = this.departmentSign;
    objSign.username = this.applicationData.userInfo.userName;
    objSign.fkMaintenance = new Maintenance(Number(this.currentMaintenance.pkMaintenance));
    objSign.comments = "xd";
    objSign.dateSign = "";

    this.notifyLoader = this.notify.setLoading("Firmando mantenimiento",this.notifyLoader);
    this.questionnaireService.signMaintenance(objSign).subscribe(
      resultsSignatures =>{
        if(resultsSignatures.success){
          this.notifyLoader = this.notify.setLoadingDone("Firmada", this.notifyLoader);
          this.loadSignsOfMaintenance();
          this.modalRef2.hide();
          this.serviceHistory.insertNewHistory(this.applicationData.userInfo.userName, `Se ${(this.valueSign) ? 'aprobó' : 'denegó'} el mantenimiento ${this.currentMaintenance.pkMaintenance} por el dep. de ${this.departmentSign}`);
        }else{
          this.notifyLoader = this.notify.setLoadingError("Ocurrio un error",this.notifyLoader);
          this.notify.setNotification("Error",resultsSignatures.message,"error");
        }
       
      }
    );
  }

  dosDecimales(n:number) {
    let t=n.toString();
    let regex=/(\d*.\d{0,1})/;
    return t.match(regex)[0];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  openModalConfirm(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);
    this.modalRef2.setClass('modal-md');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
