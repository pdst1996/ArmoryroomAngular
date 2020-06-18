var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from "angularx-social-login";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { LoginComponent } from "../../components/login/login.component";
import { LoginRoutingModule } from "./login-routing";
import { LoginService } from "./login.service";
export function getAuthServiceConfigs() {
    var googleLoginOptions = {
        scope: "https://www.googleapis.com/auth/userinfo.email " +
            "https://www.googleapis.com/auth/userinfo.profile "
        // + "https://www.googleapis.com/auth/drive "
        // + "https://www.googleapis.com/auth/drive.readonly "
        // + "https://www.googleapis.com/auth/drive.file "
        // + "https://www.googleapis.com/auth/spreadsheets "
        // + "https://www.googleapis.com/auth/spreadsheets.readonly "
    };
    var config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("47775143219-jsvd9rl9va6c6ijadh0pgidkl8534etu.apps.googleusercontent.com", googleLoginOptions)
        }
    ]);
    return config;
}
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        NgModule({
            declarations: [LoginComponent],
            imports: [
                LoginRoutingModule,
                CommonModule,
                FormsModule,
                PopoverModule.forRoot(),
                ModalModule.forRoot(),
                SocialLoginModule
            ],
            providers: [
                LoginService,
                {
                    provide: AuthServiceConfig,
                    useFactory: getAuthServiceConfigs
                }
            ]
        })
    ], LoginModule);
    return LoginModule;
}());
export { LoginModule };
//# sourceMappingURL=login.module.js.map