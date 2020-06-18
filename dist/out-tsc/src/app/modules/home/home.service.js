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
import { Constants } from "../../helpers/constats";
var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
        this.loginResponse = JSON.parse(localStorage.getItem(Constants.localStorage));
    }
    HomeService_1 = HomeService;
    HomeService.prototype.RefreshApplicationData = function (data) {
        return this.http
            .get(HomeService_1.ENDPOINT_REFRESH_DATA_AND_MENUS, {
            params: data
        })
            .pipe();
    };
    var HomeService_1;
    HomeService.ENDPOINT_REFRESH_DATA_AND_MENUS = Constants.SERVER + "Refresh/DataAndMenus/";
    HomeService = HomeService_1 = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], HomeService);
    return HomeService;
}());
export { HomeService };
//# sourceMappingURL=home.service.js.map