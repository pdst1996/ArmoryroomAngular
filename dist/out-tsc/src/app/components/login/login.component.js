var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Constants } from "../../helpers/constats";
import { LoginService } from "../../modules/login/login.service";
import { Notify } from "../../modules/notify/notify";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(loginService, router, socialAuthService, notify) {
        this.loginService = loginService;
        this.router = router;
        this.socialAuthService = socialAuthService;
        this.notify = notify;
        this.params = {
            application: Constants.application
        };
        this.userParams = {
            application: Constants.application
        };
        this.applicationconfig = {
            name: Constants.applicationName,
            application: Constants.applicationName,
            logo: Constants.logo,
            ico: Constants.ico,
            localStorage: Constants.localStorage
        };
        this.loadingMessage = "We are getting your information for Google please wait...";
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.singinwhitgoogle(); }, 1000);
    };
    LoginComponent.prototype.singin = function () {
        var _this = this;
        if (localStorage.getItem(Constants.plantLS)) {
            this.params.plant = localStorage.getItem(Constants.plantLS);
        }
        this.loading.show();
        this.subscribeUser = this.loginService.getUserInfo(this.params).subscribe(function (res) {
            _this.generalresponse = res;
            _this.loginResponse = _this.generalresponse.data;
            _this.loginResponse.loginType = "LDAP";
            _this.user = _this.loginResponse.userInfo;
        }, function (error) {
            _this.loading.hide();
            _this.notify.setNotification("Error", "Ingrese un usuario", "error");
        }, function () {
            if (_this.generalresponse.message.includes("Welcome")) {
                localStorage.setItem(_this.applicationconfig.localStorage, JSON.stringify(_this.loginResponse));
                localStorage.setItem("message", _this.generalresponse.message);
                _this.router.navigate(["/"]);
            }
            else {
                _this.loading.hide();
                _this.notify.setNotification("No Autorizado", _this.generalresponse.message, "notice");
            }
        });
    };
    LoginComponent.prototype.singinwhitgoogle = function () {
        var _this = this;
        this.loading.show();
        var socialPlatformProvider;
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            _this.userParams = {
                user: userData.email,
                application: _this.params.application
            };
            // Now sign-in with userData
            if (localStorage.getItem(Constants.plantLS)) {
                _this.userParams.plant = localStorage.getItem(Constants.plantLS);
            }
            _this.loading.show();
            _this.subscribeUser = _this.loginService
                .getUserInfo(_this.userParams)
                .subscribe(function (res) {
                _this.generalresponse = res;
                _this.loginResponse = _this.generalresponse.data;
                _this.loginResponse.loginType = "Google";
                _this.user = _this.loginResponse.userInfo;
            }, function (error) {
                _this.loading.hide();
                _this.notify.setNotification("Error", "sesion no iniciada con google", "error");
            }, function () {
                if (_this.generalresponse.message.includes("Welcome")) {
                    localStorage.setItem(_this.applicationconfig.localStorage, JSON.stringify(_this.loginResponse));
                    localStorage.setItem("message", _this.generalresponse.message);
                    _this.router.navigate(["/"]);
                }
                else {
                    _this.loading.hide();
                    _this.notify.setNotification("No Autorizado", _this.generalresponse.message, "notice");
                }
            });
        }, function (error) { });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.subscribeUser.unsubscribe();
    };
    __decorate([
        ViewChild("LoadingModal", { static: true }),
        __metadata("design:type", ModalDirective)
    ], LoginComponent.prototype, "loading", void 0);
    LoginComponent = __decorate([
        Component({
            selector: "app-login",
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.scss"]
        }),
        __metadata("design:paramtypes", [LoginService,
            Router,
            AuthService,
            Notify])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map