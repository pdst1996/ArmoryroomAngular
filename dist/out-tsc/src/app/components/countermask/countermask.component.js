var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CountermaskService } from 'src/app/modules/countermask/countermask.service';
var CountermaskComponent = /** @class */ (function () {
    function CountermaskComponent(projectService) {
        this.projectService = projectService;
        this.bVisibleNP = "npdiv";
        this.textValue = '';
    }
    CountermaskComponent.prototype.ngOnInit = function () {
        this.pNParte = 0;
        this.getCounterMask();
        this.getPartNumbers();
    };
    CountermaskComponent.prototype.getPartNumbers = function () {
        var _this = this;
        this.projectService.getPartNumbers().subscribe(function (PartNumbers) {
            _this.PartNumbers = PartNumbers;
        });
    };
    CountermaskComponent.prototype.getCounterMask = function () {
        var _this = this;
        this.projectService.getCounterMask().subscribe(function (CounterMasks) {
            _this.nCounterMasks = new Array();
            for (var _i = 0, CounterMasks_1 = CounterMasks; _i < CounterMasks_1.length; _i++) {
                var iterator = CounterMasks_1[_i];
                if (iterator.fkType.pktype == 5) {
                    _this.nCounterMasks.push(iterator);
                }
            }
            console.log(CounterMasks);
        });
    };
    CountermaskComponent.prototype.mInsert = function (value) {
        this.ValueContent = value.split('\n');
        for (var _i = 0, _a = this.ValueContent; _i < _a.length; _i++) {
            var iterator = _a[_i];
            alert(iterator);
        }
    };
    CountermaskComponent = __decorate([
        Component({
            selector: 'app-countermask',
            templateUrl: './countermask.component.html',
            styleUrls: ['./countermask.component.css']
        }),
        __metadata("design:paramtypes", [CountermaskService])
    ], CountermaskComponent);
    return CountermaskComponent;
}());
export { CountermaskComponent };
//# sourceMappingURL=countermask.component.js.map