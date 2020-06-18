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
import { HistoryService } from 'src/app/modules/history/history.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Notify } from 'src/app/modules/notify/notify';
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(historyService, notify) {
        this.historyService = historyService;
        this.notify = notify;
        this.displayedColumns = ['author', 'changes', 'date'];
    }
    HistoryComponent.prototype.ngOnInit = function () {
        this.getAllHistory();
    };
    HistoryComponent.prototype.getAllHistory = function () {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Cargando historial", this.notifyLoader);
        this.historyService.getHistory().subscribe(function (results) {
            _this.dataSource = new MatTableDataSource(results.reverse());
            _this.dataSource.paginator = _this.paginator;
            _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
        });
    };
    HistoryComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], HistoryComponent.prototype, "paginator", void 0);
    HistoryComponent = __decorate([
        Component({
            selector: 'app-history',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.css']
        }),
        __metadata("design:paramtypes", [HistoryService, Notify])
    ], HistoryComponent);
    return HistoryComponent;
}());
export { HistoryComponent };
//# sourceMappingURL=history.component.js.map