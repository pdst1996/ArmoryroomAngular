import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'

@Injectable({
  providedIn: "root"
})
export class ToolingService {
 
  private projectUrl = `${Constants.SERVER}projects`
  
  constructor(private httpClient : HttpClient) { }

  findAllProjects(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.projectUrl}/all`).pipe();
  }

  

  
}
