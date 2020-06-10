import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Notify } from 'src/app/modules/notify/notify';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';

export class ValidationResults {
  constructor(serial: string, message: string){
    this.serial = serial;
    this.message = message;
  }
  serial: string;
  message: string;
}

@Component({
  selector: 'app-in-out-toolings',
  templateUrl: './in-out-toolings.component.html',
  styleUrls: ['./in-out-toolings.component.css']
})
export class InOutToolingsComponent implements OnInit {

  public radioModel = 'in';
  public txtToolings : string ;
  public notifyLoading : any;
  public iconButtonValidate : string;
  public iconButtonValidateEmployee : string ;
  public btnSaveEnabled = false;
  public spCountSerials = 0;
  public tableErrorsHidden = true;
  public ELEMENT_DATA : ValidationResults[];
  public dataSource : any;
  public statusAvailablesToIn = ["In Line"];
  public statusAvailablesToOut = ["In tool","In maintance"];
  public serialsDone = false;
  public delieveringEmployee = "";
  public receivingEmployee = "";
  public employeesDone = false;
  public applicationData : ApplicationData;
  public contentTooltip:string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['serial','message'];
  constructor(private notify : Notify, private element : ElementRef, private toolingService: ToolingService, private historyService: HistoryService) { }

  ngOnInit() {
    this.txtToolings = "";
    this.iconButtonValidate = "<i class=\"fas fa-check-circle\"></i>";
    this.iconButtonValidateEmployee = "<i class=\"fas fa-check-circle\"></i>";
    this.ELEMENT_DATA = new Array<ValidationResults>();
    this.applicationData  = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    this.contentTooltip  = "Solo podrás cambiar entrada/salida mientras estés editando los seriales"
  }

