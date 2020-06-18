var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolingRoutingModule } from './tooling-routing.module';
import { ToolingComponent } from '../../components/tooling/tooling.component';
import { AddNewToolingComponent } from '../../components/tooling/add-new-tooling/add-new-tooling.component';
import { ShowToolingsComponent } from '../../components/tooling/show-toolings/show-toolings.component';
import { MaintanceRequestsComponent } from '../../components/tooling/maintance-requests/maintance-requests.component';
import { InOutToolingsComponent } from '../../components/tooling/in-out-toolings/in-out-toolings.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSelectModule } from '@angular/material/select';
var ToolingModule = /** @class */ (function () {
    function ToolingModule() {
    }
    ToolingModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ToolingRoutingModule,
                PopoverModule.forRoot(),
                ModalModule.forRoot(),
                FormsModule,
                MatTabsModule,
                MatIconModule,
                MatTableModule,
                MatPaginatorModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                MatCheckboxModule,
                ButtonsModule,
                TooltipModule.forRoot(),
                MatSelectModule
            ],
            declarations: [
                ToolingComponent,
                AddNewToolingComponent,
                ShowToolingsComponent,
                MaintanceRequestsComponent,
                InOutToolingsComponent
            ]
        })
    ], ToolingModule);
    return ToolingModule;
}());
export { ToolingModule };
//# sourceMappingURL=tooling.module.js.map