var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountermaskRoutingModule } from './countermask-routing.module';
import { CountermaskComponent } from '../../components/countermask/countermask.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
var CountermaskModule = /** @class */ (function () {
    function CountermaskModule() {
    }
    CountermaskModule = __decorate([
        NgModule({
            declarations: [CountermaskComponent],
            imports: [
                CommonModule,
                CountermaskRoutingModule,
                PopoverModule.forRoot(),
                ModalModule.forRoot(),
                FormsModule,
            ]
        })
    ], CountermaskModule);
    return CountermaskModule;
}());
export { CountermaskModule };
//# sourceMappingURL=countermask.module.js.map