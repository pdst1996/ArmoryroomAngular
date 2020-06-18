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
import { ModalDirective } from "ngx-bootstrap/modal";
import { PrincipalService } from "src/app/modules/principal/principal.service";
var PrincipalComponent = /** @class */ (function () {
    function PrincipalComponent(principalService) {
        this.principalService = principalService;
        this.RevList = [];
        this.subscriptions = [];
    }
    PrincipalComponent.prototype.ngOnInit = function () {
        for (var i = 0; i < 10; i++) {
            this.RevList.push(i);
        }
        var getTestSub = this.principalService
            .getTest({ test: "test_get" })
            .subscribe(function (res) {
            console.log(res);
        }, function (error) {
            console.log(error);
        }, function () {
            console.log("Get Ok");
        });
        var postTestSub = this.principalService
            .postTest({ test: "test_post" })
            .subscribe(function (res) {
            console.log(res);
        }, function (error) {
            console.log(error);
        }, function () {
            console.log("Post Ok");
        });
        this.subscriptions.push(getTestSub);
        this.subscriptions.push(postTestSub);
    };
    PrincipalComponent.prototype.eventHandler = function (event) {
        if (event.keyCode === 13) {
        }
    };
    PrincipalComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        ViewChild("modalCharg", { static: true }),
        __metadata("design:type", ModalDirective)
    ], PrincipalComponent.prototype, "charging", void 0);
    __decorate([
        ViewChild("modalConfirm", { static: true }),
        __metadata("design:type", ModalDirective)
    ], PrincipalComponent.prototype, "confirm", void 0);
    PrincipalComponent = __decorate([
        Component({
            selector: "app-principal",
            templateUrl: "./principal.component.html",
            styleUrls: ["./principal.component.scss"]
        }),
        __metadata("design:paramtypes", [PrincipalService])
    ], PrincipalComponent);
    return PrincipalComponent;
}());
export { PrincipalComponent };
//# sourceMappingURL=principal.component.js.map