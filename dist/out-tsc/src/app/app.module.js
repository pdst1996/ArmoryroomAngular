var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { AppComponent } from "./app.component";
import { BasicAuthInterceptor } from "./helpers/interceptor/basic-auth-interceptor";
import { HomeAct } from "./homeact.service";
import { LoginAct } from "./loginact.service";
import { LoginService } from "./modules/login/login.service";
import { Notify } from "./modules/notify/notify";
import { AppRoutingModule } from "./routes.module";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsModule } from './modules/projects/projects.module';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent],
            imports: [
                BrowserModule,
                HttpClientModule,
                FormsModule,
                AppRoutingModule,
                PopoverModule.forRoot(),
                ModalModule.forRoot(),
                BrowserAnimationsModule,
                ReactiveFormsModule,
                ProjectsModule,
            ],
            providers: [
                LoginService,
                LoginAct,
                HomeAct,
                Notify,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BasicAuthInterceptor,
                    deps: [Router],
                    multi: true
                }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map