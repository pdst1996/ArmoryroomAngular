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
import { Constants } from "src/app/helpers/constats";
var ScanPalletService = /** @class */ (function () {
    function ScanPalletService(httpClient) {
        this.httpClient = httpClient;
        this.urlStations = Constants.SERVER + "stations";
        this.urlValidator = Constants.SERVER + "palletValidatorActions";
    }
    ScanPalletService.prototype.findStations = function () {
        return this.httpClient.get(this.urlStations + "/all").pipe();
    };
    ScanPalletService.prototype.getPalletValidation = function (serialNumber, station) {
        console.log(this.urlValidator + "/validateStation?serialNumber=" + serialNumber + "&station=" + station);
        return this.httpClient.get(this.urlValidator + "/validateStation?serialNumber=" + serialNumber + "&station=" + station).pipe();
    };
    ScanPalletService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ScanPalletService);
    return ScanPalletService;
}());
export { ScanPalletService };
//# sourceMappingURL=scan-pallet.service.js.map