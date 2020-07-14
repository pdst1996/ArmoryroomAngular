import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/app/helpers/constats";
import { GeneralResponse } from "src/app/models/login/login.model";
import { Tooling } from "src/app/models/tooling/tooling.model";


@Injectable({
  providedIn: "root"
})
export class LiberatePalletService {
 
  private urlLiberate = `${Constants.SERVER}stations`;
  private urlToolings = `${Constants.SERVER}tools`;
 
  constructor(private httpClient : HttpClient) {
   
  }

  getPalletsBlocked(): Observable<Tooling[]>{
    return this.httpClient.get<Tooling[]>(`${this.urlToolings}/getToolingsBlocked`).pipe();
  }

  liberatePallet(idpallet:number): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.urlToolings}/changeBlocked/${idpallet}/false`,"").pipe();
  }
  
}
