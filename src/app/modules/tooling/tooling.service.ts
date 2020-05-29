import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project, PartNumber, Type } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'


@Injectable({
  providedIn: "root"
})
export class ToolingService {
 
  private projectUrl = `${Constants.SERVER}projects`;
  private partNumberUrl = `${Constants.SERVER}partnumbers`;
  private typeUrl = `${Constants.SERVER}types`;
  
  constructor(private httpClient : HttpClient) { }

  findAllProjects(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.projectUrl}/all`).pipe();
  }

  getPartNumbersByProject(id:number): Observable<PartNumber[]>{
    return this.httpClient.get<PartNumber[]>(`${this.partNumberUrl}/byProject/${id}`).pipe();
  }
  
  findAllTypes(): Observable<Type[]>{
    return this.httpClient.get<Type[]>(`${this.typeUrl}/all`).pipe();
  }

  
}
