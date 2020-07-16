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
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



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
  partNumbersUniversal : PartNumber42q[];
  type : Type;
  types : Type[];
  stations : Station[];
  stationSelected : number[];
  public projectSelected : number;
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
  public partNumbersSelected: FormControl = new FormControl();
  public partNumbersFilterCtrl: FormControl = new FormControl();
  public partNumbersFiltered: ReplaySubject<PartNumber42q[]> = new ReplaySubject<PartNumber42q[]>(1);
  public filteredBanks: ReplaySubject<PartNumber42q[]> = new ReplaySubject<PartNumber42q[]>(1);
  private _onDestroy = new Subject<void>();

  constructor(private toolingService: ToolingService, private notify : Notify, private element : ElementRef, private historyService:HistoryService, private slimService : Slim) {
   
  }

  ngOnInit() {
    this.projectSelected = 0;
    this.stationSelected = new Array<number>();
    this.partNumbersUniversal =new Array<PartNumber42q>();
    this.typeSelected = 0;
    this.cantMaintance = 0;
    this.cantPasses = 0;
    this.serialTooling = "";
    this.buttonDisabled = false;
    this.positionTooling = "";
    this.rackTooling = "";
    this.cantNotification = 0;
    this.getAllProjects();
    this.getAllTypes();
    this.getAllStations();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
   
  }

  private filterBanksMulti() {
    if (!this.partNumbersUniversal) {
      return;
    }
    // get the search keyword
    let search = this.partNumbersFilterCtrl.value;
    if (!search) {
      this.partNumbersFiltered.next(this.partNumbersUniversal.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.partNumbersFiltered.next(
      this.partNumbersUniversal.filter(part => part.part_number.toLowerCase().indexOf(search) > -1)
    );
  }


  getAllProjects(){
    this.toolingService.findAllProjects().subscribe(pprojects =>{
      this.projects = pprojects;
    });
  }

  
  getPartNumbersByProject(pPkProject: number){
    this.partNumbersUniversal = new Array<PartNumber42q>();
    this.partNumbersFiltered = new ReplaySubject<PartNumber42q[]>(1);

    this.toolingService.getPartNumbersByProject42q(pPkProject).subscribe(results =>{
      this.partNumbersUniversal = results.data;
      this.notifyLoading = this.notify.setLoadingDone("Listo", this.notifyLoading);

      this.partNumbersFiltered.next(this.partNumbersUniversal.slice());
      this.partNumbersFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanksMulti();
        });
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

    console.log(this.partNumbersSelected.value)
    if(this.projectSelected == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un proyecto", "error");
      this.element.nativeElement.querySelector("#slProject").focus();
    }
    else if(this.partNumbersSelected.value == null){
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
    else if((this.typeSelected == 3 || this.typeSelected == 5)  && this.cantNotification > this.cantPasses){
      this.notify.setNotification("CAMPO VACIO", "La notificacion debe ser menor que para mtto", "error");
      this.element.nativeElement.querySelector("#txtNotificationPallet").focus();
    }
    else if(this.typeSelected == 2 && this.cantNotification > this.cantMaintance){
      this.notify.setNotification("CAMPO VACIO", "La notificacion debe ser menor que para mtto", "error");
      this.element.nativeElement.querySelector("#txtNotificationMagazine").focus();
    }
    else{
      this.notifyLoading = this.notify.setLoading(" Guardando herramental", this.notifyLoading);
      this.buttonDisabled = true;
      var pns = new Array<string>();
      for (const pn of this.partNumbersSelected.value) {
        pns.push(pn.part_number)
      }
      const obj = new objTooling();
      obj.tool = this.serialTooling;
      obj.partNumbers = pns;
      obj.position = this.positionTooling;
      obj.rack = this.rackTooling;
      obj.mtceMagazine = this.cantMaintance;
      obj.mtcePallet = this.cantPasses;
      obj.fkType = Number(this.typeSelected);
      obj.fkStatus = 5;
      obj.fkStations =  this.stationSelected;
      obj.qtyNotification = this.cantNotification+"";
      obj.idProject = Number(this.projectSelected);
      console.log(obj)
      this.saveNewTooling(obj);
      
    }
  }

  clearForm(){
    this.projectSelected = 0;
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