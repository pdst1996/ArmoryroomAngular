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
import { HistoryLog } from "src/app/models/history/history.model";
var HistoryService = /** @class */ (function () {
    function HistoryService(httpClient) {
        this.httpClient = httpClient;
        this.historyUrl = Constants.SERVER + "history";
    }
    HistoryService.prototype.insertNewHistory = function (author, change) {
        var objHistory = new HistoryLog();
        objHistory.author = author;
        objHistory.changes = change;
        this.insert(objHistory).subscribe(function (results) { }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
        });
    };
    HistoryService.prototype.insert = function (obj) {
        return this.httpClient.post(this.historyUrl + "/insert", obj).pipe();
    };
    HistoryService.prototype.getHistory = function () {
        return this.httpClient.get(this.historyUrl + "/all").pipe();
    };
    HistoryService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], HistoryService);
    return HistoryService;
}());
export { HistoryService };
//# sourceMappingURL=history.service.js.map