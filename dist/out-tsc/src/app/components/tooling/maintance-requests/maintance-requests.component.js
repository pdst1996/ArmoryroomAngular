var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Notify } from 'src/app/modules/notify/notify';
import { BsModalService } from 'ngx-bootstrap/modal';
var MaintanceRequestsComponent = /** @class */ (function () {
    function MaintanceRequestsComponent(toolingService, notify, modalService, element, historyService) {
        this.toolingService = toolingService;
        this.notify = notify;
        this.modalService = modalService;
        this.element = element;
        this.historyService = historyService;
        this.displayedColumns = ['id', 'tooling', 'requisitor', 'date', 'comment', 'auth'];
        this.radioModel = 'in';
        this.userPermissionToAproveReject = false;
        this.action = false;
        this.pkRequest = 0;
        this.dataSource = new MatTableDataSource(this.requests);
        this.valueSign = "";
        this.thereRequests = false;
        this.applicationData = new ApplicationData();
        this.applicationData.profiles = new Array();
    }
    MaintanceRequestsComponent.prototype.ngOnInit = function () {
        this.dataSource.paginator = this.paginator;
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
        if (this.applicationData != null) {
            this.profiles = this.applicationData.profiles;
            this.user = this.applicationData.userInfo;
        }
        for (var _i = 0, _a = this.profiles; _i < _a.length; _i++) {
            var profile = _a[_i];
            if (profile.idProfile == 41) {
                this.userPermissionToAproveReject = true;
            }
        }
        this.getAllRequestMaintance();
    };
    MaintanceRequestsComponent.prototype.getAllRequestMaintance = function () {
        var _this = this;
        this.toolingService.findAllRequestMaintance().subscribe(function (prequests) {
            _this.requests = new Array();
            for (var _i = 0, prequests_1 = prequests; _i < prequests_1.length; _i++) {
                var iterator = prequests_1[_i];
                if (iterator.aproved == null) {
                    _this.requests.push(iterator);
                }
            }
            if (_this.requests.length != 0)
                _this.thereRequests = true;
            _this.dataSource = new MatTableDataSource(_this.requests);
            _this.dataSource.paginator = _this.paginator;
        });
    };
    MaintanceRequestsComponent.prototype.openModalConfirmRequest = function (action, pkRequest, template) {
        this.valueSign = (action) ? "aprobar" : "denegar";
        this.openModal(template);
        this.action = action;
        this.pkRequest = pkRequest;
    };
    MaintanceRequestsComponent.prototype.signRequest = function () {
        var _this = this;
        var value = "";
        var value2 = "";
        if (this.action) {
            value = "Aprobando requisicion";
            value2 = "aprobó";
        }
        else {
            value = "Rechazando requisicion";
            value2 = "denegó";
        }
        this.notifyLoading = this.notify.setLoading(" " + value, this.notifyLoading);
        this.toolingService.aproveRejectRequestMaintance(this.action, this.pkRequest, this.user.userName).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoading = _this.notify.setLoadingDone(" Listo", _this.notifyLoading);
                _this.modalRef.hide();
                _this.historyService.insertNewHistory(_this.user.userName, "Se " + value2 + " la requisici\u00F3n " + _this.pkRequest);
                _this.getAllRequestMaintance();
            }
            else {
                _this.notifyLoading = _this.notify.setLoadingError(" Error", _this.notifyLoading);
                _this.notify.setNotification("ERROR", results.message + ". Se recomiendo actualizar la pagina", "error");
                _this.modalRef.hide();
            }
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
            _this.notifyLoading = _this.notify.setLoadingError(" Ocurrio un error", _this.notifyLoading);
            _this.getAllRequestMaintance();
            _this.modalRef.hide();
        });
    };
    MaintanceRequestsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    MaintanceRequestsComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], MaintanceRequestsComponent.prototype, "paginator", void 0);
    MaintanceRequestsComponent = __decorate([
        Component({
            selector: 'app-maintance-requests',
            templateUrl: './maintance-requests.component.html',
            styleUrls: ['./maintance-requests.component.css']
        }),
        __metadata("design:paramtypes", [ToolingService,
            Notify,
            BsModalService,
            ElementRef,
            HistoryService])
    ], MaintanceRequestsComponent);
    return MaintanceRequestsComponent;
}());
export { MaintanceRequestsComponent };
//# sourceMappingURL=maintance-requests.component.js.map