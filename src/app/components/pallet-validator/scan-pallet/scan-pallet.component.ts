import { Component, OnInit, ElementRef } from '@angular/core';
import { ScanPalletService } from 'src/app/modules/pallet-validator/scan-pallet/scan-pallet.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Station } from '../../../models/stations/stations.model';
import { Constants } from 'src/app/helpers/constats';
import { Notify } from 'src/app/modules/notify/notify';

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

  constructor(private scanPalletService: ScanPalletService, 
    private element : ElementRef,
    private notify : Notify) { }

  ngOnInit() {
    this.stationCookie = Number(this.getCookie("Station"));
    this.selectedStation = this.stationCookie;
    this.element.nativeElement.querySelector("#txtPallet").focus();
    this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    this.imgSrc = "http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee="+this.applicationData.userInfo.userName;
    this.getAllStations();
    this.pallet = "";
  }

  validatePallet(){
    if(this.selectedStation != 0){
      this.scanPalletService.getPalletValidation(this.pallet,this.selectedStation).subscribe(
        results =>{
          if(results.success){
            
          }else{
            this.notify.setNotification("Error",results.message,"error")
          }
        }
      )
      
    }else{
      this.notify.setNotification("Error","Seleccione una estación","error");
      this.pallet = '';
    }
  }

  getAllStations(){
    this.scanPalletService.findStations().subscribe(
      results =>{
        this.stations = results.data;
        this.stationCookie = Number(this.getCookie("Station"));
      }
    );
  }

  changeStation(){
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    document.cookie = `Station=${this.selectedStation}; expires= ${d.toUTCString()}; path=/`;
    this.stationCookie = Number(this.getCookie("Station"));
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

}
