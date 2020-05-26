import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginResponse } from "src/app/models/login/login.model";
import { Constants } from "../constats";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  private loginResponse: LoginResponse;
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 403 || err.status === 0) {
      localStorage.removeItem(Constants.localStorage);
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: this.router.url }
      });
      return of(err.message);
    }
    throw err;
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loginResponse = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    if (this.loginResponse && this.loginResponse.token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.loginResponse.token,
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    } else {
      request = request.clone();
    }
    return next.handle(request).pipe(catchError((error, caught) => {
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }
}
