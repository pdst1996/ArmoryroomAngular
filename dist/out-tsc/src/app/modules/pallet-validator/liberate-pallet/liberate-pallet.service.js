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
var LiberatePalletService = /** @class */ (function () {
    function LiberatePalletService(httpClient) {
        this.httpClient = httpClient;
        this.urlLiberate = Constants.SERVER + "stations";
        this.urlToolings = Constants.SERVER + "tools";
    }
    LiberatePalletService.prototype.getPalletsBlocked = function () {
        return this.httpClient.get(this.urlToolings + "/getToolingsBlocked").pipe();
    };
    LiberatePalletService.prototype.liberatePallet = function (idpallet) {
        return this.httpClient.post(this.urlToolings + "/changeBlocked/" + idpallet + "/false", "").pipe();
    };
    LiberatePalletService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], LiberatePalletService);
    return LiberatePalletService;
}());
export { LiberatePalletService };
//# sourceMappingURL=liberate-pallet.service.js.map