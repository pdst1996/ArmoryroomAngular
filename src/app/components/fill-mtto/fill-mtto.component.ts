import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FillMttoService } from '../../modules/fill-mtto/fill-mtto.service';
import { Notify } from '../../modules/notify/notify';
import { MatTableDataSource, MatRadioChange } from '@angular/material';
import { Question, Answer, MaintenanceInsert } from '../../models/questions/questions.model';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';

@Component({
  selector: 'app-fill-mtto',
  templateUrl: './fill-mtto.component.html',
  styleUrls: ['./fill-mtto.component.css']
})
export class FillMttoComponent implements OnInit {

  tooling = '';
  comments = '';
  modalRef : BsModalRef;
  notifyLoader : any;
  dataSource : any;
  displayedColumns: string[] = ['question','answer'];
  resultsTable : Question[];
  answers : Answer[];
  applicationData : ApplicationData;
  btnDisabled = false;

  constructor(private element : ElementRef, 
    private modalService : BsModalService, 
    private fillmttoService: FillMttoService,
    private notify : Notify) { }

  ngOnInit() {
    this.element.nativeElement.querySelector("#txtTooling").focus();
    this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
  }

  saveChecklist(){
    if(this.answers.length != this.resultsTable.length){
      this.notify.setNotification("Error","Tienes preguntas sin contestar","error");
    }else{
      this.btnDisabled = true;
      this.notifyLoader = this.notify.setLoading("Enviando cuestionario", this.notifyLoader);
      var objMaintenance = new MaintenanceInsert();
      objMaintenance.tooling = this.tooling;
      objMaintenance.comments = this.comments;
      objMaintenance.answers = this.answers;
      objMaintenance.username = this.applicationData.userInfo.userName;
      this.fillmttoService.insertNewChecklist(objMaintenance).subscribe(
        results => {
          if(results.success){
            this.notifyLoader = this.notify.setLoadingDone("Listo", this.notifyLoader);
            this.notify.setNotification("LISTO","Se ha enviado tu cuestionario a revisión","success");
            this.modalRef.hide();
          }else{
            this.notify.setNotification("Error",results.message,"error");
            this.notifyLoader = this.notify.setLoadingError("Error", this.notifyLoader);
          }
          this.btnDisabled = false;
        }
      );
    }
  }

  focusButton(){
    this.element.nativeElement.querySelector("#btnSubmit").focus();
  }

  changeAnswer(radio:MatRadioChange, question:Question){
    var isNew = true;
    var index = 0;
    for (var i = 0; i < this.answers.length ; i++) {
      if(this.answers[i].pkQuestion == question.pkQuestion){
        index = i;
        isNew = false;
      }
    }
    if(isNew){
      this.answers.push(new Answer(question.pkQuestion,radio.value))
    }else{
      this.answers[index] = new Answer(question.pkQuestion,radio.value);
    }
  }

  fillModalChecklist(template:any){
    this.notifyLoader = this.notify.setLoading("Validando herramental", this.notifyLoader);
    this.fillmttoService.findQuestionsByTool(this.tooling).subscribe(
      results =>{
        if(results.success){
          this.notifyLoader = this.notify.setLoadingDone("Listo", this.notifyLoader);
          this.resultsTable = results.data;
          this.dataSource =  new MatTableDataSource <Question>(this.resultsTable);
          this.openModal(template);
          this.answers = new Array<Answer>();
        }else{
          this.notify.setNotification("Error",results.message,"error");
          this.notifyLoader = this.notify.setLoadingError("Error", this.notifyLoader);
        }
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

}
