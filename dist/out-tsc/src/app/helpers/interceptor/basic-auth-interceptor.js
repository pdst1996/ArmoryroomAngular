var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Constants } from "../constats";
var BasicAuthInterceptor = /** @class */ (function () {
    function BasicAuthInterceptor(router) {
        this.router = router;
    }
    BasicAuthInterceptor.prototype.handleAuthError = function (err) {
        if (err.status === 403 || err.status === 0) {
            localStorage.removeItem(Constants.localStorage);
            this.router.navigate(["/login"], {
                queryParams: { returnUrl: this.router.url }
            });
            return of(err.message);
        }
        throw err;
    };
    BasicAuthInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        this.loginResponse = JSON.parse(localStorage.getItem(Constants.localStorage));
        if (this.loginResponse && this.loginResponse.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.loginResponse.token,
                    "Content-Type": "application/json; charset=utf-8"
                }
            });
        }
        else {
            request = request.clone();
        }
        return next.handle(request).pipe(catchError(function (error, caught) {
            _this.handleAuthError(error);
            return of(error);
        }));
    };
    BasicAuthInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router])
    ], BasicAuthInterceptor);
    return BasicAuthInterceptor;
}());
export { BasicAuthInterceptor };
//# sourceMappingURL=basic-auth-interceptor.js.map