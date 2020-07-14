import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator, MatTableDataSource} from '@angular/material';
import { StationsService } from 'src/app/modules/stations/stations.service';
import { Station } from 'src/app/models/stations/stations.model';
import { Notify } from 'src/app/modules/notify/notify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from 'src/app/models/project/project.model';
import { ProjectsService } from 'src/app/modules/projects/projects.service';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { Status } from 'src/app/models/tooling/tooling.model';
@Component({
  selector: 'app-stations-config',
  templateUrl: './stations-config.component.html',
  styleUrls: ['./stations-config.component.css']
})
export class StationsConfigComponent implements OnInit {
  stations : Station[];
  stationData: Station;
  idStationEdit=0;
  modalRef: BsModalRef;
  correctVariable:string;
  unit:string;
  stationName:string;
  referencePallet:string;
  referenceContramascara:string;
  contramascaraQty:number;
  modalRef2: BsModalRef;
  projectsArray: Project[];
  projectStationEdit:number;
  public applicationData: ApplicationData;
  stationToDelete:Station;
  action = "save";

  displayedColumns: string[] = ['pkstation','station','project', 'correctVariable', 'unit', 'contramascaraQty', 'action'];
  dataSource :any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private modalService: BsModalService,private stationService: StationsService,private projectService: ProjectsService,private notify:Notify, private historyService: HistoryService) {}

  ngOnInit() {
    this.getAllStations();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
  }

  notifyLoading : any;
 

  getAllStations(){
    this.stationService.findAllStations().subscribe(response =>{
      this.stations = response.data;
      this.dataSource = new MatTableDataSource <Station>(this.stations);
      this.dataSource.paginator = this.paginator;
    });
  }


  openStationModal(template: any, pkStationEdit: number){
    this.action = "edit";
    this.notifyLoading = this.notify.setLoading("Cargando información", this.notifyLoading);
    
    this.stationService.getStationById(pkStationEdit).subscribe(pStation =>{
      this.stationData = pStation.data;
      this.idStationEdit = pkStationEdit;
      this.openModal(template);
      this.correctVariable = this.stationData.correctVariable;
      this.unit = this.stationData.unit;
      this.stationName = this.stationData.stationName;
      this.referencePallet = this.stationData.referencePallet;
      this.referenceContramascara = this.stationData.referenceContramascara;
      this.projectStationEdit=this.stationData.fkProject.pkProject;
      this.contramascaraQty = this.stationData.contramascaraQty;
      this.notifyLoading = this.notify.setLoadingDone("Listo", this.notifyLoading);
      this.getAllProjects();
     
  
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

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
  this.modalRef.setClass('modal-lg');
}

closeModal() {
this.modalService.hide(1);
}
openModal2(template: TemplateRef<any>) {
  this.modalRef2 = this.modalService.show(template);
  this.modalRef2.setClass('modal-md');
}
getAllProjects(){
  this.projectService.findAllProjects().subscribe(pprojects =>{
    this.projectsArray = pprojects;
    console.log(pprojects);
  });
}

chargeStationChanges(){
  if(this.correctVariable.trim()=="" || this.unit.trim()=="" || this.stationName.trim()=="" || this.referenceContramascara.trim()=="" || this.referencePallet.trim()=="" ){
  this.notify.setNotification("Error","Favor de llenar los campos requeridos", "error");
}else{
  if(this.contramascaraQty<1){
  this.notify.setNotification("Error","El numero de contramascaras debe ser mayor a cero", "error");
}else{
  if(this.projectStationEdit<1){
  this.notify.setNotification("Error","Favor de seleccionar el proyecto", "error");
}else{
  this.notifyLoading = this.notify.setLoading("Guardando cambios", this.notifyLoading);
  const objUpdateStation=new Station;
  const objProject=new Project;
  objProject.pkProject=this.projectStationEdit;

  objUpdateStation.contramascaraQty=this.contramascaraQty;
  objUpdateStation.correctVariable=this.correctVariable;
  objUpdateStation.fkProject=objProject;
  objUpdateStation.pkstation=this.idStationEdit;
  objUpdateStation.referenceContramascara=this.referenceContramascara;
  objUpdateStation.referencePallet=this.referencePallet;
  objUpdateStation.stationName=this.stationName;
  objUpdateStation.unit=this.unit;
console.log(objUpdateStation);
  this.saveStationChanges(objUpdateStation);
}
}

}


}

saveStationChanges(objUpdate:Station ){
this.stationService.updateStation(objUpdate).subscribe(
  results =>{
    this.notifyLoading = this.notify.setLoadingDone(" Actualizado", this.notifyLoading);
    if(objUpdate.pkstation==0){
      this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Insertó la estacion (${objUpdate.pkstation})`);
    }else{
    this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Modificó la estacion (${objUpdate.pkstation})`);
  }
  this.closeModal();
this.getAllStations();
  },
  (err: HttpErrorResponse) => {
    if (err.error instanceof Error) {
      console.log("Client-side error");
    } else {
      console.log("Server-side error");
    }
    this.notifyLoading = this.notify.setLoadingError(" Ocurrio un error", this.notifyLoading);
   
  }
);

}
openModalDelete(modal:any, objStation:Station){
  this.stationToDelete=objStation;
  this.openModal2(modal);
}

deleteStation(){
  this.notifyLoading=this.notify.setLoading("Eliminando",this.notifyLoading);
  this.stationService.deleteStation(this.stationToDelete.pkstation).subscribe(
    results =>{
     
      this.notifyLoading = this.notify.setLoadingDone(" Eliminado", this.notifyLoading);
      this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Eliminó la estacion (${this.stationToDelete.stationName})`);
    this.closeModalDelete();
  this.getAllStations();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        console.log("Server-side error");
      }
      this.notifyLoading = this.notify.setLoadingError(" Ocurrio un error", this.notifyLoading);
     
    }
  );
  


}

  closeModalDelete(){
    this.modalService.hide(1);
  }

  openStationModalEmpty(template:any){
    this.idStationEdit =0;
    this.openModal(template);
    this.correctVariable = "";
    this.unit = "";
    this.stationName = "";
    this.referencePallet = "";
    this.referenceContramascara = "";

    this.projectStationEdit=0;
    this.contramascaraQty = 1;
    this.getAllProjects();
    this.action = "save";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
