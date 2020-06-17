import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tooling, Status, ToolingValidation } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "src/app/models/login/login.model";
import { PartNumber } from "src/app/models/part-number/part-number.model";
import { Project } from "src/app/models/project/project.model";
import { RequestMaintance } from "src/app/models/request-maintance/request-maintance.model";
import { Type } from "src/app/models/type/type.model";


@Injectable({
  providedIn: "root"
})
export class ToolingService {
 
  private projectUrl = `${Constants.SERVER}projects`;
  private partNumberUrl = `${Constants.SERVER}partnumbers`;
  private typeUrl = `${Constants.SERVER}types`;
  private toolingUrl = `${Constants.SERVER}tools`;
  private statusUrl = `${Constants.SERVER}status`;
  private rmUrl = `${Constants.SERVER}RequestMaintenance`;
  private intranetUrl = `${Constants.SERVER}Auth/EmployeeNumber`;
  
  constructor(private httpClient : HttpClient) {
   
  }

  findAllProjects(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.projectUrl}/all`).pipe();
  }

  getPartNumbersByProject(id:number): Observable<PartNumber[]>{
    return this.httpClient.get<PartNumber[]>(`${this.partNumberUrl}/byProject/${id}`).pipe();
  }

  saveNewTooling(obj: any): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.toolingUrl}/insert`, obj).pipe();
  }

  updateTooling(obj: any, idTooling : number): Observable<GeneralResponse>{
    return this.httpClient.put<GeneralResponse>(`${this.toolingUrl}/update/${idTooling}`, obj).pipe();
  }

  getAllToolings(): Observable<Tooling[]>{
    return this.httpClient.get<Tooling[]>(`${this.toolingUrl}/all`).pipe();
  }

  getToolingsValidation(data:string): Observable<ToolingValidation[]>{
    return this.httpClient.post<ToolingValidation[]>(`${this.toolingUrl}/getToolStatus`,data);
  }

  inOutToolings(data:string, pkNewStatus:number): Observable<ToolingValidation[]>{
    console.log(data+":"+pkNewStatus)
    return this.httpClient.post<ToolingValidation[]>(`${this.toolingUrl}/changeStatusTools/${pkNewStatus}`,data);
  }

  getToolingById(id:number): Observable<Tooling>{
    return this.httpClient.get<Tooling>(`${this.toolingUrl}/getToolById/${id}`).pipe();
  }
  
  findAllTypes(): Observable<Type[]>{
    return this.httpClient.get<Type[]>(`${this.typeUrl}/all`).pipe();
  }

  findAllStatus(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(`${this.statusUrl}/all`).pipe();
  }
  
  findAllRequestMaintance(): Observable<RequestMaintance[]>{
    return this.httpClient.get<RequestMaintance[]>(`${this.rmUrl}/all`).pipe();
  }

  aproveRejectRequestMaintance(action : boolean, idRequestMaintance : number, userAprove : string): Observable<GeneralResponse>{
    return this.httpClient.put<GeneralResponse>(`${this.rmUrl}/updateAproved/${idRequestMaintance}/${action}/${userAprove}`,null).pipe();
  }

  getEmployeeValidation(employee:string): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.intranetUrl}/${employee}`).pipe();
  }
}
