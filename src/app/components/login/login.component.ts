import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, GoogleLoginProvider } from "angularx-social-login";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import { Constants } from "../../helpers/constats";
import {
  GeneralResponse,
  User,
  LoginResponse
} from "../../models/login/login.model";
import { LoginService } from "../../modules/login/login.service";
import { Notify } from "../../modules/notify/notify";

declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @ViewChild("LoadingModal", { static: true }) loading: ModalDirective;
  private generalresponse: GeneralResponse;
  private loginResponse: LoginResponse;
  private subscribeUser: Subscription;
  public user: User;
  public params: {
    user?: string;
    password?: string;
    application?: String;
    plant?: string;
  } = {
    application: Constants.application
  };
  private userParams: {
    user?: string;
    application?: String;
    plant?: string;
  } = {
    application: Constants.application
  };
  applicationconfig = {
    name: Constants.applicationName,
    application: Constants.applicationName,
    logo: Constants.logo,
    ico: Constants.ico,
    localStorage: Constants.localStorage
  };
  loadingMessage = "We are getting your information for Google please wait...";

  constructor(
    public loginService: LoginService,
    public router: Router,
    private socialAuthService: AuthService,
    private notify: Notify
  ) {}

  ngOnInit() {
    setTimeout(() => this.singinwhitgoogle(), 1000);
  }

  singin() {
    if (localStorage.getItem(Constants.plantLS)) {
      this.params.plant = localStorage.getItem(Constants.plantLS);
    }
    this.loading.show();
    this.subscribeUser = this.loginService.getUserInfo(this.params).subscribe(
      res => {
        this.generalresponse = res;
        this.loginResponse = this.generalresponse.data;
        this.loginResponse.loginType = "LDAP";
        this.user = this.loginResponse.userInfo;
      },
      error => {
        this.loading.hide();
        this.notify.setNotification("Error", "Ingrese un usuario", "error");
      },
      () => {
        if (this.generalresponse.message.includes("Welcome")) {
          localStorage.setItem(
            this.applicationconfig.localStorage,
            JSON.stringify(this.loginResponse)
          );
          localStorage.setItem("message", this.generalresponse.message);
          this.router.navigate(["/"]);
        } else {
          this.loading.hide();
          this.notify.setNotification(
            "No Autorizado",
            this.generalresponse.message,
            "notice"
          );
        }
      }
    );
  }
  singinwhitgoogle() {
    this.loading.show();
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      userData => {
        this.userParams = {
          user: userData.email,
          application: this.params.application
        };
        // Now sign-in with userData
        if (localStorage.getItem(Constants.plantLS)) {
          this.userParams.plant = localStorage.getItem(Constants.plantLS);
        }
        this.loading.show();
        this.subscribeUser = this.loginService
          .getUserInfo(this.userParams)
          .subscribe(
            res => {
              this.generalresponse = res;
              this.loginResponse = this.generalresponse.data;
              this.loginResponse.loginType = "Google";
              this.user = this.loginResponse.userInfo;
            },
            error => {
              this.loading.hide();
              this.notify.setNotification(
                "Error",
                "sesion no iniciada con google",
                "error"
              );
            },
            () => {
              if (this.generalresponse.message.includes("Welcome")) {
                localStorage.setItem(
                  this.applicationconfig.localStorage,
                  JSON.stringify(this.loginResponse)
                );
                localStorage.setItem("message", this.generalresponse.message);
                this.router.navigate(["/"]);
              } else {
                this.loading.hide();
                this.notify.setNotification(
                  "No Autorizado",
                  this.generalresponse.message,
                  "notice"
                );
              }
            }
          );
      },
      error => {}
    );
  }
  ngOnDestroy(): void {
    this.subscribeUser.unsubscribe();
  }
}
