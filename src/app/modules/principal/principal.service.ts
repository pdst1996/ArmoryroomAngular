import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../helpers/constats";
import { Observable } from "rxjs";
import { GeneralResponse, LoginResponse } from "../../models/login/login.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PrincipalService {
  static ENDPOINT_GET_TEST = Constants.SERVER + "Get/Test/";
  static ENDPOINT_POST_TEST = Constants.SERVER + "Post/Test/";
  private loginResponse: LoginResponse;

  constructor(private http: HttpClient) {
    this.loginResponse = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
  }

  getTest(data: any): Observable<GeneralResponse> {
    return this.http
      .get<GeneralResponse>(PrincipalService.ENDPOINT_GET_TEST, {
        params: data
      })
      .pipe();
  }

  postTest(data: any): Observable<GeneralResponse> {
    return this.http
      .post<GeneralResponse>(PrincipalService.ENDPOINT_POST_TEST, data)
      .pipe();
  }
}
