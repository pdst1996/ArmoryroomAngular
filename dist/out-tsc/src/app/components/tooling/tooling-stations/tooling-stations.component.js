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
var ToolingStationsComponent = /** @class */ (function () {
    function ToolingStationsComponent(toolingService, notify, elementRef) {
        this.toolingService = toolingService;
        this.notify = notify;
        this.elementRef = elementRef;
        this.radioModel = 'stationMode';
        this.txtElementsToSave = '';
    }
    ToolingStationsComponent.prototype.ngOnInit = function () {
        this.station = 0;
        this.tooling = 0;
        this.elementsSelected = new Array();
        this.getCounterMask();
        this.getStations();
    };
    ToolingStationsComponent.prototype.cleanFields = function () {
        this.txtElementsToSave = '';
        this.elementsSelected = new Array();
        this.elements = new Array();
        this.station = 0;
        this.tooling = 0;
    };
    ToolingStationsComponent.prototype.getStations = function () {
        var _this = this;
        this.toolingService.findStations().subscribe(function (stations) {
            _this.stations = stations.data;
        });
    };
    ToolingStationsComponent.prototype.getCounterMask = function () {
        var _this = this;
        this.toolingService.getCounterMask().subscribe(function (CounterMasks) {
            _this.toolings = new Array();
            _this.toolings = CounterMasks;
        });
    };
    ToolingStationsComponent.prototype.fillToolingsByStation = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Llenando herramentales", this.loader);
        this.toolingService.findToolingsByStation(this.station).subscribe(function (results) {
            _this.elements = results.data;
            _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
        });
    };
    ToolingStationsComponent.prototype.fillStationsByTooling = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Llenando estaciones", this.loader);
        this.toolingService.findStationsByTooling(this.tooling).subscribe(function (results) {
            _this.elements = results.data;
            _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
        });
    };
    ToolingStationsComponent.prototype.insertElements = function () {
        var _this = this;
        this.elementsToInsert = this.txtElementsToSave.trim().replace(/\r?\n/g, ",");
        this.loader = this.notify.setLoading("Insertando " + ((this.radioModel == "stationMode") ? ' contramascaras' : ' numeros de parte'), this.loader);
        if (this.radioModel == "stationMode") {
            this.toolingService.insertToolingsToPartNumber(this.station, this.elementsToInsert).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                if (results.data.aceptados.length != 0) {
                    var aux = new Array();
                    aux = results.data.aceptados;
                    for (var _i = 0, aux_1 = aux; _i < aux_1.length; _i++) {
                        var iterator = aux_1[_i];
                        _this.txtElementsToSave = _this.txtElementsToSave.replace(iterator + "\n", "");
                        _this.txtElementsToSave = _this.txtElementsToSave.replace(iterator, "");
                    }
                    _this.fillToolingsByStation();
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
                    _this.fillStationsByTooling();
                }
                if (results.data.rechazados.length != 0) {
                    _this.notify.setNotification("Erroneas", "Los numeros de narte del recuadro fueron rechazados", "error");
                    _this.elementRef.nativeElement.querySelector("#txtElements").focus();
                }
            });
        }
    };
    ToolingStationsComponent.prototype.deleteElements = function () {
        var _this = this;
        this.loader = this.notify.setLoading("Eliminando " + ((this.radioModel == "stationMode") ? ' herramantales' : ' numeros de parte'), this.loader);
        if (this.radioModel == "stationMode") {
            this.toolingService.deleteToolingFromPartNumber(this.station, this.elementsSelected).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                _this.fillToolingsByStation();
            });
        }
        else {
            this.toolingService.deletePartNumbersFromTooling(this.tooling, this.elementsSelected).subscribe(function (results) {
                _this.loader = _this.notify.setLoadingDone("Completado", _this.loader);
                _this.fillStationsByTooling();
            });
        }
    };
    ToolingStationsComponent = __decorate([
        Component({
            selector: 'app-tooling-stations',
            templateUrl: './tooling-stations.component.html',
            styleUrls: ['./tooling-stations.component.css']
        }),
        __metadata("design:paramtypes", [ToolingService, Notify, ElementRef])
    ], ToolingStationsComponent);
    return ToolingStationsComponent;
}());
export { ToolingStationsComponent };
//# sourceMappingURL=tooling-stations.component.js.map