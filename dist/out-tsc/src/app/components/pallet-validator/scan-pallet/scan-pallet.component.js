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
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
var mpassdata = /** @class */ (function () {
    function mpassdata() {
    }
    return mpassdata;
}());
export { mpassdata };
var ScanPalletComponent = /** @class */ (function () {
    function ScanPalletComponent(scanPalletService, element, notify, toolingService) {
        this.scanPalletService = scanPalletService;
        this.element = element;
        this.notify = notify;
        this.toolingService = toolingService;
        this.serialDivHidden = true;
        this.serialFine = false;
        this.serialReadonly = false;
        this.allFine = false;
        this.alertShow = "none";
        this.stationWrong = "";
        this.palletResponse = "";
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
        this.getCountermasksNumber();
        this.counterCM = 0;
        this.serial = '';
        this.inputsCM = new Array();
        this.currentCM = 1;
        this.fillingCMs = false;
        this.arrayCounterMaskCurrentPasses = new Array();
        this.arrayCounterMaskPassesToMaintenance = new Array();
    };
    ScanPalletComponent.prototype.validateSerial = function () {
        var _this = this;
        var auxSerial = this.serial;
        mpassdata;
        var comilla = /\'/gi;
        var ene = /\Ñ/gi;
        this.serialReadonly = true;
        auxSerial = auxSerial.replace(comilla, "-").replace(ene, ":");
        this.scanPalletService.getSerialValidation(auxSerial, this.selectedStation).subscribe(function (results) {
            if (results.success) {
                if (results.data.valid) {
                    _this.serialFine = true;
                    _this.serial = auxSerial;
                    _this.notify.setNotification("Listo", "Serial en orden", "success");
                    _this.allFine = true;
                    _this.alertShow = "success";
                    _this.cazarContramascaras();
                }
                else {
                    _this.allFine = false;
                    _this.stationWrong = results.data.station;
                    _this.alertShow = "error";
                }
            }
            else {
                _this.notify.setNotification("Error", results.message, "error");
                _this.serial = '';
            }
            _this.serialReadonly = false;
            console.log(results);
        });
    };
    ScanPalletComponent.prototype.cazarContramascaras = function () {
        var _this = this;
        var obj = new mpassdata();
        obj.idStation = this.selectedStation;
        obj.pallet = this.pallet;
        obj.serial = this.serial;
        obj.contramascaras = this.ngModelCM;
        this.scanPalletService.cazar(obj).subscribe(function (results) {
            if (results.success) {
                _this.allFine = true;
                _this.alertShow = "success";
                _this.palletResponse = results.data;
            }
            else {
                _this.allFine = false;
                _this.palletResponse = results.data;
                _this.alertShow = "error";
            }
            console.log(results);
        });
    };
    ScanPalletComponent.prototype.validateCounterMask = function (cmNumber) {
        var _this = this;
        var auxCM = this.ngModelCM[cmNumber];
        auxCM = auxCM.replace("'", "-").replace("Ñ", ":");
        this.scanPalletService.getToolValidation(auxCM, "Contramascara", this.getSelectedStation()).subscribe(function (results) {
            if (results.success) {
                if (!_this.checkIfExists(_this.ngModelCM, auxCM)) {
                    _this.ngModelCM[cmNumber] = auxCM;
                    _this.element.nativeElement.querySelector("#txtCounterMask_" + cmNumber).setAttribute("disabled", "true");
                    _this.inputsCMFine[cmNumber] = true;
                    if ((cmNumber + 1) < _this.numberOfCounterMasks) {
                        _this.inputsCMHidden[cmNumber + 1] = false;
                        setTimeout(function () {
                            _this.element.nativeElement.querySelector("#txtCounterMask_" + (cmNumber + 1)).focus();
                        }, 100);
                        _this.currentCM++;
                    }
                    else {
                        _this.serialDivHidden = false;
                        setTimeout(function () {
                            _this.element.nativeElement.querySelector("#txtSerial").focus();
                        }, 100);
                    }
                    _this.notify.setNotification("Listo", "Contramascara en orden", "success");
                    _this.arrayCounterMaskCurrentPasses.push(results.data.currentQty);
                    _this.arrayCounterMaskPassesToMaintenance.push(results.data.maintenanceQty);
                }
                else {
                    _this.notify.setNotification("Error", "No se puede asignar la misma contramascara 2 veces", "error");
                    _this.ngModelCM[cmNumber] = '';
                }
            }
            else {
                _this.notify.setNotification("Error", results.message, "error");
                _this.ngModelCM[cmNumber] = '';
            }
        });
    };
    ScanPalletComponent.prototype.createFields = function () {
        var _this = this;
        this.inputsCM = new Array();
        this.inputsCMFine = new Array();
        this.inputsCMHidden = new Array();
        for (var index = 0; index < this.numberOfCounterMasks; index++) {
            if (index == 0)
                this.inputsCMHidden.push(false);
            else
                this.inputsCMHidden.push(true);
            this.inputsCM.push(index);
            this.inputsCMFine.push(false);
        }
        setTimeout(function () {
            _this.element.nativeElement.querySelector("#txtCounterMask_0").focus();
        }, 100);
    };
    ScanPalletComponent.prototype.clearFieldCM = function (cmNumber) {
        var _this = this;
        setTimeout(function () {
            _this.ngModelCM[cmNumber] = '';
        }, 0);
    };
    ScanPalletComponent.prototype.clearField = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.pallet = '';
        }, 0);
    };
    ScanPalletComponent.prototype.clearFieldSerial = function () {
        var _this = this;
        setTimeout(function () {
            _this.serial = '';
        }, 0);
    };
    ScanPalletComponent.prototype.checkIfExists = function (array, word) {
        var cont = 0;
        for (var index = 0; index < array.length; index++) {
            if (word == array[index])
                cont++;
        }
        if (cont >= 1)
            return true;
        else
            return false;
    };
    ScanPalletComponent.prototype.validatePallet = function () {
        var _this = this;
        if (this.selectedStation != 0) {
            var auxPallet_1 = this.pallet;
            this.scanPalletService.getToolValidation(this.pallet, "Pallet", this.getSelectedStation()).subscribe(function (results) {
                if (results.success) {
                    _this.palletFine = true;
                    _this.pallet = auxPallet_1;
                    if (_this.numberOfCounterMasks > 0) {
                        _this.createFields();
                        _this.notify.setNotification("Listo", "Pallet en orden", "success");
                        _this.fillingCMs = true;
                    }
                    else {
                        _this.notify.setNotification("Error", "La estación seleccionada no tiene qty de contramascaras", "error");
                    }
                }
                else {
                    _this.notify.setNotification("Error", results.message, "error");
                    _this.pallet = '';
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
        this.getCountermasksNumber();
    };
    ScanPalletComponent.prototype.getSelectedStation = function () {
        var _this = this;
        var station = this.stations.find(function (s) { return s.pkstation == _this.selectedStation; });
        return station.stationName;
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
    ScanPalletComponent.prototype.getCountermasksNumber = function () {
        var _this = this;
        this.scanPalletService.getCMNumber(this.selectedStation).subscribe(function (results) {
            if (results.success)
                _this.numberOfCounterMasks = results.data.contramascaraQty;
        });
    };
    ScanPalletComponent = __decorate([
        Component({
            selector: 'app-scan-pallet',
            templateUrl: './scan-pallet.component.html',
            styleUrls: ['./scan-pallet.component.css']
        }),
        __metadata("design:paramtypes", [ScanPalletService,
            ElementRef,
            Notify,
            ToolingService])
    ], ScanPalletComponent);
    return ScanPalletComponent;
}());
export { ScanPalletComponent };
//# sourceMappingURL=scan-pallet.component.js.map