import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
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



@NgModule({
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
export class AppModule {}
