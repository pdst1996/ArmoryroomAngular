import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tooling, Status, ToolingValidation } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "../../models/login/login.model";
import { RequestMaintance } from "../../models/request-maintance/request-maintance.model";



@Injectable({
  providedIn: "root"
})
export class MaintenanceRequestsService {
 
  private toolingUrl = `${Constants.SERVER}tools`;

  private rmUrl = `${Constants.SERVER}RequestMaintenance`;
  private intranetUrl = `${Constants.SERVER}Auth/EmployeeNumber`;

  
  constructor(private httpClient : HttpClient) {
   
  }

  getToolingsValidation(data:string): Observable<ToolingValidation[]>{
    return this.httpClient.post<ToolingValidation[]>(`${this.toolingUrl}/getToolStatus`,data);
  }

  getToolingById(id:number): Observable<Tooling>{
    return this.httpClient.get<Tooling>(`${this.toolingUrl}/getToolById/${id}`).pipe();
  }
  
  findAllRequestMaintance(): Observable<RequestMaintance[]>{
    return this.httpClient.get<RequestMaintance[]>(`${this.rmUrl}/all`).pipe();
  }

  aproveRejectRequestMaintance(action : boolean, idRequestMaintance : number, userAprove : string, comment:string): Observable<GeneralResponse>{
    return this.httpClient.put<GeneralResponse>(`${this.rmUrl}/updateAproved/${idRequestMaintance}/${action}/${userAprove}/${comment}`,null).pipe();
  }

  getEmployeeValidation(employee:string): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.intranetUrl}/${employee}`).pipe();
  }

}
