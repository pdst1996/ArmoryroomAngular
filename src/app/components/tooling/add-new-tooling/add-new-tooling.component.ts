import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { objTooling } from '../../../models/tooling/tooling.model'
import { Notify } from 'src/app/modules/notify/notify';
import { HttpErrorResponse } from '@angular/common/http';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { Project } from 'src/app/models/project/project.model';
import { PartNumber, PartNumber42q } from 'src/app/models/part-number/part-number.model';
import { Type } from 'src/app/models/type/type.model';
import { Station } from 'src/app/models/stations/stations.model';
import { Slim } from 'src/app/modules/slim/slim';




@Component({
  selector: 'app-add-new-tooling',
  templateUrl: './add-new-tooling.component.html',
  styleUrls: [
    './add-new-tooling.component.css'
]
})
export class AddNewToolingComponent implements OnInit {
  
  project : Project;
  projects : Project[];
  partNumbers : PartNumber42q[];
  partNumbersUniversal : PartNumber42q[];
  type : Type;
  types : Type[];
  stations : Station[];
  stationSelected : number[];
  public projectSelected : number;
  public partNumberSelected : string;
  public typeSelected : number ;
  public cantMaintance : number;
  public cantPasses : number;
  public serialTooling : string;
  public notifyLoading : any;
  public buttonDisabled : boolean;
  public positionTooling : string;
  public rackTooling : string;
  public applicationData: ApplicationData;
  public cantNotification :number;

  constructor(private toolingService: ToolingService, private notify : Notify, private element : ElementRef, private historyService:HistoryService, private slimService : Slim) {
   
  }

  ngOnInit() {
    this.projectSelected = 0;
    this.stationSelected = new Array<number>();
    this.partNumberSelected = "";
    this.typeSelected = 0;
    this.cantMaintance = 0;
    this.cantPasses = 0;
    this.serialTooling = "";
    this.buttonDisabled = false;
    this.positionTooling = "";
    this.rackTooling = "";
    this.cantNotification = 0;
    this.partNumbers = new Array<PartNumber42q>();
    this.getAllProjects();
    this.getAllTypes();
    this.getAllStations();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
   
  }

  getAllProjects(){
    this.toolingService.findAllProjects().subscribe(pprojects =>{
      this.projects = pprojects;
    });
  }

  // searchPartNumbers(){
   
  //  for (const iterator of this.partNumbersUniversal) {
  //    if(iterator.part_number.startsWith(this.partNumberSelected)){
  //      this.partNumbers.push(iterator);
  //    }
  //  }
  // }

  getPartNumbersByProject(pPkProject: number){
    this.toolingService.getPartNumbersByProject42q(pPkProject).subscribe(results =>{
      this.partNumbers = results.data;
      this.notifyLoading = this.notify.setLoadingDone("Listo", this.notifyLoading);
    });
  }

  getAllTypes(){
    this.toolingService.findAllTypes().subscribe(ptypes =>{
      this.types = ptypes;
    });
  }

  getAllStations(){
    this.toolingService.findAllStations().subscribe(results =>{
      this.stations = results.data;
      console.log(this.stations)
    });
  }

  saveNewTooling(toolingObj: objTooling){
    console.log(toolingObj)
    this.toolingService.saveNewTooling(toolingObj).subscribe(
      results =>{
        if(results.success == null){
          this.notifyLoading = this.notify.setLoadingDone(" Insertado", this.notifyLoading);
          this.clearForm();
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Insertó un nuevo herramental (${toolingObj.tool})`);
        }else{
          this.notifyLoading = this.notify.setLoadingError(" Error", this.notifyLoading);
          this.notify.setNotification("ERROR", results.message, "error");
          this.buttonDisabled = false;
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

  loadPartnumbers(){
    this.notifyLoading = this.notify.setLoading("Espera un momento", this.notifyLoading);
    this.getPartNumbersByProject(this.projectSelected);
  }

  saveTooling(){

    if(this.projectSelected == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un proyecto", "error");
      this.element.nativeElement.querySelector("#slProject").focus();
    }
    else if(this.partNumberSelected == ""){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona al menos un numero de parte", "error");
      this.element.nativeElement.querySelector("#slPartNumber").setAttribute("class","shake-element");
      setTimeout(()=>{
        this.element.nativeElement.querySelector("#slPartNumber").setAttribute("class","");
      },1000)
    }
    else if(this.typeSelected == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un tipo de herramental", "error");
      this.element.nativeElement.querySelector("#slType").focus();
    }
    else if(this.serialTooling == ""){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe un numero de serial", "error");
      this.element.nativeElement.querySelector("#txtSerialTooling").focus();
    }
    else if(this.typeSelected == 2 && this.cantMaintance <= 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe las semanas para mantenimiento", "error");
      this.element.nativeElement.querySelector("#txtMaintance").focus();
    }
    else if((this.typeSelected == 3 || this.typeSelected == 5) && this.cantPasses <= 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe la cantidad de pasadas", "error");
      this.element.nativeElement.querySelector("#txtPasses").focus();
    }
    else if(this.cantNotification <= 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe la cantidad para notificación", "error");
    }
    else if(this.cantNotification > this.cantPasses){
      this.notify.setNotification("CAMPO VACIO", "La notificcion debe ser menor que para mtto", "error");
    }
    else{
      this.notifyLoading = this.notify.setLoading(" Guardando herramental", this.notifyLoading);
      this.buttonDisabled = true;
      const obj = new objTooling();
      obj.tool = this.serialTooling;
      //obj.fkPartNumbers = this.partNumberSelected;
      obj.position = this.positionTooling;
      obj.rack = this.rackTooling;
      obj.mtceMagazine = this.cantMaintance;
      obj.mtcePallet = this.cantPasses;
      obj.fkType = Number(this.typeSelected);
      obj.fkStatus = 5;
      obj.fkStations =  this.stationSelected;
      obj.qtyNotification = this.cantNotification+""
      console.log(obj)
      this.saveNewTooling(obj);
      
    }
  }

  clearForm(){
    this.projectSelected = 0;
    this.partNumberSelected = "";
    this.stationSelected = new Array<number>();
    this.typeSelected = 0;
    this.cantMaintance = 0;
    this.cantPasses = 0;
    this.serialTooling = "";
    this.positionTooling = "";
    this.rackTooling = "";
    this.cantNotification = 0;
    this.getAllProjects();
    this.getAllTypes();
    this.getAllStations();
    this.buttonDisabled = false;
  }
}