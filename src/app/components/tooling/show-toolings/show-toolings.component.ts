import { Component, OnInit,ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tooling, Status, objTooling, objTooling2} from 'src/app/models/tooling/tooling.model';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Notify } from 'src/app/modules/notify/notify';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData, Profile } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { UploadService } from 'src/app/modules/tooling/upload.service';
import { of, Subscription } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  


@Component({
  selector: 'app-show-toolings',
  templateUrl: './show-toolings.component.html',
  styleUrls: ['./show-toolings.component.css']
})
export class ShowToolingsComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  toolingTable : Tooling[];
  statusArray : Status[];
  displayedColumns: string[] = ['id','project','serial', 'type', 'qtyPasses', 'qtyMtto', 'proxMtto', 'status', 'controls'];
  dataSource :any;
  idToolingEdit = 0;
  public typeTooling = 0;
  public serialToolingEdit = '';
  public projectToolingEdit = '';
  public typeToolingEdit = '';
  public statusToolingEdit = 0;
  public mttoToolingEdit = 'NA';
  public rackToolingEdit = '';
  public positionToolingEdit = '';
  public qtyMttoPassesEdit = 7;
  public qtyCurrentPasesEdit = 3;
  public qtyTotalPasesEdit = 10;
  public qtyLifePasesEdit = 3000;
  public applicationData: ApplicationData;
  public newStatus : number;
  public toolingToChangeStatus : objTooling2;
  public toolingToScrap : Tooling;
  public valueStatus:string;
  public valueInOut = 'poner';
  public profileAdmin = false;
  public notificationToolingEdit = "";
  public commentScrap = "";
  public currentfile : any;
  public fileScrap : any;
  subscriptions: Subscription[] = [];
  imgSrcEvidence = "";
  commentScrapShow = "";
  withoutFile = false;

  tooling : Tooling;
  notifyLoading : any;
  
  @ViewChild("fileUpload", {static: true}) fileUpload: ElementRef;
  files  = [];  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private modalService: BsModalService, private toolingService: ToolingService, private notify:Notify, 
    private historyService: HistoryService,
    private uploadService: UploadService) {}

  ngOnInit() {
    this.getAllToolings();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    let profiles :any;
    if(this.applicationData != null){
      profiles = this.applicationData.profiles; 
    }
    
    for (const profile of profiles) {
      if(profile.idProfile==2){
        this.profileAdmin = true;
      }
    }
    
  }

  viewScrapEvidence(modal:any, objTool:Tooling){

    this.toolingService.showEvidenceScrap(objTool.pkTooling).subscribe(
      results =>{
        console.log(results)
        this.openModal4(modal);
        this.imgSrcEvidence = Constants.pathUpload + results.data.fileName;
        this.commentScrapShow = results.data.comments;
        if(results.data.fileName == null ){
          this.withoutFile = true;
        }else if(results.data.fileName.trim() == ""){
          this.withoutFile = true;
        }else{
          this.withoutFile = false;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      }
    );
  }
  
  scrapTool(modal:any, objTool:Tooling){
    this.toolingToScrap = objTool;
    this.openModal3(modal);
  }

  onFileSelected(event:any) {
    if(event.target.files.length > 0){
       this.currentfile = event.target.files[0];
    }
  }
   
  uploadFile() {  

    const file = this.currentfile;
    var extAllowed = [".png",".jpg", "jpeg", ".pdf"] ;
    var extension = "";
    var allowed =  false;
    var allFine = false;

    if (file != null) {
      extension = (file.name.substring(file.name.lastIndexOf("."))).toLowerCase();
      for (var i = 0; i < extAllowed.length; i++) {
        if (extAllowed[i] == extension) {
          allowed = true;
        }
      }
    }
    
    if (this.commentScrap == "") {
      this.notify.setNotification("Error", "¡Escriba un comentario!", "error");
    }
    else{
      allFine = true;
    }
    if(file != null && !allowed){
      this.notify.setNotification("Error", "¡Selecciona una evidencia con extensión: [.png, .jpg, jpeg, .pdf]!", "error");
      allFine = false;
    }
    else if(file != null){
      allFine = true;
      if(file.size > 2048000){
        this.notify.setNotification("Error", "¡La evidencia debe pesar como máximo 2 MB", "error");
        allFine = false;
      }else{
        allFine = true;
      }
    } 

    if (allFine){

      this.notifyLoading = this.notify.setLoading("Scrapeando herramental", this.notifyLoading);
      this.toolingService.changeStatus(this.toolingToScrap.tooling, 9).subscribe(
        results =>{
          this.notify.setNotification("Listo", "El herramental se mando a scrap con éxito", "success");
          this.notifyLoading = this.notify.setLoadingDone(" Cambios guardados", this.notifyLoading);
          this.modalRef2.hide();
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Se puso en scrap al herramental (${this.toolingToScrap.tooling})`);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error");
          } else {
            console.log("Server-side error");
          }
        }
      );
      
      if(file != null){
        const formData = new FormData();  
        formData.append('file', file);  
        formData.append('comments', this.commentScrap);
        this.uploadService.upload(formData, file.name, this.toolingToScrap.pkTooling).subscribe( 
          results =>{
            if(results.success){
              this.notify.setNotification("Listo", "¡Se guardó la evidencia!", "success");
              this.getAllToolings();
              this.modalRef3.hide();
            }else{
              this.notify.setNotification("Error", results.message, "error");
            }
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error");
            } else {
              console.log("Server-side error");
            }
          }
        );
      }else{
        this.uploadService.uploadWF(this.commentScrap, this.toolingToScrap.pkTooling).subscribe( 
          results =>{
            if(results.success){
              this.getAllToolings();
              this.modalRef3.hide();
            }else{
              this.notify.setNotification("Error", results.message, "error");
            }
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error");
            } else {
              console.log("Server-side error");
            }
          }
        );
      }
    }
  }

  changeStatus(modal:any, objTool:objTooling2,action:number){
    this.newStatus = action;
    this.toolingToChangeStatus = new objTooling2();
    this.toolingToChangeStatus = objTool;
    this.valueStatus = (action == 9) ? 'scrap' : 'cuarentena';
    this.openModal2(modal);
    this.valueInOut = (action == 5) ? 'sacar de' : 'poner en';
  }

  saveNewStatus(){
    this.notifyLoading = this.notify.setLoading(`${(this.newStatus == 9) ? "Scrapeando" : `${(this.newStatus == 2) ? 'Sacando de' : 'Poniendo en'} cuarentena`}`, this.notifyLoading);
    this.toolingService.changeStatus(this.toolingToChangeStatus.tooling,this.newStatus).subscribe(
      results =>{
        this.notifyLoading = this.notify.setLoadingDone(" Cambios guardados", this.notifyLoading);
        this.modalRef2.hide();
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Se puso en ${(this.newStatus == 9) ? "scrap" : "cuarentena"} al herramental (${this.toolingToChangeStatus.tooling})`);
        this.getAllToolings();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      }
    );
  }

  getAllToolings(){
    this.toolingService.getAllToolings().subscribe(ptoolings =>{
      this.toolingTable = ptoolings;
      this.dataSource = new MatTableDataSource <Tooling>(this.toolingTable);
      this.dataSource.paginator = this.paginator;
    });
  }

  openToolingModal(template: any, pkToolingEdit: number){
      this.notifyLoading = this.notify.setLoading("Cargando información", this.notifyLoading);
      
      this.toolingService.getToolingById(pkToolingEdit).subscribe(pTooling =>{
        this.tooling = pTooling;
        this.idToolingEdit = pkToolingEdit;
        this.openModal(template);
        this.typeTooling = this.tooling.fkType.pktype;
        this.serialToolingEdit = this.tooling.tooling;
        this.projectToolingEdit = this.tooling.project.substring(0,this.tooling.project.length-1);
        this.typeToolingEdit = this.tooling.fkType.type;
        this.statusToolingEdit = this.tooling.fkStatus.pkstatus;
        this.mttoToolingEdit =  (this.tooling.nextMtce != null) ? ''+this.weeksBetween(new Date(), new Date(this.tooling.nextMtce.replace('T',' ').substring(0,10))) : "NA";
        this.rackToolingEdit =  this.tooling.rack;
        this.positionToolingEdit = this.tooling.position;
        this.notificationToolingEdit = this.tooling.qtyNotification;
        if(this.typeTooling  != 2){
          this.qtyMttoPassesEdit = this.tooling.mtceQty;
          this.qtyCurrentPasesEdit = this.tooling.actualQty;
          this.qtyTotalPasesEdit = this.tooling.totalQty;
          this.qtyLifePasesEdit = this.tooling.lifeQty;
        }
        this.getAllStatus();
        this.notifyLoading = this.notify.setLoadingDone("Listo", this.notifyLoading);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
        this.notifyLoading = this.notify.setLoadingError("No se pudo completar", this.notifyLoading);
      }
    );
    
  }

  chargeToolingChanges(){
    if(this.mttoToolingEdit == "NA")
      this.mttoToolingEdit = "0";

    if(isNaN(Number(this.mttoToolingEdit)) || this.mttoToolingEdit == ""){
      this.notify.setNotification("Error","Las semanas para mantenimiento no son numericas", "error");
    }
    if(isNaN(Number(this.qtyMttoPassesEdit)) || this.qtyMttoPassesEdit == null){
      this.notify.setNotification("Error","Las pasadas para mantenimiento no son numericas", "error");
    }
    else{
      this.notifyLoading = this.notify.setLoading("Guardando cambios", this.notifyLoading)
      const objTolingEdit = new objTooling();
      objTolingEdit.tool = this.serialToolingEdit;
      objTolingEdit.fkStatus = this.statusToolingEdit;
      objTolingEdit.rack = this.rackToolingEdit;
      objTolingEdit.position = this.positionToolingEdit;
      objTolingEdit.mtceMagazine = Number(this.mttoToolingEdit);
      objTolingEdit.mtcePallet = this.qtyMttoPassesEdit;
      this.saveToolingChanges(objTolingEdit);
    }
     
  }

  saveToolingChanges(objTolingEdit : objTooling){
    this.toolingService.updateTooling(objTolingEdit, this.idToolingEdit).subscribe(
      results =>{
        this.notifyLoading = this.notify.setLoadingDone(" Actualizado", this.notifyLoading);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Modificó el herramental (${objTolingEdit.tool})`);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
        this.notifyLoading = this.notify.setLoadingError(" Ocurrio un error", this.notifyLoading);
        this.getAllToolings();
      }
    );
  }
 
  getAllStatus(){
    this.toolingService.findAllStatus().subscribe(pstatus =>{
      this.statusArray = pstatus;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);
    this.modalRef2.setClass('modal-md');
  }

  openModal3(template: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(template);
    this.modalRef3.setClass('modal-lg');
    this.commentScrap = "";
    
    this.modalService.onHidden.subscribe((reason: string) => {
      this.currentfile = null;
      this.fileScrap = "";
    })
    
  }

  openModal4(template: TemplateRef<any>) {
    this.modalRef4 = this.modalService.show(template);
    this.modalRef4.setClass('modal-lg');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  weeksBetween(d1:any, d2:any) {
    let result = Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    if(result < 0)
      result = 0;
    return result;
  }

}
