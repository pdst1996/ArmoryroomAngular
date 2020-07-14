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
import { Notify } from 'src/app/modules/notify/notify';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
var ToolingPartnumberComponent = /** @class */ (function () {
    function ToolingPartnumberComponent(toolingService, notify, elementRef) {
        this.toolingService = toolingService;
        this.notify = notify;
        this.elementRef = elementRef;
        this.radioModel = 'partNumberMode';
        this.txtElementsToSave = '';
    }
    ToolingPartnumberComponent.prototype.ngOnInit = function () {
        this.partNumber = 0;
        this.tooling = 0;
        this.elementsSelected = new Array();
        this.getCounterMask();
        this.getPartNumbers();
    };
    ToolingPartnumberComponent.prototype.cleanFields = function () {
        this.txtElementsToSave = '';
        this.elementsSelected = new Array();
        this.elements = new Array();
        this.partNumber = 0;
        this.tooling = 0;
    };
    ToolingPartnumberComponent.prototype.getPartNumbers = function () {
        var _this = this;
        this.toolingService.getPartNumbers().subscribe(function (partNumbers) {
            _this.partNumbers = partNumbers;
        });
    };
    ToolingPartnumberComponent.prototype.getCounterMask = function () {
        var _this = this;
        this.toolingService.getCounterMask().subscribe(function (CounterMasks) {
            _this.toolings = new Array();
            _this.toolings = CounterMasks;
        });
    };
    ToolingPartnumberComponent.prototype.fillToolingsByPartNumber = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Llenando herramentales", this.loader);
        this.toolingService.findToolingsByPartNumber(this.partNumber).subscribe(function (results) {
            _this.elements = results.data;
            _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
        });
    };
    ToolingPartnumberComponent.prototype.fillPartNumbersByTooling = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Llenando numeros de parte", this.loader);
        this.toolingService.findPartNumbersByTooling(this.tooling).subscribe(function (results) {
            _this.elements = results.data;
            _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
        });
    };
    ToolingPartnumberComponent.prototype.insertElements = function () {
        var _this = this;
        this.elementsToInsert = this.txtElementsToSave.trim().replace(/\r?\n/g, ",");
        this.loader = this.notify.setLoading("Insertando " + ((this.radioModel == "partNumberMode") ? ' contramascaras' : ' numeros de parte'), this.loader);
        if (this.radioModel == "partNumberMode") {
            this.toolingService.insertToolingsToPartNumber(this.partNumber, this.elementsToInsert).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                if (results.data.aceptados.length != 0) {
                    var aux = new Array();
                    aux = results.data.aceptados;
                    for (var _i = 0, aux_1 = aux; _i < aux_1.length; _i++) {
                        var iterator = aux_1[_i];
                        _this.txtElementsToSave = _this.txtElementsToSave.replace(iterator + "\n", "");
                        _this.txtElementsToSave = _this.txtElementsToSave.replace(iterator, "");
                    }
                    _this.fillToolingsByPartNumber();
                }
                if (results.data.rechazados.length != 0) {
                    _this.notify.setNotification("Erroneas", "Las contramascaras del recuadro fueron rechazadas", "error");
                    _this.elementRef.nativeElement.querySelector("#txtElements").focus();
                }
            });
        }
        else {
            this.toolingService.insertPartNumbersToTooling(this.tooling, this.elementsToInsert).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                if (results.data.aceptados.length != 0) {
                    var aux = new Array();
                    aux = results.data.aceptados;
                    for (var _i = 0, aux_2 = aux; _i < aux_2.length; _i++) {
                        var iterator = aux_2[_i];
                        _this.txtElementsToSave = _this.txtElementsToSave.replace(iterator + "\n", "");
                        _this.txtElementsToSave = _this.txtElementsToSave.replace(iterator, "");
                    }
                    _this.fillPartNumbersByTooling();
                }
                if (results.data.rechazados.length != 0) {
                    _this.notify.setNotification("Erroneas", "Los numeros de narte del recuadro fueron rechazados", "error");
                    _this.elementRef.nativeElement.querySelector("#txtElements").focus();
                }
            });
        }
    };
    ToolingPartnumberComponent.prototype.deleteElements = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Eliminando " + ((this.radioModel == "partNumberMode") ? ' herramantales' : ' numeros de parte'), this.loader);
        if (this.radioModel == "partNumberMode") {
            this.toolingService.deleteToolingFromPartNumber(this.partNumber, this.elementsSelected).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                _this.fillToolingsByPartNumber();
            });
        }
        else {
            this.toolingService.deletePartNumbersFromTooling(this.tooling, this.elementsSelected).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                _this.fillPartNumbersByTooling();
            });
        }
    };
    ToolingPartnumberComponent = __decorate([
        Component({
            selector: 'app-tooling-partnumber',
            templateUrl: './tooling-partnumber.component.html',
            styleUrls: ['./tooling-partnumber.component.css']
        }),
        __metadata("design:paramtypes", [ToolingService, Notify, ElementRef])
    ], ToolingPartnumberComponent);
    return ToolingPartnumberComponent;
}());
export { ToolingPartnumberComponent };
//# sourceMappingURL=tooling-partnumber.component.js.map