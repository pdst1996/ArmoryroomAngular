import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "src/app/models/login/login.model";
import { Constants } from "../../helpers/constats";
import { GeneralApplicationData } from "src/app/models/home/home.model";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  static ENDPOINT_REFRESH_DATA_AND_MENUS =
    Constants.SERVER + "Refresh/DataAndMenus/";
  private loginResponse: LoginResponse;
  constructor(private http: HttpClient) {
    this.loginResponse = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
  }

  RefreshApplicationData(data: any): Observable<GeneralApplicationData> {
    return this.http
      .get<GeneralApplicationData>(
        HomeService.ENDPOINT_REFRESH_DATA_AND_MENUS,
        {
          params: data
        }
      )
      .pipe();
  }
}
