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
var StationsService = /** @class */ (function () {
    function StationsService(httpClient) {
        this.httpClient = httpClient;
        this.stationsUrl = Constants.SERVER + "stations";
    }
    StationsService.prototype.findAllStations = function () {
        return this.httpClient.get(this.stationsUrl + "/all").pipe();
    };
    StationsService.prototype.getStationById = function (id) {
        return this.httpClient.get(this.stationsUrl + "/getById/" + id).pipe();
    };
    StationsService.prototype.updateStation = function (obj) {
        return this.httpClient.post(this.stationsUrl + "/insert", obj).pipe();
    };
    StationsService.prototype.deleteStation = function (id) {
        return this.httpClient.delete(this.stationsUrl + "/delete/" + id).pipe();
    };
    StationsService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], StationsService);
    return StationsService;
}());
export { StationsService };
//# sourceMappingURL=stations.service.js.map