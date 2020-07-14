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
import { PlatformLocation, Location } from "@angular/common";
import { Router } from "@angular/router";
import { Notify } from "../../modules/notify/notify";
import { ModalDirective } from "ngx-bootstrap/modal";
import { HomeService } from "../../modules/home/home.service";
import { Constants } from "../../helpers/constats";
import { LoginService } from "../../modules/login/login.service";
var HomeComponent = /** @class */ (function () {
    function HomeComponent(location, router, loc, homeService, notify, loginService) {
        this.location = location;
        this.router = router;
        this.loc = loc;
        this.homeService = homeService;
        this.notify = notify;
        this.loginService = loginService;
        this.applicationconfig = {
            applicationVersion: "0.0.0.0",
            masterPageVersion: Constants.masterPageVersion,
            application: Constants.application,
            applicationName: Constants.applicationName,
            logo: Constants.logo,
            ico: Constants.ico,
            localStorage: Constants.localStorage
        };
        this.subscriptions = [];
        this.params = {
            application: Constants.application
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.applicationData == null) {
            var message_1 = localStorage.getItem("message");
            var date = new Date();
            this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
            this.user = this.applicationData.userInfo;
            this.plants = this.applicationData.sites;
            if (this.applicationData.applicationVersion) {
                this.applicationconfig.applicationVersion = this.applicationData.applicationVersion;
            }
            if (!localStorage.getItem(Constants.plantLS)) {
                this.currentPlant = this.plants[0].name;
                localStorage.setItem(Constants.plantLS, this.currentPlant);
            }
            else {
                this.currentPlant = localStorage.getItem(Constants.plantLS);
            }
            var refreshApplicationData = this.homeService
                .RefreshApplicationData({
                application: this.applicationconfig.application,
                plant: this.currentPlant
            })
                .subscribe(function (res) {
                _this.applicationDataRefreshed = res.data;
            }, function (error) {
                console.log(error);
            }, function () {
                _this.applicationData.sites = _this.applicationDataRefreshed.sites;
                _this.applicationData.menus = _this.applicationDataRefreshed.menus;
                _this.applicationData.profiles = _this.applicationDataRefreshed.profiles;
                _this.applicationData.applicationVersion = _this.applicationDataRefreshed.applicationVersion;
                localStorage.setItem(Constants.localStorage, JSON.stringify(_this.applicationData));
                _this.user = _this.applicationData.userInfo;
                _this.plants = _this.applicationData.sites;
                _this.applicationconfig.applicationVersion = _this.applicationData.applicationVersion;
                _this.charging.hide();
                _this.notify.setNotification("Login Success", message_1, "success");
            });
            this.subscriptions.push(refreshApplicationData);
            switch (this.router.url) {
                case "/": {
                    this.currentRoute = "home";
                    break;
                }
                case "/config/tooling": {
                    this.currentRoute = "tooling";
                    break;
                }
                case "/config/countermask": {
                    this.currentRoute = "countermask";
                    break;
                }
                case "/checklist/questions": {
                    this.currentRoute = "questions";
                    break;
                }
                case "/checklist/questionnaire": {
                    this.currentRoute = "questionnaire";
                    break;
                }
                case "/requimtto": {
                    this.currentRoute = "requimtto";
                    break;
                }
                case "/history": {
                    this.currentRoute = "history";
                    break;
                }
                case "/fill-mtto": {
                    this.currentRoute = "fill mtto";
                    break;
                }
                case "/contact-us": {
                    this.currentRoute = "contact us";
                    break;
                }
                case "/tutorials": {
                    this.currentRoute = "tutorials";
                    break;
                }
                case "/pallet-validator/scan-pallet": {
                    this.currentRoute = "scan pallet";
                    break;
                }
                case "/pallet-validator/liberate-pallet": {
                    this.currentRoute = "liberate pallet";
                    break;
                }
            }
            this.currentYear = date.getFullYear();
            $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
                if (!$(this)
                    .next()
                    .hasClass("show")) {
                    $(this)
                        .parents(".dropdown-menu")
                        .first()
                        .find(".show")
                        .removeClass("show");
                }
                var $subMenu = $(this).next(".dropdown-menu");
                $subMenu.toggleClass("show");
                $(this)
                    .parents("li.nav-item.dropdown.show")
                    .on("hidden.bs.dropdown", function (e) {
                    $(".dropdown-submenu .show").removeClass("show");
                });
                return false;
            });
        }
        else {
            this.applicationData = null;
        }
    };
    HomeComponent.prototype.changeCurrentPlant = function (plant) {
        this.currentPlant = plant;
        localStorage.setItem(Constants.plantLS, this.currentPlant);
        location.href = Constants.SERVER;
    };
    HomeComponent.prototype.logout = function () {
        if (confirm("If you logout, you will logout from all google services of your browser. Are you sure?")) {
            localStorage.removeItem(Constants.localStorage);
            location.href = "https://accounts.google.com/Logout";
        }
    };
    HomeComponent.prototype.changeRoute = function (currentRoute) {
        switch (currentRoute) {
            case "": {
                this.currentRoute = "home";
                break;
            }
            case "/config/tooling": {
                this.currentRoute = "tooling";
                break;
            }
            case "/config/countermask": {
                this.currentRoute = "countermask";
                break;
            }
            case "/checklist/questions": {
                this.currentRoute = "questions";
                break;
            }
            case "/checklist/questionnaire": {
                this.currentRoute = "questionnaire";
                break;
            }
            case "/requimtto": {
                this.currentRoute = "requimtto";
                break;
            }
            case "/history": {
                this.currentRoute = "history";
                break;
            }
            case "/fill-mtto": {
                this.currentRoute = "fill mtto";
                break;
            }
            case "/contact-us": {
                this.currentRoute = "contact us";
                break;
            }
            case "/pallet-validator/scan-pallet": {
                this.currentRoute = "scan pallet";
                break;
            }
            case "/pallet-validator/liberate-pallet": {
                this.currentRoute = "liberate pallet";
                break;
            }
        }
    };
    HomeComponent.prototype.back = function () {
        var _this = this;
        this.loc.back();
        setTimeout(function () {
            switch (_this.router.url) {
                case "/": {
                    _this.currentRoute = "home";
                    break;
                }
                case "/config/tooling": {
                    _this.currentRoute = "tooling";
                    break;
                }
                case "/config/countermask": {
                    _this.currentRoute = "countermask";
                    break;
                }
                case "/checklist/questions": {
                    _this.currentRoute = "questions";
                    break;
                }
                case "/checklist/questionnaire": {
                    _this.currentRoute = "questionnaire";
                    break;
                }
                case "/requimtto": {
                    _this.currentRoute = "requimtto";
                    break;
                }
                case "/history": {
                    _this.currentRoute = "history";
                    break;
                }
                case "/fill-mtto": {
                    _this.currentRoute = "fill mtto";
                    break;
                }
                case "/contact-us": {
                    _this.currentRoute = "contact us";
                    break;
                }
                case "/pallet-validator/scan-pallet": {
                    _this.currentRoute = "scan pallet";
                    break;
                }
                case "/pallet-validator/liberate-pallet": {
                    _this.currentRoute = "liberate pallet";
                    break;
                }
            }
        }, 100);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        ViewChild("modalCharg", { static: true }),
        __metadata("design:type", ModalDirective)
    ], HomeComponent.prototype, "charging", void 0);
    HomeComponent = __decorate([
        Component({
            selector: "app-home",
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.scss"]
        }),
        __metadata("design:paramtypes", [PlatformLocation,
            Router,
            Location,
            HomeService,
            Notify,
            LoginService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map