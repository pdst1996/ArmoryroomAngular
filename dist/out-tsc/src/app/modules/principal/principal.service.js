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
import { HttpClient } from "@angular/common/http";
import { Constants } from "../../helpers/constats";
var PrincipalService = /** @class */ (function () {
    function PrincipalService(http) {
        this.http = http;
        this.loginResponse = JSON.parse(localStorage.getItem(Constants.localStorage));
    }
    PrincipalService_1 = PrincipalService;
    PrincipalService.prototype.getTest = function (data) {
        return this.http
            .get(PrincipalService_1.ENDPOINT_GET_TEST, {
            params: data
        })
            .pipe();
    };
    PrincipalService.prototype.postTest = function (data) {
        return this.http
            .post(PrincipalService_1.ENDPOINT_POST_TEST, data)
            .pipe();
    };
    var PrincipalService_1;
    PrincipalService.ENDPOINT_GET_TEST = Constants.SERVER + "Get/Test/";
    PrincipalService.ENDPOINT_POST_TEST = Constants.SERVER + "Post/Test/";
    PrincipalService = PrincipalService_1 = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], PrincipalService);
    return PrincipalService;
}());
export { PrincipalService };
//# sourceMappingURL=principal.service.js.map