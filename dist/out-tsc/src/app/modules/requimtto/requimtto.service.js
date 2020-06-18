var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from '../../helpers/constats';
var RequimttoService = /** @class */ (function () {
    function RequimttoService(httpClient) {
        this.httpClient = httpClient;
        this.questionsUrl = Constants.SERVER + "RequestMaintenance";
    }
    RequimttoService.prototype.insertRequiMtto = function (obj) {
        return this.httpClient.post(this.questionsUrl + "/insert", obj).pipe();
    };
    RequimttoService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], RequimttoService);
    return RequimttoService;
}());
export { RequimttoService };
//# sourceMappingURL=requimtto.service.js.map