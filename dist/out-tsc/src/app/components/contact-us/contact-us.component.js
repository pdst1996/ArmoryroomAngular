var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Constants } from 'src/app/helpers/constats';
import { ContactUsService } from 'src/app/modules/contact-us/contact-us.service';
import { Notify } from 'src/app/modules/notify/notify';
var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent(mailService, notify) {
        this.mailService = mailService;
        this.notify = notify;
    }
    ContactUsComponent.prototype.ngOnInit = function () {
        this.mailTo = Constants.mail;
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
        this.mailFromText = this.applicationData.userInfo.mail;
        this.mailFrom = Constants.application + "@sanmina.com";
        this.mailSubject = '';
        this.mailMessage = '';
        this.innerButton = '<span class=\"content\"><i class=\"far fa-paper-plane\"></i>&nbsp;&nbsp;Enviar</span>';
    };
    ContactUsComponent.prototype.sendMail = function () {
        var _this = this;
        this.innerButton = '<span class=\"content\"><i class=\"fas fa-spinner fa-pulse\"></i></span>';
        this.mailService.sendMail(this.mailFrom, this.mailTo, this.mailSubject, this.mailMessage, this.applicationData.userInfo.userName).subscribe(function (results) {
            setTimeout(function () {
                _this.innerButton = '<span class=\"content\"><i class=\"far fa-paper-plane\"></i>&nbsp;&nbsp;Enviar</span>';
            }, 500);
            _this.notify.setNotification("Listo", "Se envió el correo con éxito", "success");
            _this.mailSubject = "";
            _this.mailMessage = "";
        });
    };
    ContactUsComponent = __decorate([
        Component({
            selector: 'app-contact-us',
            templateUrl: './contact-us.component.html',
            styleUrls: ['./contact-us.component.css']
        }),
        __metadata("design:paramtypes", [ContactUsService, Notify])
    ], ContactUsComponent);
    return ContactUsComponent;
}());
export { ContactUsComponent };
//# sourceMappingURL=contact-us.component.js.map