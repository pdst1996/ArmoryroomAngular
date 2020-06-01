import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Project, PartNumber, Type, objTooling } from '../../models/tooling/tooling.model'
import { Notify } from 'src/app/modules/notify/notify';

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
  partNumber : PartNumber;
  partNumbers : PartNumber[];
  type : Type;
  types : Type[];
  public projectSelected : number;
  public partNumberSelected : number;
  public typeSelected : string ;
  public cantMaintance : number;
  public cantPasses : number;
  public serialTooling : string;

  constructor(private toolingService: ToolingService, private notify : Notify, private element : ElementRef) {
    
  }

  ngOnInit() {
    this.projectSelected = 0;
    this.partNumberSelected = 0.1;
    this.typeSelected = "Elige...";
    this.cantMaintance = 0;
    this.cantPasses = 0;
    this.serialTooling = "";
    this.getAllProjects();
    this.getAllTypes();
  }

  getAllProjects(){
    this.toolingService.findAllProjects().subscribe(pprojects =>{
      this.projects = pprojects;
    });
  }

  getPartNumbersByProject(pPkProject: number){
    this.toolingService.getPartNumbersByProject(pPkProject).subscribe(pPartNumbers =>{
      this.partNumbers = pPartNumbers;
      if(this.partNumbers != undefined && this.partNumbers.length != 0){
        this.partNumberSelected = 0;
      }else{
        this.partNumberSelected = 0.1;
      }
    });
  }

  getAllTypes(){
    this.toolingService.findAllTypes().subscribe(ptypes =>{
      this.types = ptypes;
    });
  }

  loadPartnumbers(){
    this.notify.setLoading("Espera un momento",1000,800);
    this.getPartNumbersByProject(this.projectSelected);
  }

  saveTooling(){

    if(this.projectSelected == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un proyecto", "error");
      this.element.nativeElement.querySelector("#slProject").focus();
    }
    else if(this.partNumberSelected == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un numero de parte", "error");
      this.element.nativeElement.querySelector("#slPartNumber").focus();
    }
    else if(this.typeSelected == "Elige..."){
      this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un tipo de herramental", "error");
      this.element.nativeElement.querySelector("#slType").focus();
    }
    else if(this.serialTooling == ""){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe un numero de serial", "error");
      this.element.nativeElement.querySelector("#txtSerialTooling").focus();
    }
    else if(this.typeSelected == "Magazine" && this.cantMaintance == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe las semanas para mantenimiento", "error");
      this.element.nativeElement.querySelector("#txtMaintance").focus();
    }
    else if(this.typeSelected == "Pallet" && this.cantPasses == 0){
      this.notify.setNotification("CAMPO VACIO", "Por favor escribe la cantidad de pasadas", "error");
      this.element.nativeElement.querySelector("#txtPasses").focus();
    }
    else{
      this.notify.setLoading(" Guardando herramental",2000,1500);
      const obj = new objTooling();
      obj.tooling = this.serialTooling;
      //obj. = this.typeSelected;
      //this.clearForm();
    }
  }

  clearForm(){
    this.projectSelected = 0;
    this.partNumberSelected = 0.1;
    this.typeSelected = "Elige...";
    this.cantMaintance = 0;
    this.cantPasses = 0;
    this.serialTooling = "";
    this.getAllProjects();
    this.getAllTypes();
  }
}