  saveInOut(){
    this.notifyLoading = this.notify.setLoading(`Guadando ${(this.radioModel == 'in') ? "entradas" : "salidas"}`, this.notifyLoading);
    var toolingsToInOut = this.getToolingsSerialsFormated();
    this.toolingService.inOutToolings(toolingsToInOut, (this.radioModel == 'in') ? 5 : 6).subscribe(
      results =>{
        this.notifyLoading = this.notify.setLoadingDone(" Cambios guardados", this.notifyLoading);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Se les dio ${(this.radioModel == 'in') ? "entrada" : "salida"} a los herramentales (${toolingsToInOut}) entregó: ${this.delieveringEmployee} y recibió: ${this.receivingEmployee}`);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          console.log("Server-side error");
        }
      }
    );
    
    setTimeout(() => {
      this.notifyLoading = this.notify.setLoadingChangeText(" Wue sigo esperando :c", this.notifyLoading);
      setTimeout(() => {
        this.notifyLoading = this.notify.setLoadingDone(" :)", this.notifyLoading);
      }, 3000);
    }, 3000);
  }

  clearForm(){
    this.serialsDone = false;
    this.tableErrorsHidden = true;
    this.employeesDone = false;
    this.txtToolings = "";
    this.receivingEmployee = "";
    this.delieveringEmployee = "";
    this.radioModel = 'in';
  }

  validateToolings(){
    
    if(this.txtToolings.trim() != ""){
      this.ELEMENT_DATA = new Array<ValidationResults>();
      this.setStatusButtonValidate('loading','btnValidateToolings');
      this.toolingService.getToolingsValidation(this.getToolingsSerialsFormated()).subscribe(
        results =>{
          var auxSerials = "";
          for (const element of results) {
            if(element.existe){
              if(this.radioModel == 'in' && !this.checkIfExists(this.statusAvailablesToIn, element.status)){
                this.ELEMENT_DATA.push(new ValidationResults(element.tooling,`Se ecuentra en statuss ${element.status}`));
              }
              else if(this.radioModel == 'out' && !this.checkIfExists(this.statusAvailablesToOut, element.status)){
                this.ELEMENT_DATA.push(new ValidationResults(element.tooling,`Se ecuentra en status ${element.status}`));
              }
              else{
                auxSerials += element.tooling+"\n";
              }
            }else{
              this.ELEMENT_DATA.push(new ValidationResults(element.tooling,"No existe este herramental"));
            }
          }
          if(this.ELEMENT_DATA.length == 0){
            this.tableErrorsHidden = true;
            this.setStatusButtonValidate('success','btnValidateToolings');
          }
          else {
            this.tableErrorsHidden = false;
            this.dataSource = new MatTableDataSource <ValidationResults>(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            this.setStatusButtonValidate('error','btnValidateToolings');
          }
          this.txtToolings = auxSerials;
          this.serialsDone = true;
          this.countNumberOfSerials();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) 
            console.log("Client-side error");
          else 
            console.log("Server-side error");
          
          this.notify.setNotification("Lo sentimos","Error interno, favor de contactar a IT", "error");
        }
      );
    }else{
      this.notify.setNotification("Campo vacio","Inserta al menos un herramnetal", "error");
      this.element.nativeElement.querySelector("#textAreaToolings").focus();
    }
  }

  checkIfExists(array:Array<String>, word: string){
    var exists = false;
    for (let index = 0; index < array.length; index++) {
      if(word == array[index])
        exists = true;
    }
    return exists;
  }

  validateEmployees(){
   
    if(this.delieveringEmployee.trim() != ""){
      if(this.receivingEmployee.trim() != ""){
        if(this.receivingEmployee.trim() != this.delieveringEmployee.trim()){
          this.setStatusButtonValidate('loading','btnValidateEmployees');
          this.toolingService.getEmployeeValidation(this.delieveringEmployee.trim()).subscribe(
            results =>{
              if(!results.success){
                this.notify.setNotification("Error", results.message, "error");
                this.element.nativeElement.querySelector("#txtDelieveringEmployee").focus();
                this.setStatusButtonValidate('error','btnValidateEmployees');
              }else{
                this.toolingService.getEmployeeValidation(this.receivingEmployee.trim()).subscribe(
                  results =>{
                    if(!results.success){
                      this.setStatusButtonValidate('error','btnValidateEmployees');
                      this.notify.setNotification("Error", results.message, "error");
                      this.element.nativeElement.querySelector("#txtReceivingEmployee").focus();
                    }else{
                      this.setStatusButtonValidate('success','btnValidateEmployees');
                      this.employeesDone = true;
                      this.element.nativeElement.querySelector("#divButtonsEmployees").setAttribute('class','col-2');
                    }
                  },
                  (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) 
                      console.log("Client-side error");
                    else 
                      console.log("Server-side error");
                    
                    this.notify.setNotification("Lo sentimos","Error interno, favor de contactar a IT", "error");
                  }
                );
              }
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) 
                console.log("Client-side error");
              else 
                console.log("Server-side error");
              
              this.notify.setNotification("Lo sentimos","Error interno, favor de contactar a IT1", "error");
            }
          );
           
        }else{
          this.notify.setNotification("Campo vacio","El usuario que entrega no debe ser el mismo que recibe", "error");
          this.element.nativeElement.querySelector("#txtReceivingEmployee").focus();
        }
      }else{
        this.notify.setNotification("Campo vacio","Inserta el numero de empleado de quien recibe", "error");
        this.element.nativeElement.querySelector("#txtReceivingEmployee").focus();
      }
    }else{
      this.notify.setNotification("Campo vacio","Inserta el numero de empleado de quien entrega", "error");
      this.element.nativeElement.querySelector("#txtDelieveringEmployee").focus();
    }
  }

  getToolingsSerialsFormated() : string {
    return this.txtToolings.trim().replace(/\r?\n/g,",");
  }

  continueEditing(){
    this.serialsDone = false;
    this.tableErrorsHidden = true;
    setTimeout(() => {
    this.element.nativeElement.querySelector("#textAreaToolings").focus();
   }, 200);
  }

  continueEditingEmployees(){
    this.employeesDone = false;
    this.element.nativeElement.querySelector("#divButtonsEmployees").setAttribute('class','col-1');
    setTimeout(() => {
      this.element.nativeElement.querySelector("#txtDelieveringEmployee").focus();
    }, 200);
  }

  countNumberOfSerials(){
    var vTextArea = this.txtToolings;
		
		if(vTextArea.trim()==""){
			this.spCountSerials = 0;
		}
		else{
			vTextArea = vTextArea.replace (/\r?\n/g," ");
			vTextArea = vTextArea.replace (/[ ]+/g," ");
			vTextArea = vTextArea.replace (/^ /,"");
			vTextArea = vTextArea.replace (/ $/,"");
			var textoTroceado = vTextArea.split (" ");
			this.spCountSerials = textoTroceado.length;
		}
  }

  setStatusButtonValidate(status:string, button:string){ 
    
    var btnClass = "";
    if(button=='btnValidateToolings'){
      btnClass = "btn-toolings";
    }else{
      btnClass = "btn-employees";
    }
    if(status == 'error'){
      this.element.nativeElement.querySelector("#"+button).setAttribute('class','btn btn-outline-danger btn-lg '+btnClass);
      this.setIconButtonValidate("<i class=\"fas fa-times\"></i>",button);
      setTimeout(() => {
        this.element.nativeElement.querySelector("#"+button).setAttribute('class','btn btn-outline-success btn-lg '+btnClass);
        this.setIconButtonValidate("<i class=\"fas fa-check-circle\"></i>",button);
      }, 2000);
    }
    else if(status == 'success'){
      this.element.nativeElement.querySelector("#"+button).setAttribute('class','btn btn-outline-success btn-lg '+btnClass);
      this.setIconButtonValidate("<i class=\"fas fa-check-double\"></i>",button);
      setTimeout(() => {
        this.setIconButtonValidate("<i class=\"fas fa-check-circle\"></i>",button);
      }, 1500);
    }
    else if(status == 'loading'){
      this.element.nativeElement.querySelector("#"+button).setAttribute('class','btn btn-outline-info btn-lg '+btnClass);
      this.setIconButtonValidate("<i class=\"fas fa-spinner fa-pulse\"></i>",button);
    }
  }

  setIconButtonValidate(icon:string,button:string){
    if(button=='btnValidateToolings'){
      this.iconButtonValidate = icon;
    }else{
      this.iconButtonValidateEmployee = icon;
    }
  }

}
