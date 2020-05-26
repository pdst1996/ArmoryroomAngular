import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from '../../models/tooling/tooling.model'

@Injectable({
  providedIn: "root"
})
export class ToolingService {
 
  private projectUrl = 'http://143.116.205.46:8080/ArmoryRoom_Back/projects'
  constructor(private httpClient : HttpClient) { }

  findAllProjects(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.projectUrl}/all`);
  }

  
}
