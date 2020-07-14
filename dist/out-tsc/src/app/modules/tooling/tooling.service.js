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
var ToolingService = /** @class */ (function () {
    function ToolingService(httpClient) {
        this.httpClient = httpClient;
        this.projectUrl = Constants.SERVER + "projects";
        this.partNumberUrl = Constants.SERVER + "partnumbers";
        this.typeUrl = Constants.SERVER + "types";
        this.toolingUrl = Constants.SERVER + "tools";
        this.statusUrl = Constants.SERVER + "status";
        this.rmUrl = Constants.SERVER + "RequestMaintenance";
        this.intranetUrl = Constants.SERVER + "Auth/EmployeeNumber";
        this.stationsUrl = Constants.SERVER + "stations";
        this.counterMaskUrl = Constants.SERVER + "tools";
        this.groupsUrl = Constants.SERVER + "groups";
        this.urlStations = Constants.SERVER + "stations";
    }
    ToolingService.prototype.findAllProjects = function () {
        return this.httpClient.get(this.projectUrl + "/all").pipe();
    };
    ToolingService.prototype.getPartNumbersByProject = function (id) {
        return this.httpClient.get(this.partNumberUrl + "/byProject/" + id).pipe();
    };
    ToolingService.prototype.saveNewTooling = function (obj) {
        return this.httpClient.post(this.toolingUrl + "/insert", obj).pipe();
    };
    ToolingService.prototype.updateTooling = function (obj, idTooling) {
        return this.httpClient.put(this.toolingUrl + "/update/" + idTooling, obj).pipe();
    };
    ToolingService.prototype.getAllToolings = function () {
        return this.httpClient.get(this.toolingUrl + "/all").pipe();
    };
    ToolingService.prototype.getToolingsValidation = function (data) {
        return this.httpClient.post(this.toolingUrl + "/getToolStatus", data);
    };
    ToolingService.prototype.changeStatusTool = function (data, pkNewStatus) {
        console.log(data + ":" + pkNewStatus);
        return this.httpClient.post(this.toolingUrl + "/changeStatusTools/" + pkNewStatus, data);
    };
    ToolingService.prototype.ioToolings = function (data) {
        return this.httpClient.post(this.toolingUrl + "/ioTools", data);
    };
    ToolingService.prototype.getToolingById = function (id) {
        return this.httpClient.get(this.toolingUrl + "/getToolById/" + id).pipe();
    };
    ToolingService.prototype.findAllTypes = function () {
        return this.httpClient.get(this.typeUrl + "/all").pipe();
    };
    ToolingService.prototype.findAllStations = function () {
        return this.httpClient.get(this.stationsUrl + "/all").pipe();
    };
    ToolingService.prototype.findAllStatus = function () {
        return this.httpClient.get(this.statusUrl + "/all").pipe();
    };
    ToolingService.prototype.findAllRequestMaintance = function () {
        return this.httpClient.get(this.rmUrl + "/all").pipe();
    };
    ToolingService.prototype.aproveRejectRequestMaintance = function (action, idRequestMaintance, userAprove) {
        return this.httpClient.put(this.rmUrl + "/updateAproved/" + idRequestMaintance + "/" + action + "/" + userAprove, null).pipe();
    };
    ToolingService.prototype.getEmployeeValidation = function (employee) {
        return this.httpClient.get(this.intranetUrl + "/" + employee).pipe();
    };
    //TOOLINGS PART NUMBERS
    ToolingService.prototype.getPartNumbers = function () {
        return this.httpClient.get(this.partNumberUrl + "/all").pipe();
    };
    ToolingService.prototype.getCounterMask = function () {
        return this.httpClient.get(this.counterMaskUrl + "/all").pipe();
    };
    ToolingService.prototype.findToolingsByPartNumber = function (id) {
        return this.httpClient.get(this.groupsUrl + "/findByPartNumber/" + id).pipe();
    };
    ToolingService.prototype.findPartNumbersByTooling = function (id) {
        return this.httpClient.get(this.groupsUrl + "/findByTooling/" + id).pipe();
    };
    ToolingService.prototype.insertToolingsToPartNumber = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/insertByPartNumber/" + id, values).pipe();
    };
    ToolingService.prototype.insertPartNumbersToTooling = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/insertByTooling/" + id, values).pipe();
    };
    ToolingService.prototype.deleteToolingFromPartNumber = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/deleteGroupsByPartNumbers/" + id, values).pipe();
    };
    ToolingService.prototype.deletePartNumbersFromTooling = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/deleteGroupsByTooling/" + id, values).pipe();
    };
    ToolingService.prototype.findStations = function () {
        return this.httpClient.get(this.urlStations + "/all").pipe();
    };
    ToolingService.prototype.findToolingsByStation = function (id) {
        return this.httpClient.get(this.groupsUrl + "/findByPartNumber/" + id).pipe();
    };
    ToolingService.prototype.findStationsByTooling = function (id) {
        return this.httpClient.get(this.groupsUrl + "/findByTooling/" + id).pipe();
    };
    ToolingService.prototype.insertToolingsToStation = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/insertByPartNumber/" + id, values).pipe();
    };
    ToolingService.prototype.insertStationsToTooling = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/insertByTooling/" + id, values).pipe();
    };
    ToolingService.prototype.deleteToolingFromStation = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/deleteGroupsByPartNumbers/" + id, values).pipe();
    };
    ToolingService.prototype.deleteStationsFromTooling = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/deleteGroupsByTooling/" + id, values).pipe();
    };
    ToolingService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ToolingService);
    return ToolingService;
}());
export { ToolingService };
//# sourceMappingURL=tooling.service.js.map