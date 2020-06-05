import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project, PartNumber, Type, objTooling, Tooling, Status, RequestMaintance } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "src/app/models/login/login.model";


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
}
