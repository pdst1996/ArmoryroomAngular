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
import { BsModalService } from 'ngx-bootstrap/modal';
import { Constants } from 'src/app/helpers/constats';
import { LiberatePalletService } from 'src/app/modules/pallet-validator/liberate-pallet/liberate-pallet.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
var LiberatePalletComponent = /** @class */ (function () {
    function LiberatePalletComponent(modalService, liberateService, notify, historyService) {
        this.modalService = modalService;
        this.liberateService = liberateService;
        this.notify = notify;
        this.historyService = historyService;
        this.displayedColumns = ['id', 'project', 'serial', 'qtyPasses', 'status', 'liberate'];
    }
    LiberatePalletComponent.prototype.ngOnInit = function () {
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
        this.getPalletsBlocked();
    };
    LiberatePalletComponent.prototype.liberate = function (element, modal) {
        this.palletToLiberate = element;
        this.openModal(modal);
    };
    LiberatePalletComponent.prototype.liberatePallet = function () {
        var _this = this;
        this.liberateService.liberatePallet(this.palletToLiberate.pkTooling).subscribe(function (results) {
            if (results.success) {
                _this.notify.setNotification("HECHO", "Se libero el pallet " + _this.palletToLiberate.tooling, "success");
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Liber\u00F3 el pallet (" + _this.palletToLiberate.tooling + ")");
                _this.closeModal();
            }
            else {
                _this.notify.setNotification("HECHO", results.message, "error");
            }
            _this.getPalletsBlocked();
        });
    };
    LiberatePalletComponent.prototype.getPalletsBlocked = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Cargando pallets", this.loader);
        this.toolingTable = new Array();
        this.liberateService.getPalletsBlocked().subscribe(function (ptoolings) {
            _this.loader = _this.notify.setLoadingDone("Listo", _this.loader);
            _this.toolingTable = ptoolings;
            _this.dataSource = new MatTableDataSource(_this.toolingTable);
            _this.dataSource.paginator = _this.paginator;
        });
    };
    LiberatePalletComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-md');
    };
    LiberatePalletComponent.prototype.closeModal = function () {
        this.modalRef.hide();
    };
    LiberatePalletComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], LiberatePalletComponent.prototype, "paginator", void 0);
    LiberatePalletComponent = __decorate([
        Component({
            selector: 'app-liberate-pallet',
            templateUrl: './liberate-pallet.component.html',
            styleUrls: ['./liberate-pallet.component.css']
        }),
        __metadata("design:paramtypes", [BsModalService, LiberatePalletService, Notify, HistoryService])
    ], LiberatePalletComponent);
    return LiberatePalletComponent;
}());
export { LiberatePalletComponent };
//# sourceMappingURL=liberate-pallet.component.js.map