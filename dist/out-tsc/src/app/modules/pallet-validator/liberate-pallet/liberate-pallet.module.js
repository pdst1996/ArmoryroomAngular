var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiberatePalletRoutingModule } from './liberate-pallet-routing.module';
import { LiberatePalletComponent } from '../../../components/pallet-validator/liberate-pallet/liberate-pallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
var LiberatePalletModule = /** @class */ (function () {
    function LiberatePalletModule() {
    }
    LiberatePalletModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                LiberatePalletRoutingModule,
                FormsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatCheckboxModule,
                MatTableModule,
                MatPaginatorModule,
                MatFormFieldModule,
                MatInputModule,
                MatRadioModule,
                MatIconModule,
                MatButtonModule
            ],
            declarations: [
                LiberatePalletComponent
            ]
        })
    ], LiberatePalletModule);
    return LiberatePalletModule;
}());
export { LiberatePalletModule };
//# sourceMappingURL=liberate-pallet.module.js.map