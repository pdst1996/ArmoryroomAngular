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
var MaintenanceRequestsService = /** @class */ (function () {
    function MaintenanceRequestsService(httpClient) {
        this.httpClient = httpClient;
        this.toolingUrl = Constants.SERVER + "tools";
        this.rmUrl = Constants.SERVER + "RequestMaintenance";
        this.intranetUrl = Constants.SERVER + "Auth/EmployeeNumber";
    }
    MaintenanceRequestsService.prototype.getToolingsValidation = function (data) {
        return this.httpClient.post(this.toolingUrl + "/getToolStatus", data);
    };
    MaintenanceRequestsService.prototype.getToolingById = function (id) {
        return this.httpClient.get(this.toolingUrl + "/getToolById/" + id).pipe();
    };
    MaintenanceRequestsService.prototype.findAllRequestMaintance = function () {
        return this.httpClient.get(this.rmUrl + "/all").pipe();
    };
    MaintenanceRequestsService.prototype.aproveRejectRequestMaintance = function (action, idRequestMaintance, userAprove) {
        return this.httpClient.put(this.rmUrl + "/updateAproved/" + idRequestMaintance + "/" + action + "/" + userAprove, null).pipe();
    };
    MaintenanceRequestsService.prototype.getEmployeeValidation = function (employee) {
        return this.httpClient.get(this.intranetUrl + "/" + employee).pipe();
    };
    MaintenanceRequestsService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], MaintenanceRequestsService);
    return MaintenanceRequestsService;
}());
export { MaintenanceRequestsService };
//# sourceMappingURL=maintenance-requests.service.js.map