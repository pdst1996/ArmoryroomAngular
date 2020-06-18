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
import { ToolingClass } from 'src/app/models/tooling/tooling.model';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Notify } from 'src/app/modules/notify/notify';
import { RequestMaintance } from 'src/app/models/request-maintance/request-maintance.model';
import { RequimttoService } from 'src/app/modules/requimtto/requimtto.service';
import { Constants } from 'src/app/helpers/constats';
var RequimttoComponent = /** @class */ (function () {
    function RequimttoComponent(toolingService, notify, element, requimttoService) {
        this.toolingService = toolingService;
        this.notify = notify;
        this.element = element;
        this.requimttoService = requimttoService;
        this.displayedColumns = ['id', 'project', 'serial', 'type', 'qtyPasses', 'qtyMtto', 'proxMtto', 'status'];
        this.commentToAskMaintance = "";
        this.toolingToAskMaintance = "";
        this.pktool = 0;
    }
    RequimttoComponent.prototype.ngOnInit = function () {
        this.getAllToolings();
    };
    RequimttoComponent.prototype.getAllToolings = function () {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Cargando herramentales", this.notifyLoader);
        this.toolingService.getAllToolings().subscribe(function (ptoolings) {
            _this.toolings = ptoolings;
            _this.dataSource = new MatTableDataSource(_this.toolings);
            _this.dataSource.paginator = _this.paginator;
            _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
        });
        this.dataApplication = JSON.parse(localStorage.getItem(Constants.localStorage));
    };
    RequimttoComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    RequimttoComponent.prototype.setSerialOnTextBox = function (tool, pktool) {
        this.toolingToAskMaintance = tool;
        this.element.nativeElement.querySelector("#txtComments").focus();
        this.pktool = pktool;
    };
    RequimttoComponent.prototype.askToolingMaintance = function () {
        var _this = this;
        var obj = new RequestMaintance();
        obj.comments = this.commentToAskMaintance;
        obj.fkTooling = new ToolingClass(this.pktool);
        obj.userRequest = this.dataApplication.userInfo.userName;
        this.notifyLoader = this.notify.setLoading("Insertando", this.notifyLoader);
        console.log(obj);
        this.requimttoService.insertRequiMtto(obj).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
                _this.pktool = 0;
                _this.toolingToAskMaintance = "";
                _this.commentToAskMaintance = "";
            }
            else {
                _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
            }
        });
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], RequimttoComponent.prototype, "paginator", void 0);
    RequimttoComponent = __decorate([
        Component({
            selector: 'app-requimtto',
            templateUrl: './requimtto.component.html',
            styleUrls: ['./requimtto.component.css']
        }),
        __metadata("design:paramtypes", [ToolingService, Notify, ElementRef, RequimttoService])
    ], RequimttoComponent);
    return RequimttoComponent;
}());
export { RequimttoComponent };
//# sourceMappingURL=requimtto.component.js.map