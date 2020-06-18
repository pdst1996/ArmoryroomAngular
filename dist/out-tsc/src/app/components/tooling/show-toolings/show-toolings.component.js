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
import { BsModalService } from 'ngx-bootstrap/modal';
import { objTooling, objTooling2 } from 'src/app/models/tooling/tooling.model';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
var ShowToolingsComponent = /** @class */ (function () {
    function ShowToolingsComponent(modalService, toolingService, notify, historyService) {
        this.modalService = modalService;
        this.toolingService = toolingService;
        this.notify = notify;
        this.historyService = historyService;
        this.displayedColumns = ['id', 'project', 'serial', 'type', 'qtyPasses', 'qtyMtto', 'proxMtto', 'status', 'controls'];
        this.idToolingEdit = 0;
        this.typeTooling = 0;
        this.serialToolingEdit = '';
        this.projectToolingEdit = '';
        this.typeToolingEdit = '';
        this.statusToolingEdit = 0;
        this.mttoToolingEdit = 'NA';
        this.rackToolingEdit = '';
        this.positionToolingEdit = '';
        this.qtyMttoPassesEdit = 7;
        this.qtyCurrentPasesEdit = 3;
        this.qtyTotalPasesEdit = 10;
        this.qtyLifePasesEdit = 3000;
        this.valueInOut = 'poner';
    }
    ShowToolingsComponent.prototype.ngOnInit = function () {
        this.getAllToolings();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    };
    ShowToolingsComponent.prototype.changeStatus = function (modal, objTool, action) {
        this.newStatus = action;
        this.toolingToChangeStatus = new objTooling2();
        this.toolingToChangeStatus = objTool;
        console.log(objTool);
        this.valueStatus = (action == 9) ? 'scrap' : 'cuarentena';
        this.openModal2(modal);
        this.valueInOut = (action == 5) ? 'sacar de' : 'poner en';
    };
    ShowToolingsComponent.prototype.saveNewStatus = function () {
        var _this = this;
        this.notifyLoading = this.notify.setLoading("" + ((this.newStatus == 9) ? "Scrapeando" : ((this.newStatus == 2) ? 'Sacando de' : 'Poniendo en') + " cuarentena"), this.notifyLoading);
        this.toolingService.inOutToolings(this.toolingToChangeStatus.tooling, this.newStatus).subscribe(function (results) {
            _this.notifyLoading = _this.notify.setLoadingDone(" Cambios guardados", _this.notifyLoading);
            _this.modalRef2.hide();
            _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Se puso en " + ((_this.newStatus == 9) ? "scrap" : "cuarentena") + " al herramental (" + _this.toolingToChangeStatus.tooling + ")");
            _this.getAllToolings();
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
        });
    };
    ShowToolingsComponent.prototype.getAllToolings = function () {
        var _this = this;
        this.toolingService.getAllToolings().subscribe(function (ptoolings) {
            _this.toolingTable = ptoolings;
            _this.dataSource = new MatTableDataSource(_this.toolingTable);
            _this.dataSource.paginator = _this.paginator;
        });
    };
    ShowToolingsComponent.prototype.openToolingModal = function (template, pkToolingEdit) {
        var _this = this;
        this.notifyLoading = this.notify.setLoading("Cargando información", this.notifyLoading);
        this.toolingService.getToolingById(pkToolingEdit).subscribe(function (pTooling) {
            _this.tooling = pTooling;
            _this.idToolingEdit = pkToolingEdit;
            _this.openModal(template);
            _this.typeTooling = _this.tooling.fkType.pktype;
            _this.serialToolingEdit = _this.tooling.tooling;
            _this.projectToolingEdit = _this.tooling.project.substring(0, _this.tooling.project.length - 1);
            _this.typeToolingEdit = _this.tooling.fkType.type;
            _this.statusToolingEdit = _this.tooling.fkStatus.pkstatus;
            _this.mttoToolingEdit = (_this.tooling.nextMtce != null) ? '' + _this.weeksBetween(new Date(), new Date(_this.tooling.nextMtce.replace('T', ' ').substring(0, 10))) : "NA";
            _this.rackToolingEdit = _this.tooling.rack;
            _this.positionToolingEdit = _this.tooling.position;
            if (_this.typeTooling != 2) {
                _this.qtyMttoPassesEdit = _this.tooling.mtceQty;
                _this.qtyCurrentPasesEdit = _this.tooling.actualQty;
                _this.qtyTotalPasesEdit = _this.tooling.totalQty;
                _this.qtyLifePasesEdit = _this.tooling.lifeQty;
            }
            _this.getAllStatus();
            _this.notifyLoading = _this.notify.setLoadingDone("Listo", _this.notifyLoading);
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
    ShowToolingsComponent.prototype.chargeToolingChanges = function () {
        if (this.mttoToolingEdit == "NA")
            this.mttoToolingEdit = "0";
        if (isNaN(Number(this.mttoToolingEdit)) || this.mttoToolingEdit == "") {
            this.notify.setNotification("Error", "Las semanas para mantenimiento no son numericas", "error");
        }
        if (isNaN(Number(this.qtyMttoPassesEdit)) || this.qtyMttoPassesEdit == null) {
            this.notify.setNotification("Error", "Las pasadas para mantenimiento no son numericas", "error");
        }
        else {
            this.notifyLoading = this.notify.setLoading("Guardando cambios", this.notifyLoading);
            var objTolingEdit = new objTooling();
            objTolingEdit.tool = this.serialToolingEdit;
            objTolingEdit.fkStatus = this.statusToolingEdit;
            objTolingEdit.rack = this.rackToolingEdit;
            objTolingEdit.position = this.positionToolingEdit;
            objTolingEdit.mtceMagazine = Number(this.mttoToolingEdit);
            objTolingEdit.mtcePallet = this.qtyMttoPassesEdit;
            this.saveToolingChanges(objTolingEdit);
        }
    };
    ShowToolingsComponent.prototype.saveToolingChanges = function (objTolingEdit) {
        var _this = this;
        this.toolingService.updateTooling(objTolingEdit, this.idToolingEdit).subscribe(function (results) {
            _this.notifyLoading = _this.notify.setLoadingDone(" Actualizado", _this.notifyLoading);
            _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Modific\u00F3 el herramental (" + objTolingEdit.tool + ")");
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
            _this.notifyLoading = _this.notify.setLoadingError(" Ocurrio un error", _this.notifyLoading);
            _this.getAllToolings();
        });
    };
    ShowToolingsComponent.prototype.getAllStatus = function () {
        var _this = this;
        this.toolingService.findAllStatus().subscribe(function (pstatus) {
            _this.statusArray = pstatus;
        });
    };
    ShowToolingsComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-lg');
    };
    ShowToolingsComponent.prototype.openModal2 = function (template) {
        this.modalRef2 = this.modalService.show(template);
        this.modalRef2.setClass('modal-md');
    };
    ShowToolingsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ShowToolingsComponent.prototype.weeksBetween = function (d1, d2) {
        var result = Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
        if (result < 0)
            result = 0;
        return result;
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], ShowToolingsComponent.prototype, "paginator", void 0);
    ShowToolingsComponent = __decorate([
        Component({
            selector: 'app-show-toolings',
            templateUrl: './show-toolings.component.html',
            styleUrls: ['./show-toolings.component.css']
        }),
        __metadata("design:paramtypes", [BsModalService, ToolingService, Notify, HistoryService])
    ], ShowToolingsComponent);
    return ShowToolingsComponent;
}());
export { ShowToolingsComponent };
//# sourceMappingURL=show-toolings.component.js.map