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
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { objTooling } from '../../../models/tooling/tooling.model';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
var AddNewToolingComponent = /** @class */ (function () {
    function AddNewToolingComponent(toolingService, notify, element, historyService) {
        this.toolingService = toolingService;
        this.notify = notify;
        this.element = element;
        this.historyService = historyService;
    }
    AddNewToolingComponent.prototype.ngOnInit = function () {
        this.projectSelected = 0;
        this.stationSelected = new Array();
        this.partNumberSelected = new Array();
        this.typeSelected = 0;
        this.cantMaintance = 0;
        this.cantPasses = 0;
        this.serialTooling = "";
        this.buttonDisabled = false;
        this.positionTooling = "";
        this.rackTooling = "";
        this.getAllProjects();
        this.getAllTypes();
        this.getAllStations();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    };
    AddNewToolingComponent.prototype.getAllProjects = function () {
        var _this = this;
        this.toolingService.findAllProjects().subscribe(function (pprojects) {
            _this.projects = pprojects;
        });
    };
    AddNewToolingComponent.prototype.getPartNumbersByProject = function (pPkProject) {
        var _this = this;
        this.toolingService.getPartNumbersByProject(pPkProject).subscribe(function (pPartNumbers) {
            _this.partNumbers = pPartNumbers;
            if (_this.partNumbers != undefined && _this.partNumbers.length != 0) {
                _this.partNumberSelected = [0];
            }
            else {
                _this.partNumberSelected = [0.1];
            }
            _this.notifyLoading = _this.notify.setLoadingDone("Listo", _this.notifyLoading);
        });
    };
    AddNewToolingComponent.prototype.getAllTypes = function () {
        var _this = this;
        this.toolingService.findAllTypes().subscribe(function (ptypes) {
            _this.types = ptypes;
        });
    };
    AddNewToolingComponent.prototype.getAllStations = function () {
        var _this = this;
        this.toolingService.findAllStations().subscribe(function (results) {
            _this.stations = results.data;
            console.log(_this.stations);
        });
    };
    AddNewToolingComponent.prototype.saveNewTooling = function (toolingObj) {
        var _this = this;
        console.log(toolingObj);
        this.toolingService.saveNewTooling(toolingObj).subscribe(function (results) {
            if (results.success == null) {
                _this.notifyLoading = _this.notify.setLoadingDone(" Insertado", _this.notifyLoading);
                _this.clearForm();
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Insert\u00F3 un nuevo herramental (" + toolingObj.tool + ")");
            }
            else {
                _this.notifyLoading = _this.notify.setLoadingError(" Error", _this.notifyLoading);
                _this.notify.setNotification("ERROR", results.message, "error");
                _this.buttonDisabled = false;
            }
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
        });
    };
    AddNewToolingComponent.prototype.loadPartnumbers = function () {
        this.notifyLoading = this.notify.setLoading("Espera un momento", this.notifyLoading);
        this.getPartNumbersByProject(this.projectSelected);
    };
    AddNewToolingComponent.prototype.saveTooling = function () {
        var _this = this;
        if (this.projectSelected == 0) {
            this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un proyecto", "error");
            this.element.nativeElement.querySelector("#slProject").focus();
        }
        else if (this.partNumberSelected[0] == 0 || this.partNumberSelected[0] == 0.1) {
            this.notify.setNotification("CAMPO VACIO", "Por favor selecciona al menos un numero de parte", "error");
            this.element.nativeElement.querySelector("#slPartNumber").setAttribute("class", "shake-element");
            setTimeout(function () {
                _this.element.nativeElement.querySelector("#slPartNumber").setAttribute("class", "");
            }, 1000);
        }
        else if (this.typeSelected == 0) {
            this.notify.setNotification("CAMPO VACIO", "Por favor selecciona un tipo de herramental", "error");
            this.element.nativeElement.querySelector("#slType").focus();
        }
        else if (this.serialTooling == "") {
            this.notify.setNotification("CAMPO VACIO", "Por favor escribe un numero de serial", "error");
            this.element.nativeElement.querySelector("#txtSerialTooling").focus();
        }
        else if (this.typeSelected == 2 && this.cantMaintance == 0) {
            this.notify.setNotification("CAMPO VACIO", "Por favor escribe las semanas para mantenimiento", "error");
            this.element.nativeElement.querySelector("#txtMaintance").focus();
        }
        else if ((this.typeSelected == 3 || this.typeSelected == 5) && this.cantPasses == 0) {
            this.notify.setNotification("CAMPO VACIO", "Por favor escribe la cantidad de pasadas", "error");
            this.element.nativeElement.querySelector("#txtPasses").focus();
        }
        else {
            this.notifyLoading = this.notify.setLoading(" Guardando herramental", this.notifyLoading);
            this.buttonDisabled = true;
            var obj = new objTooling();
            obj.tool = this.serialTooling;
            obj.fkPartNumbers = this.partNumberSelected;
            obj.position = this.positionTooling;
            obj.rack = this.rackTooling;
            obj.mtceMagazine = this.cantMaintance;
            obj.mtcePallet = this.cantPasses;
            obj.fkType = Number(this.typeSelected);
            obj.fkStatus = 5;
            obj.fkStations = this.stationSelected;
            console.log(obj);
            this.saveNewTooling(obj);
        }
    };
    AddNewToolingComponent.prototype.clearForm = function () {
        this.projectSelected = 0;
        this.partNumberSelected = new Array();
        this.stationSelected = new Array();
        this.typeSelected = 0;
        this.cantMaintance = 0;
        this.cantPasses = 0;
        this.serialTooling = "";
        this.positionTooling = "";
        this.rackTooling = "";
        this.getAllProjects();
        this.getAllTypes();
        this.getAllStations();
        this.buttonDisabled = false;
    };
    AddNewToolingComponent = __decorate([
        Component({
            selector: 'app-add-new-tooling',
            templateUrl: './add-new-tooling.component.html',
            styleUrls: [
                './add-new-tooling.component.css'
            ]
        }),
        __metadata("design:paramtypes", [ToolingService, Notify, ElementRef, HistoryService])
    ], AddNewToolingComponent);
    return AddNewToolingComponent;
}());
export { AddNewToolingComponent };
//# sourceMappingURL=add-new-tooling.component.js.map