var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeRoutingModule } from './home-routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { ArraySortPipe } from 'src/app/helpers/pipes/orderMenu';
import { FilterMenuPipe } from 'src/app/helpers/pipes/filterMenu';
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        NgModule({
            declarations: [
                HomeComponent,
                ArraySortPipe,
                FilterMenuPipe
            ],
            imports: [
                CommonModule,
                PopoverModule.forRoot(),
                ModalModule.forRoot(),
                HomeRoutingModule,
                FormsModule
            ],
            providers: [
                HomeService
            ],
        })
    ], HomeModule);
    return HomeModule;
}());
export { HomeModule };
//# sourceMappingURL=home.module.js.map