var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StationsComponent } from 'src/app/components/stations/stations.component';
var routes = [
    { path: '', component: StationsComponent },
];
var StationsRoutingModule = /** @class */ (function () {
    function StationsRoutingModule() {
    }
    StationsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], StationsRoutingModule);
    return StationsRoutingModule;
}());
export { StationsRoutingModule };
//# sourceMappingURL=stations-routing.module.js.map