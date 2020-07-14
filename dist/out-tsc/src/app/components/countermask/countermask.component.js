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
import { CountermaskService } from 'src/app/modules/countermask/countermask.service';
import { Notify } from 'src/app/modules/notify/notify';
var CountermaskComponent = /** @class */ (function () {
    function CountermaskComponent(countermaskService, notify, elementRef) {
        this.countermaskService = countermaskService;
        this.notify = notify;
        this.elementRef = elementRef;
        this.bVisibleNP = 'npdiv';
        this.textValue = '';
    }
    CountermaskComponent.prototype.ngOnInit = function () {
        this.pNParte = 0;
        this.pkCMask = 0;
        this.ngtxtAfill = new Array();
        this.getCounterMask();
        this.getPartNumbers();
    };
    CountermaskComponent.prototype.cleanFields = function () {
        this.textValue = '';
        this.ngtxtAfill = new Array();
        this.txtAfill = new Array();
        this.pNParte = 0;
        this.pkCMask = 0;
    };
    CountermaskComponent.prototype.getPartNumbers = function () {
        var _this = this;
        this.countermaskService.getPartNumbers().subscribe(function (PartNumbers) {
            _this.PartNumbers = PartNumbers;
        });
    };
    CountermaskComponent.prototype.getCounterMask = function () {
        var _this = this;
        this.countermaskService.getCounterMask().subscribe(function (CounterMasks) {
            _this.nCounterMasks = new Array();
            // for(const iterator of CounterMasks)
            //   if(iterator.fkType.pktype==5)
            //     this.nCounterMasks.push(iterator);
            _this.nCounterMasks = CounterMasks;
        });
    };
    CountermaskComponent.prototype.mFillCMPN = function () {
        var _this = this;
        this.Loader = this.notify.setLoading("Llenando ContraMascaras", this.Loader);
        this.countermaskService.findCounterMaskByPartNumber(this.pNParte).subscribe(function (results) {
            var data = results.data;
            _this.txtAfill = new Array();
            _this.txtAfill = data;
            console.log(data);
            _this.Loader = _this.notify.setLoadingDone("Completado", _this.Loader);
        });
    };
    CountermaskComponent.prototype.mFillPNCM = function () {
        var _this = this;
        this.Loader = this.notify.setLoading("Llenando Numeros de Parte", this.Loader);
        this.countermaskService.findPartNumberByCounterMask(this.pkCMask).subscribe(function (results) {
            var data = results.data;
            _this.txtAfill = new Array();
            _this.txtAfill = data;
            console.log(data);
            _this.Loader = _this.notify.setLoadingDone("Completado", _this.Loader);
        });
    };
    CountermaskComponent.prototype.mInsert = function () {
        var _this = this;
        this.ValueContent = this.textValue.trim().replace(/\r?\n/g, ",");
        this.Loader = this.notify.setLoading("Insertando " + ((this.bVisibleNP == "npdiv") ? ' contramascaras' : ' numeros de parte'), this.Loader);
        if (this.bVisibleNP == "npdiv") {
            this.countermaskService.insertCounterMaskToPartNumber(this.pNParte, this.ValueContent).subscribe(function (results) {
                _this.Loader = _this.notify.setLoadingDone("Completado", _this.Loader);
                if (results.data.aceptados.length != 0) {
                    var aux = new Array();
                    aux = results.data.aceptados;
                    for (var _i = 0, aux_1 = aux; _i < aux_1.length; _i++) {
                        var iterator = aux_1[_i];
                        _this.textValue = _this.textValue.replace(iterator + "\n", "");
                        _this.textValue = _this.textValue.replace(iterator, "");
                    }
                    _this.mFillCMPN();
                }
                if (results.data.rechazados.length != 0) {
                    _this.notify.setNotification("Erroneas", "Las contramascaras del recuadro fueron rechazadas", "error");
                    _this.elementRef.nativeElement.querySelector("#txtElements").focus();
                }
            });
        }
        else {
            this.countermaskService.insertPartNumbersToCounterMask(this.pkCMask, this.ValueContent).subscribe(function (results) {
                _this.Loader = _this.notify.setLoadingDone("Completado", _this.Loader);
                if (results.data.aceptados.length != 0) {
                    var aux = new Array();
                    aux = results.data.aceptados;
                    for (var _i = 0, aux_2 = aux; _i < aux_2.length; _i++) {
                        var iterator = aux_2[_i];
                        _this.textValue = _this.textValue.replace(iterator + "\n", "");
                        _this.textValue = _this.textValue.replace(iterator, "");
                    }
                    _this.mFillPNCM();
                }
                if (results.data.rechazados.length != 0) {
                    _this.notify.setNotification("Erroneas", "Los numeros de narte del recuadro fueron rechazados", "error");
                    _this.elementRef.nativeElement.querySelector("#txtElements").focus();
                }
            });
        }
    };
    CountermaskComponent.prototype.mDelete = function () {
        var _this = this;
        this.ValuestoDelete = "";
        this.Loader = this.notify.setLoading("Eliminando " + ((this.bVisibleNP == "npdiv") ? 'ContraMascaras' : 'Numeros de Parte'), this.Loader);
        if (this.bVisibleNP == "npdiv") {
            this.countermaskService.deleteCounterMasksFromPartNumber(this.pNParte, this.ngtxtAfill).subscribe(function (results) {
                _this.Loader = _this.notify.setLoadingDone("Completado", _this.Loader);
                _this.mFillCMPN();
            });
        }
        else {
            this.countermaskService.deletePartNumbersFromCounterMask(this.pkCMask, this.ngtxtAfill).subscribe(function (results) {
                _this.Loader = _this.notify.setLoadingDone("Completado", _this.Loader);
                _this.mFillPNCM();
            });
        }
    };
    CountermaskComponent = __decorate([
        Component({
            selector: 'app-countermask',
            templateUrl: './countermask.component.html',
            styleUrls: ['./countermask.component.css']
        }),
        __metadata("design:paramtypes", [CountermaskService, Notify, ElementRef])
    ], CountermaskComponent);
    return CountermaskComponent;
}());
export { CountermaskComponent };
//# sourceMappingURL=countermask.component.js.map