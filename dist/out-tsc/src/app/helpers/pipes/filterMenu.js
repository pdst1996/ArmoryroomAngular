var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from "@angular/core";
var FilterMenuPipe = /** @class */ (function () {
    function FilterMenuPipe() {
    }
    FilterMenuPipe.prototype.transform = function (array, field) {
        return array.filter(function (item) {
            var idFatherMenu = 0;
            if (item.idFatherMenu != null) {
                idFatherMenu = item.idFatherMenu;
            }
            if (field !== 0 && item.idFatherMenu !== 0) {
                if (item.idFatherMenu === field) {
                    idFatherMenu = item.idFatherMenu;
                }
            }
            return idFatherMenu === field;
        });
    };
    FilterMenuPipe = __decorate([
        Pipe({
            name: "filterMenu",
            pure: false
        })
    ], FilterMenuPipe);
    return FilterMenuPipe;
}());
export { FilterMenuPipe };
//# sourceMappingURL=filterMenu.js.map