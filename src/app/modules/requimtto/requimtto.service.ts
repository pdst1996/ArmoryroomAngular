import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "../../models/login/login.model";


@Injectable({
  providedIn: "root"
})
export class RequimttoService { 
 
  private questionsUrl = `${Constants.SERVER}RequestMaintenance`;
 
  constructor(private httpClient : HttpClient) {
   
  }

  insertRequiMtto(obj:any) : Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.questionsUrl}/insert`, obj).pipe();
  }

}
