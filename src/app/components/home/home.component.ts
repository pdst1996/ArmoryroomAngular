import { Location, PlatformLocation } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Subscription } from "rxjs";
import {
  GeneralResponse,
  LoginResponse
} from "src/app/models/login/login.model";
import { Constants } from "../../helpers/constats";
import { ApplicationData, User } from "../../models/home/home.model";
import { HomeService } from "../../modules/home/home.service";
import { LoginService } from "../../modules/login/login.service";
import { Notify } from "../../modules/notify/notify";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("modalCharg", { static: true }) charging: ModalDirective;
  public applicationconfig = {
    applicationVersion: "1.0.0.0",
    masterPageVersion: Constants.masterPageVersion,
    application: Constants.application,
    applicationName: Constants.applicationName,
    logo: Constants.logo,
    ico: Constants.ico,
    localStorage: Constants.localStorage
  };
  private subscriptions: Array<Subscription>;
  private generalresponse: GeneralResponse;
  private loginResponse: LoginResponse;
  public user: User;
  public applicationData: ApplicationData;
  public applicationDataRefreshed: ApplicationData;
  public currentYear;
  public currentRoute;
  public currentPlant;
  public plants;
  public params: {
    user?: string;
    password?: string;
    application?: String;
    plant?: string;
  } = {
    application: Constants.application
  };

  constructor(
    public location: PlatformLocation,
    public router: Router,
    public loc: Location,
    public homeService: HomeService,
    public notify: Notify,
    public loginService: LoginService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    const message = localStorage.getItem("message");
    const date = new Date();
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    this.user = this.applicationData.userInfo;
    this.plants = this.applicationData.sites;
    if (this.applicationData.applicationVersion) {
      this.applicationconfig.applicationVersion = this.applicationData.applicationVersion;
    }
    if (!localStorage.getItem(Constants.plantLS)) {
      this.currentPlant = this.plants[0].name;
      localStorage.setItem(Constants.plantLS, this.currentPlant);
    } else {
      this.currentPlant = localStorage.getItem(Constants.plantLS);
    }
    const refreshApplicationData: Subscription = this.homeService
      .RefreshApplicationData({
        application: this.applicationconfig.application,
        plant: this.currentPlant
      })
      .subscribe(
        res => {
          this.applicationDataRefreshed = res.data;
        },
        error => {
          console.log(error);
        },
        () => {
          this.applicationData.sites = this.applicationDataRefreshed.sites;
          this.applicationData.menus = this.applicationDataRefreshed.menus;
          this.applicationData.profiles = this.applicationDataRefreshed.profiles;
          this.applicationData.applicationVersion = this.applicationDataRefreshed.applicationVersion;
          localStorage.setItem(
            Constants.localStorage,
            JSON.stringify(this.applicationData)
          );
          this.user = this.applicationData.userInfo;
          this.plants = this.applicationData.sites;
          this.applicationconfig.applicationVersion = this.applicationData.applicationVersion;
          this.charging.hide();
          this.notify.setNotification("Login Success", message, "success");
        }
      );
    this.subscriptions.push(refreshApplicationData);
    switch (this.router.url) {
      case "/": {
        this.currentRoute = "home";
        break;
      }
      case "/Prueba1link": {
        this.currentRoute = "prueba1";
        break;
      }
    }
    this.currentYear = date.getFullYear();

    $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
      if (
        !$(this)
          .next()
          .hasClass("show")
      ) {
        $(this)
          .parents(".dropdown-menu")
          .first()
          .find(".show")
          .removeClass("show");
      }
      const subMenu = $(this).next(".dropdown-menu");
      subMenu.toggleClass("show");

      $(this)
        .parents("li.nav-item.dropdown.show")
        .on("hidden.bs.dropdown", function() {
          $(".dropdown-submenu .show").removeClass("show");
        });

      return false;
    });
  }

  changeCurrentPlant(plant) {
    this.currentPlant = plant;
    localStorage.setItem(Constants.plantLS, this.currentPlant);
    location.href = Constants.SERVER;
  }

  logout() {
    if (
      confirm(
        "If you logout, you will logout from all google services of your browser. Are you sure?"
      )
    ) {
      localStorage.removeItem(Constants.localStorage);
      location.href = "https://accounts.google.com/Logout";
    }
  }
  changeRoute(currentRoute: string): void {
    switch (currentRoute) {
      case "Home": {
        this.currentRoute = "home";
        break;
      }
      case "/Prueba1link": {
        this.currentRoute = "prueba1";
        break;
      }
    }
  }

  back(): void {
    this.loc.back();
    setTimeout(() => {
      switch (this.router.url) {
        case "/": {
          this.currentRoute = "Home";
          break;
        }
        case "/Prueba1link": {
          this.currentRoute = "Prueba1";
          break;
        }
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
