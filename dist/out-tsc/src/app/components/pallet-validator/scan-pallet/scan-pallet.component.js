var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { ScanPalletService } from 'src/app/modules/pallet-validator/scan-pallet/scan-pallet.service';
import { Constants } from 'src/app/helpers/constats';
import { Notify } from 'src/app/modules/notify/notify';
var ScanPalletComponent = /** @class */ (function () {
    function ScanPalletComponent(scanPalletService, element, notify) {
        this.scanPalletService = scanPalletService;
        this.element = element;
        this.notify = notify;
    }
    ScanPalletComponent.prototype.ngOnInit = function () {
        this.stationCookie = Number(this.getCookie("Station"));
        this.selectedStation = this.stationCookie;
        this.element.nativeElement.querySelector("#txtPallet").focus();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
        this.imgSrc = "http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee=" + this.applicationData.userInfo.userName;
        this.getAllStations();
        this.pallet = "";
        this.palletFine = false;
        this.ngModelCM = new Array();
    };
    ScanPalletComponent.prototype.validatePallet = function () {
        var _this = this;
        if (this.selectedStation != 0) {
            var auxPallet_1 = this.pallet;
            this.scanPalletService.getPalletValidation(this.pallet, this.selectedStation).subscribe(function (results) {
                if (results.success) {
                    _this.palletFine = true;
                    _this.pallet = auxPallet_1;
                }
                else {
                    _this.notify.setNotification("Error", results.message, "error");
                    //this.pallet = 'dfd';
                    _this.palletFine = false;
                }
            });
        }
        else {
            this.notify.setNotification("Error", "Seleccione una estación", "error");
            this.pallet = '';
            this.palletFine = false;
            this.stations.length;
        }
    };
    ScanPalletComponent.prototype.validateCounterMask = function (cmNumber) {
        var auxPallet = this.ngModelCM[cmNumber];
        this.ngModelCM[cmNumber] = auxPallet;
        alert(auxPallet);
        // this.scanPalletService.getPalletValidation(auxPallet,this.selectedStation).subscribe(
        //   results =>{
        //     if(results.success){
        //       this.palletFine = true;
        //       this.pallet = auxPallet;
        //     }else{
        //       this.notify.setNotification("Error",results.message,"error");
        //       this.pallet = '';
        //       this.palletFine = false;
        //     }
        //   }
        // )
    };
    ScanPalletComponent.prototype.addCounterMaskField = function () {
    };
    ScanPalletComponent.prototype.clearFieldCM = function (cmNumber) {
        var _this = this;
        setTimeout(function () {
            _this.ngModelCM[cmNumber] = '';
        }, 10);
    };
    ScanPalletComponent.prototype.clearField = function (event) {
        var _this = this;
        if (event.keyCode != 13) {
            setTimeout(function () {
                _this.pallet = '';
            }, 10);
        }
        console.log(event.keyCode);
    };
    ScanPalletComponent.prototype.getAllStations = function () {
        var _this = this;
        this.scanPalletService.findStations().subscribe(function (results) {
            _this.stations = results.data;
            _this.stationCookie = Number(_this.getCookie("Station"));
        });
    };
    ScanPalletComponent.prototype.changeStation = function () {
        var d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = "Station=" + this.selectedStation + "; expires= " + d.toUTCString() + "; path=/";
        this.stationCookie = Number(this.getCookie("Station"));
    };
    ScanPalletComponent.prototype.getCookie = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "0";
    };
    ScanPalletComponent = __decorate([
        Component({
            selector: 'app-scan-pallet',
            templateUrl: './scan-pallet.component.html',
            styleUrls: ['./scan-pallet.component.css']
        }),
        __metadata("design:paramtypes", [ScanPalletService,
            ElementRef,
            Notify])
    ], ScanPalletComponent);
    return ScanPalletComponent;
}());
export { ScanPalletComponent };
//# sourceMappingURL=scan-pallet.component.js.map