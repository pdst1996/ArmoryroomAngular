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
import PNotify from "pnotify/dist/es/PNotifyCompat";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
var Notify = /** @class */ (function () {
    function Notify() {
        PNotifyButtons;
        PNotify.defaults.styling = "bootstrap4";
        PNotify.defaults.icons = "fontawesome5";
    }
    Notify.prototype.setNotification = function (title, text, type) {
        return new PNotify({
            title: title,
            text: text,
            type: type,
            delay: "3000"
        });
    };
    Notify.prototype.setConfirm = function (title, text, type, icon) {
        return PNotify.notice({
            title: title,
            text: text,
            icon: icon,
            hide: false,
            stack: {
                dir1: "down",
                modal: true,
                firstpos1: 25
            },
            modules: {
                Confirm: {
                    confirm: true
                },
                Buttons: {
                    closer: false,
                    sticker: false
                },
                History: {
                    history: false
                }
            }
        });
    };
    Notify.prototype.setLoading = function (text, oldLoader) {
        if (oldLoader != null)
            oldLoader.close();
        var loader = PNotify.alert({
            text: ' ' + text,
            icon: 'fas fa-spinner fa-pulse',
            type: 'info',
            delay: 10000,
            title: false,
            shadow: false,
            sticker: false,
            stack: {
                dir1: 'down',
                firstpos1: 25,
                modal: false,
                maxOpen: Infinity
            }
        });
        return loader;
    };
    Notify.prototype.setLoadingChangeText = function (text, loader) {
        loader.update({
            text: " " + text
        });
        return loader;
    };
    Notify.prototype.setLoadingDone = function (text, loader) {
        loader.update({
            text: " " + text,
            icon: 'fas fa-check',
            type: 'success',
            hide: true,
        });
        setTimeout(function () {
            loader.close();
        }, 400);
        return loader;
    };
    Notify.prototype.setLoadingError = function (text, loader) {
        loader.update({
            text: " " + text,
            icon: 'fas fa-times',
            type: 'error',
            hide: true,
        });
        setTimeout(function () {
            loader.close();
        }, 900);
        return loader;
    };
    Notify = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [])
    ], Notify);
    return Notify;
}());
export { Notify };
//# sourceMappingURL=notify.js.map