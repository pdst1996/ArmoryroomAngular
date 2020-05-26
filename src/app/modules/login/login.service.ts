import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../../helpers/constats";
import { Observable } from "rxjs";
import { GeneralResponse } from "../../models/login/login.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  static ENDPOINT_GET_USER_INFO = Constants.SERVER + "Auth/User/";

  constructor(private http: HttpClient) {}

  getUserInfo(data: any): Observable<GeneralResponse> {
    return this.http
      .get<GeneralResponse>(LoginService.ENDPOINT_GET_USER_INFO, {
        params: data
      })
      .pipe();
  }
}
