import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  LoginOpt,
  SocialLoginModule
} from "angularx-social-login";
import { ModalModule } from "ngx-bootstrap/modal";
import { PopoverModule } from "ngx-bootstrap/popover";
import { LoginComponent } from "../../components/login/login.component";
import { LoginRoutingModule } from "./login-routing";
import { LoginService } from "./login.service";

export function getAuthServiceConfigs() {
  const googleLoginOptions: LoginOpt = {
    scope:
      "https://www.googleapis.com/auth/userinfo.email " +
      "https://www.googleapis.com/auth/userinfo.profile "
    // + "https://www.googleapis.com/auth/drive "
    // + "https://www.googleapis.com/auth/drive.readonly "
    // + "https://www.googleapis.com/auth/drive.file "
    // + "https://www.googleapis.com/auth/spreadsheets "
    // + "https://www.googleapis.com/auth/spreadsheets.readonly "
  };

  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "47775143219-jsvd9rl9va6c6ijadh0pgidkl8534etu.apps.googleusercontent.com",
        googleLoginOptions
      )
    }
  ]);
  return config;
}

@NgModule({
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
export class LoginModule {}
