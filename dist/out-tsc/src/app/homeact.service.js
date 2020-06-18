var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Constants } from "./helpers/constats";
var HomeAct = /** @class */ (function () {
    function HomeAct(router) {
        this.router = router;
    }
    HomeAct.prototype.canActivate = function (route, state) {
        if (!localStorage.getItem(Constants.localStorage)) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
        return false;
    };
    HomeAct = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], HomeAct);
    return HomeAct;
}());
export { HomeAct };
//# sourceMappingURL=homeact.service.js.map