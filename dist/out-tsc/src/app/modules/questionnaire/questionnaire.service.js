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
var QuestionnaireService = /** @class */ (function () {
    function QuestionnaireService(httpClient) {
        this.httpClient = httpClient;
        this.questionnairesUrl = Constants.SERVER + "maintenance";
        this.questionnairerDetailUrl = Constants.SERVER + "maintenanceDetail";
        this.signaturesUrl = Constants.SERVER + "signatures";
        this.typeUrl = Constants.SERVER + "types";
        this.url = "" + Constants.SERVER;
    }
    QuestionnaireService.prototype.findAllQuestionnaires = function () {
        return this.httpClient.get(this.questionnairesUrl + "/all").pipe();
    };
    QuestionnaireService.prototype.findQuestionsByMaintenance = function (id) {
        return this.httpClient.get(this.questionnairerDetailUrl + "/getMtceDetailById/" + id);
    };
    QuestionnaireService.prototype.findSignaturesByMaintenance = function (id) {
        return this.httpClient.get(this.signaturesUrl + "/getSignaturesByPkMaintenance/" + id);
    };
    QuestionnaireService.prototype.signMaintenance = function (obj) {
        return this.httpClient.post(this.signaturesUrl + "/insert", obj);
    };
    QuestionnaireService.prototype.findUserProfile = function (user) {
        return this.httpClient.get(this.url + "User/userInfo/" + user);
    };
    QuestionnaireService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], QuestionnaireService);
    return QuestionnaireService;
}());
export { QuestionnaireService };
//# sourceMappingURL=questionnaire.service.js.map