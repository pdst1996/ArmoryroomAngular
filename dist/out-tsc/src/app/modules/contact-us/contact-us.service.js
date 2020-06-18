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
import { Mail } from "../../models/mail/mail.model";
var ContactUsService = /** @class */ (function () {
    function ContactUsService(httpClient) {
        this.httpClient = httpClient;
        this.mailUrl = Constants.SERVER + "EmailService";
    }
    ContactUsService.prototype.sendMail = function (from, to, subject, message, user) {
        var date = new Date();
        var mail = new Mail();
        mail.from = from;
        mail.to = to;
        mail.subject = subject;
        mail.message = message + ("\n\n\nUSER: " + user + "\nDATE: " + date);
        console.log(mail);
        return this.httpClient.post(this.mailUrl + "/sendmail", mail).pipe();
    };
    ContactUsService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ContactUsService);
    return ContactUsService;
}());
export { ContactUsService };
//# sourceMappingURL=contact-us.service.js.map