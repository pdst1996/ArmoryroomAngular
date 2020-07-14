var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { StationsService } from 'src/app/modules/stations/stations.service';
import { Station } from 'src/app/models/stations/stations.model';
import { Notify } from 'src/app/modules/notify/notify';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/models/project/project.model';
import { ProjectsService } from 'src/app/modules/projects/projects.service';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
var StationsConfigComponent = /** @class */ (function () {
    function StationsConfigComponent(modalService, stationService, projectService, notify, historyService) {
        this.modalService = modalService;
        this.stationService = stationService;
        this.projectService = projectService;
        this.notify = notify;
        this.historyService = historyService;
        this.idStationEdit = 0;
        this.displayedColumns = ['pkstation', 'station', 'project', 'correctVariable', 'unit', 'contramascaraQty', 'action'];
    }
    StationsConfigComponent.prototype.ngOnInit = function () {
        this.getAllStations();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    };
    StationsConfigComponent.prototype.getAllStations = function () {
        var _this = this;
        this.stationService.findAllStations().subscribe(function (response) {
            _this.stations = response.data;
            _this.dataSource = new MatTableDataSource(_this.stations);
            _this.dataSource.paginator = _this.paginator;
        });
    };
    StationsConfigComponent.prototype.openStationModal = function (template, pkStationEdit) {
        var _this = this;
        this.notifyLoading = this.notify.setLoading("Cargando información", this.notifyLoading);
        this.stationService.getStationById(pkStationEdit).subscribe(function (pStation) {
            _this.stationData = pStation.data;
            _this.idStationEdit = pkStationEdit;
            _this.openModal(template);
            _this.correctVariable = _this.stationData.correctVariable;
            _this.unit = _this.stationData.unit;
            _this.stationName = _this.stationData.stationName;
            _this.referencePallet = _this.stationData.referencePallet;
            _this.referenceContramascara = _this.stationData.referenceContramascara;
            _this.projectStationEdit = _this.stationData.fkProject.pkProject;
            _this.contramascaraQty = _this.stationData.contramascaraQty;
            _this.notifyLoading = _this.notify.setLoadingDone("Listo", _this.notifyLoading);
            _this.getAllProjects();
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
            _this.notifyLoading = _this.notify.setLoadingError("No se pudo completar", _this.notifyLoading);
        });
    };
    StationsConfigComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-lg');
    };
    StationsConfigComponent.prototype.closeModal = function () {
        this.modalService.hide(1);
    };
    StationsConfigComponent.prototype.openModal2 = function (template) {
        this.modalRef2 = this.modalService.show(template);
        this.modalRef2.setClass('modal-md');
    };
    StationsConfigComponent.prototype.getAllProjects = function () {
        var _this = this;
        this.projectService.findAllProjects().subscribe(function (pprojects) {
            _this.projectsArray = pprojects;
            console.log(pprojects);
        });
    };
    StationsConfigComponent.prototype.chargeStationChanges = function () {
        if (this.correctVariable.trim() == "" || this.unit.trim() == "" || this.stationName.trim() == "" || this.referenceContramascara.trim() == "" || this.referencePallet.trim() == "") {
            this.notify.setNotification("Error", "Favor de llenar los campos requeridos", "error");
        }
        else {
            if (this.contramascaraQty < 1) {
                this.notify.setNotification("Error", "El numero de contramascaras debe ser mayor a cero", "error");
            }
            else {
                if (this.projectStationEdit < 1) {
                    this.notify.setNotification("Error", "Favor de seleccionar el proyecto", "error");
                }
                else {
                    this.notifyLoading = this.notify.setLoading("Guardando cambios", this.notifyLoading);
                    var objUpdateStation = new Station;
                    var objProject = new Project;
                    objProject.pkProject = this.projectStationEdit;
                    objUpdateStation.contramascaraQty = this.contramascaraQty;
                    objUpdateStation.correctVariable = this.correctVariable;
                    objUpdateStation.fkProject = objProject;
                    objUpdateStation.pkstation = this.idStationEdit;
                    objUpdateStation.referenceContramascara = this.referenceContramascara;
                    objUpdateStation.referencePallet = this.referencePallet;
                    objUpdateStation.stationName = this.stationName;
                    objUpdateStation.unit = this.unit;
                    console.log(objUpdateStation);
                    this.saveStationChanges(objUpdateStation);
                }
            }
        }
    };
    StationsConfigComponent.prototype.saveStationChanges = function (objUpdate) {
        var _this = this;
        this.stationService.updateStation(objUpdate).subscribe(function (results) {
            _this.notifyLoading = _this.notify.setLoadingDone(" Actualizado", _this.notifyLoading);
            if (objUpdate.pkstation == 0) {
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Insert\u00F3 la estacion (" + objUpdate.pkstation + ")");
            }
            else {
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Modific\u00F3 la estacion (" + objUpdate.pkstation + ")");
            }
            _this.closeModal();
            _this.getAllStations();
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
            _this.notifyLoading = _this.notify.setLoadingError(" Ocurrio un error", _this.notifyLoading);
        });
    };
    StationsConfigComponent.prototype.openModalDelete = function (modal, objStation) {
        this.stationToDelete = objStation;
        this.openModal2(modal);
    };
    StationsConfigComponent.prototype.deleteStation = function () {
        var _this = this;
        this.notifyLoading = this.notify.setLoading("Eliminando", this.notifyLoading);
        this.stationService.deleteStation(this.stationToDelete.pkstation).subscribe(function (results) {
            _this.notifyLoading = _this.notify.setLoadingDone(" Eliminado", _this.notifyLoading);
            _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Elimin\u00F3 la estacion (" + _this.stationToDelete.stationName + ")");
            _this.closeModalDelete();
            _this.getAllStations();
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
            _this.notifyLoading = _this.notify.setLoadingError(" Ocurrio un error", _this.notifyLoading);
        });
    };
    StationsConfigComponent.prototype.closeModalDelete = function () {
        this.modalService.hide(1);
    };
    StationsConfigComponent.prototype.openStationModalEmpty = function (template) {
        this.idStationEdit = 0;
        this.openModal(template);
        this.correctVariable = "";
        this.unit = "";
        this.stationName = "";
        this.referencePallet = "";
        this.referenceContramascara = "";
        this.projectStationEdit = 0;
        this.contramascaraQty = 1;
        this.getAllProjects();
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], StationsConfigComponent.prototype, "paginator", void 0);
    StationsConfigComponent = __decorate([
        Component({
            selector: 'app-stations-config',
            templateUrl: './stations-config.component.html',
            styleUrls: ['./stations-config.component.css']
        }),
        __metadata("design:paramtypes", [BsModalService, StationsService, ProjectsService, Notify, HistoryService])
    ], StationsConfigComponent);
    return StationsConfigComponent;
}());
export { StationsConfigComponent };
//# sourceMappingURL=stations-config.component.js.map