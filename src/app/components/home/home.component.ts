import { Component, OnInit, ViewChild } from "@angular/core";
import { PlatformLocation, Location } from "@angular/common";
import { Router } from "@angular/router";
import { User, ApplicationData, Menu } from "../../models/home/home.model";
import { Notify } from "../../modules/notify/notify";
import { ModalDirective } from "ngx-bootstrap/modal";
import { HomeService } from "../../modules/home/home.service";
import { Constants } from "../../helpers/constats";
import { Subscription } from "rxjs";
import { LoginService } from "../../modules/login/login.service";
import { GeneralResponse } from "src/app/models/login/login.model";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("modalCharg", { static: true }) charging: ModalDirective;
  public applicationconfig = {
    applicationVersion: "0.0.0.0",
    masterPageVersion: Constants.masterPageVersion,
    application: Constants.application,
    applicationName: Constants.applicationName,
    logo: Constants.logo,
    ico: Constants.ico,
    localStorage: Constants.localStorage
  };
  public subscriptions: Subscription[] = [];
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
  ) {  }

  ngOnInit() {
    if (this.applicationData == null) {
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
        case "/config/tooling": {
          this.currentRoute = "tooling";
          break;
        }
        case "/config/countermask": {
          this.currentRoute = "countermask";
          break;
        }
        case "/checklist/questions": {
          this.currentRoute = "questions";
          break;
        }
        case "/checklist/questionnaire": {
          this.currentRoute = "questionnaire";
          break;
        }
        case "/requimtto": {
          this.currentRoute = "requimtto";
          break;
        }
        case "/history": {
          this.currentRoute = "history";
          break;
        }
        case "/fill-mtto": {
          this.currentRoute = "fill mtto";
          break;
        }
        case "/contact-us": {
          this.currentRoute = "contact us";
          break;
        }
        case "/pallet-validator/scan-pallet": {
          this.currentRoute = "scan pallet";
          break;
        }
        case "/pallet-validator/liberate-pallet": {
          this.currentRoute = "liberate pallet";
          break;
        }
        case "/maintenance-requests": {
          this.currentRoute = "MAINTENANCE REQUESTS";
          break;
        }
      }
      this.currentYear = date.getFullYear();
      $(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
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
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass("show");

        $(this)
          .parents("li.nav-item.dropdown.show")
          .on("hidden.bs.dropdown", function (e) {
            $(".dropdown-submenu .show").removeClass("show");
          });

        return false;
      });
    } else {
      this.applicationData = null;
    }
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
      
      case "": {
        this.currentRoute = "home";
        break;
      }
      case "/config/tooling": {
        this.currentRoute = "tooling";
        break;
      }
      case "/config/countermask": {
        this.currentRoute = "countermask";
        break;
      }
      case "/checklist/questions": {
        this.currentRoute = "questions";
        break;
      }
      case "/checklist/questionnaire": {
        this.currentRoute = "questionnaire";
        break;
      }
      case "/requimtto": {
        this.currentRoute = "requimtto";
        break;
      }
      case "/history": {
        this.currentRoute = "history";
        break;
      }
      case "/fill-mtto": {
        this.currentRoute = "fill mtto";
        break;
      }
      case "/contact-us": {
        this.currentRoute = "contact us";
        break;
      }
      case "/pallet-validator/scan-pallet": {
        this.currentRoute = "scan pallet";
        break;
      }
      case "/pallet-validator/liberate-pallet": {
        this.currentRoute = "liberate pallet";
        break;
      }
      case "/maintenance-requests": {
        this.currentRoute = "MAINTENANCE REQUESTS";
        break;
      }
    }
  }

  back(): void {
    this.loc.back();
    setTimeout(() => {
      
      switch (this.router.url) {
        case "/": {
          this.currentRoute = "home";
          break;
        }
        case "/config/tooling": {
          this.currentRoute = "tooling";
          break;
        }
        case "/config/countermask": {
          this.currentRoute = "countermask";
          break;
        }
        case "/checklist/questions": {
          this.currentRoute = "questions";
          break;
        }
        case "/checklist/questionnaire": {
          this.currentRoute = "questionnaire";
          break;
        }
        case "/requimtto": {
          this.currentRoute = "requimtto";
          break;
        }
        case "/history": {
          this.currentRoute = "history";
          break;
        }
        case "/fill-mtto": {
          this.currentRoute = "fill mtto";
          break;
        }
        case "/contact-us": {
          this.currentRoute = "contact us";
          break;
        }
        case "/pallet-validator/scan-pallet": {
          this.currentRoute = "scan pallet";
          break;
        }
        case "/pallet-validator/liberate-pallet": {
          this.currentRoute = "liberate pallet";
          break;
        }
        case "/maintenance-requests": {
          this.currentRoute = "MAINTENANCE REQUESTS";
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
