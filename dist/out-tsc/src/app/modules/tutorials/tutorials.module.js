var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialsComponent } from '../../components/tutorials/tutorials.component';
import { TutorialsRoutingModule } from './tutorials-routing.module';
//import { RevealModule } from '../../modules/reveal/reveal-module'
var TutorialsModule = /** @class */ (function () {
    function TutorialsModule() {
    }
    TutorialsModule = __decorate([
        NgModule({
            declarations: [TutorialsComponent],
            imports: [
                CommonModule,
                TutorialsRoutingModule
            ]
        }),
        __metadata("design:paramtypes", [])
    ], TutorialsModule);
    return TutorialsModule;
}());
export { TutorialsModule };
//# sourceMappingURL=tutorials.module.js.map