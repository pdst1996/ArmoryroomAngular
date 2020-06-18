var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from '../../components/questionnaire/questionnaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
var QuestionnaireModule = /** @class */ (function () {
    function QuestionnaireModule() {
    }
    QuestionnaireModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                QuestionnaireRoutingModule,
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
                QuestionnaireComponent
            ]
        })
    ], QuestionnaireModule);
    return QuestionnaireModule;
}());
export { QuestionnaireModule };
//# sourceMappingURL=questionnaire.module.js.map