import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tooling, Status, objTooling, objTooling2} from 'src/app/models/tooling/tooling.model';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Notify } from 'src/app/modules/notify/notify';
import { HttpErrorResponse } from '@angular/common/http';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';


@Component({
  selector: 'app-show-toolings',
  templateUrl: './show-toolings.component.html',
  styleUrls: ['./show-toolings.component.css']
})
export class ShowToolingsComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
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
  public valueStatus:string;
  public valueInOut = 'poner';

  tooling : Tooling;
  notifyLoading : any;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private modalService: BsModalService, private toolingService: ToolingService, private notify:Notify, private historyService: HistoryService) {}

  ngOnInit() {
    this.getAllToolings();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
  }

  changeStatus(modal:any, objTool:objTooling2,action:number){
    this.newStatus = action;
    this.toolingToChangeStatus = new objTooling2();
    this.toolingToChangeStatus = objTool;
    console.log(objTool)
    this.valueStatus = (action == 9) ? 'scrap' : 'cuarentena';
    this.openModal2(modal);
    this.valueInOut = (action == 5) ? 'sacar de' : 'poner en';
  }

  saveNewStatus(){
    this.notifyLoading = this.notify.setLoading(`${(this.newStatus == 9) ? "Scrapeando" : `${(this.newStatus == 2) ? 'Sacando de' : 'Poniendo en'} cuarentena`}`, this.notifyLoading);
    this.toolingService.inOutToolings(this.toolingToChangeStatus.tooling,this.newStatus).subscribe(
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
