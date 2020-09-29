import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ScanPalletService } from 'src/app/modules/pallet-validator/scan-pallet/scan-pallet.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Station } from '../../../models/stations/stations.model';
import { Constants } from 'src/app/helpers/constats';
import { Notify } from 'src/app/modules/notify/notify';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HistoryService } from 'src/app/modules/history/history.service';

export class mpassdata{
  serial:string;
  pallet:string;
  contramascaras : string[];
  idStation:number;
  employeeNumber:string;
}

@Component({
  selector: 'app-scan-pallet',
  templateUrl: './scan-pallet.component.html',
  styleUrls: ['./scan-pallet.component.css']
})
export class ScanPalletComponent implements OnInit {

  imgSrc : string;
  applicationData : ApplicationData;
  stations : Station[];
  selectedStation : number;
  stationCookie : number;
  pallet : string;
  palletFine : boolean;
  ngModelCM : string[];
  numberOfCounterMasks : number;
  inputsCM : number[];
  inputsCMHidden : boolean[];
  inputsCMFine : boolean[];
  counterCM : number;
  serialDivHidden = true;
  serialFine = false;
  serial : string;
  currentCM : number;
  fillingCMs : boolean;
  arrayCounterMaskCurrentPasses : number[];
  arrayCounterMaskPassesToMaintenance : number[];
  serialReadonly = false;
  allFine = false;
  alertShow = "none";
  stationWrong = "";
  palletResponse = "";
  panelClass = "";
  panelClassFine = "";
  
  constructor(private scanPalletService: ScanPalletService, 
    private element : ElementRef,
    private notify : Notify,
    private toolingService: ToolingService, private historyService : HistoryService) { }

  ngOnInit() {
    this.stationCookie = Number(this.getCookie("Station"));
    this.element.nativeElement.querySelector("#txtPallet").focus();
    this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    this.imgSrc = "http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee="+this.applicationData.userInfo.userName;
    this.getAllStations();
    this.pallet = "";
    this.palletFine = false;
    this.ngModelCM = new Array<string>();
    this.getCountermasksNumber();
    this.counterCM = 0;
    this.serial = '';
    this.inputsCM  = new Array<number>();
    this.currentCM = 1;
    this.fillingCMs = false;
    this.arrayCounterMaskCurrentPasses = new Array<number>();
    this.arrayCounterMaskPassesToMaintenance = new Array<number>();
  }

  validateSerial(){
    let auxSerial = this.serial;mpassdata
    let comilla = /\'/gi;
    let ene = /\Ñ/gi;
    this.serialReadonly = true;
    auxSerial = auxSerial.replace(comilla,"-").replace(ene,":")
    this.scanPalletService.getSerialValidation(auxSerial,this.selectedStation).subscribe(
      results =>{
        if(results.success){

          if(results.data.valid){
            this.serialFine = true;
            this.serial = auxSerial;
            this.notify.setNotification("Listo", "Se casaron las contramascaras con éxito","success");
            this.allFine = true;
            this.alertShow = "success";
            this.cazarContramascaras();
          }else{
            this.allFine = false;
            this.stationWrong = results.data.station;
            this.alertShow = "error";
            setTimeout(()=>{
              this.panelClass += ' panel-hide';
            },2000)
          }
          this.panelClass = (this.allFine) ? 'alert alert-success' : 'alert alert-danger pb-n4'
          
        }else{
          this.notify.setNotification("Error", results.message,"error");
          this.serial = '';
        }
        this.serialReadonly = false;
        console.log(results)
      }
    );
  }

  clearFields(){
    this.arrayCounterMaskCurrentPasses = new Array<number>();
    this.arrayCounterMaskPassesToMaintenance = new Array<number>();
    this.inputsCM  = new Array<number>();
    this.ngModelCM = new Array<string>();
    this.counterCM = 0;
    this.serial = '';
    this.currentCM = 1;
    this.fillingCMs = false;
    this.pallet = "";
    this.palletFine = false;
    this.allFine = false;
    this.element.nativeElement.querySelector("#txtPallet").focus();
    this.serialDivHidden = true;
    this.serialFine = false;
  }

