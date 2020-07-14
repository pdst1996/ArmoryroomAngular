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
var CountermaskService = /** @class */ (function () {
    function CountermaskService(httpClient) {
        this.httpClient = httpClient;
        this.partNumberUrl = Constants.SERVER + "partnumbers";
        this.counterMaskUrl = Constants.SERVER + "tools";
        this.groupsUrl = Constants.SERVER + "groups";
    }
    //Armoryroom/groups/findByPartNumber/4
    CountermaskService.prototype.getPartNumbers = function () {
        return this.httpClient.get(this.partNumberUrl + "/all").pipe();
    };
    CountermaskService.prototype.getCounterMask = function () {
        return this.httpClient.get(this.counterMaskUrl + "/all").pipe();
    };
    CountermaskService.prototype.findCounterMaskByPartNumber = function (id) {
        return this.httpClient.get(this.groupsUrl + "/findByPartNumber/" + id).pipe();
    };
    CountermaskService.prototype.findPartNumberByCounterMask = function (id) {
        return this.httpClient.get(this.groupsUrl + "/findByTooling/" + id).pipe();
    };
    CountermaskService.prototype.insertCounterMaskToPartNumber = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/insertByPartNumber/" + id, values).pipe();
    };
    CountermaskService.prototype.insertPartNumbersToCounterMask = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/insertByTooling/" + id, values).pipe();
    };
    CountermaskService.prototype.deleteCounterMasksFromPartNumber = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/deleteGroupsByPartNumbers/" + id, values).pipe();
    };
    CountermaskService.prototype.deletePartNumbersFromCounterMask = function (id, values) {
        return this.httpClient.post(this.groupsUrl + "/deleteGroupsByTooling/" + id, values).pipe();
    };
    CountermaskService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], CountermaskService);
    return CountermaskService;
}());
export { CountermaskService };
//# sourceMappingURL=countermask.service.js.map