  cazarContramascaras(){
    
    let obj = new mpassdata();
    obj.idStation = this.selectedStation;
    obj.pallet = this.pallet;
    obj.serial = this.serial;
    obj.contramascaras = this.ngModelCM;
    obj.employeeNumber = this.applicationData.userInfo.employeeNumber+"";
   
    this.scanPalletService.cazar(obj).subscribe(
      results =>{
        console.log(results);
        if(results.success){
            this.allFine = true;
            this.alertShow = "success";
            this.palletResponse = results.data;
            this.clearFields();
            setTimeout(()=>{
              this.panelClass += ' panel-hide';
            },7000)
            this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Casó las contramascaras (${this.ngModelCM}) al pallet (${this.pallet} con el serial (${this.serial})`);
        }else{
          this.allFine = false;
          this.palletResponse = results.data;
          this.alertShow = "error";
        }
        console.log(results)
      }
    );
  }

  validateCounterMask(cmNumber: number){
    let auxCM = this.ngModelCM[cmNumber];
    let comilla = /\'/gi;
    let ene = /\Ñ/gi;
    auxCM = auxCM.replace(comilla,"-").replace(ene,":")
    this.scanPalletService.getToolValidation(auxCM,"Contramascara", this.getSelectedStation()).subscribe(
      results =>{
        if(results.success){
          if(!this.checkIfExists(this.ngModelCM,auxCM)){
            this.ngModelCM[cmNumber] = auxCM;
            this.element.nativeElement.querySelector("#txtCounterMask_"+cmNumber).setAttribute("disabled","true");
            this.inputsCMFine[cmNumber] = true;
            if((cmNumber+1) < this.numberOfCounterMasks){
              this.inputsCMHidden[cmNumber+1] = false;
              setTimeout(() => {
                this.element.nativeElement.querySelector("#txtCounterMask_"+(cmNumber+1)).focus();
              }, 100);
              this.currentCM ++;
            }else{
              this.serialDivHidden = false;
              setTimeout(() => {
                this.element.nativeElement.querySelector("#txtSerial").focus();
              }, 100);
            }
            this.notify.setNotification("Listo", "Contramascara en orden","success");
            this.arrayCounterMaskCurrentPasses.push(results.data.currentQty);
            this.arrayCounterMaskPassesToMaintenance.push(results.data.maintenanceQty);
          }else{
            this.notify.setNotification("Error", "No se puede asignar la misma contramascara 2 veces","error");
            this.ngModelCM[cmNumber] = '';
          }
        }else{
          this.notify.setNotification("Error", results.message,"error");
          this.ngModelCM[cmNumber] = '';
        }
      }
    );
  }

  createFields(){
    this.inputsCM  = new Array<number>();
    this.inputsCMFine = new Array<boolean>();
    this.inputsCMHidden = new Array<boolean>();
    for (let index = 0; index < this.numberOfCounterMasks; index++) {
      if(index==0)
        this.inputsCMHidden.push(false);
      else
        this.inputsCMHidden.push(true);
      this.inputsCM.push(index);
      this.inputsCMFine.push(false);
    }
    setTimeout(() => {
      this.element.nativeElement.querySelector("#txtCounterMask_0").focus();
    }, 100);
    
  }

  clearFieldCM(cmNumber: number){
    setTimeout(() => {
      this.ngModelCM[cmNumber] = '';
    }, 0);
  }

  clearField(event: KeyboardEvent){
      setTimeout(() => {
        this.pallet = '';
      }, 0);
  }

  clearFieldSerial(){
    setTimeout(() => {
      this.serial = '';
    }, 0);
  }

  checkIfExists(array:Array<String>, word: string){
    let cont = 0;
    for (let index = 0; index < array.length; index++) {
      if(word == array[index])
        cont++;
    }
    if(cont >= 1)
    return true;
    else
    return false;
  }

  validatePallet(){
    
    if(this.selectedStation != 0){
      let auxPallet = this.pallet;
      let comilla = /\'/gi;
    let ene = /\Ñ/gi;
      auxPallet=auxPallet.replace(comilla,"-").replace(ene,":")
      this.scanPalletService.getToolValidation(auxPallet, "Pallet", this.getSelectedStation()).subscribe(
        results =>{
          if(results.success){
            this.palletFine = true;
            this.pallet = auxPallet;
            if(this.numberOfCounterMasks > 0){
              this.createFields();
              this.notify.setNotification("Listo", "Pallet en orden","success");
              this.fillingCMs = true;
            }else{
              this.notify.setNotification("Error","La estación seleccionada no tiene qty de contramascaras","error");
            }
          }else{
            this.notify.setNotification("Error",results.message,"error");
            this.pallet = '';
            this.palletFine = false;
          }
        }
      );
    }else{
      this.notify.setNotification("Error","Seleccione una estación","error");
      this.pallet = '';
      this.palletFine = false;
      this.stations.length
    }
  }

  getAllStations(){
    this.scanPalletService.findStations().subscribe(
      results =>{
        this.stations = results.data;
        this.stationCookie = Number(this.getCookie("Station"));
        this.selectedStation = this.stationCookie;
      }
    );
  }

  changeStation(){
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    document.cookie = `Station=${this.selectedStation}; expires= ${d.toUTCString()}; path=/`;
    this.stationCookie = Number(this.getCookie("Station"));
    this.selectedStation = this.stationCookie;
    this.getCountermasksNumber();
  }

  getSelectedStation(): string {
    let station: Station = this.stations.find(s => s.pkstation == this.selectedStation);
    return station.stationName;
  }

  getCookie(cname:string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "0";
  }

  getCountermasksNumber(){
    this.scanPalletService.getCMNumber(this.stationCookie).subscribe(
      results =>{
        if(results.success)
        this.numberOfCounterMasks = results.data.contramascaraQty;
      }
    );
  }

}
