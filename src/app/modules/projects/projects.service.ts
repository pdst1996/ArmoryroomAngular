import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats'

import { Project } from "src/app/models/project/project.model";



@Injectable({
  providedIn: "root"
})
export class ProjectsService {
 
    private projectUrl = `${Constants.SERVER}projects`;
    
    constructor(private httpClient : HttpClient) {
     
    }
  
    findAllProjects(): Observable<Project[]>{
      return this.httpClient.get<Project[]>(`${this.projectUrl}/all`).pipe();
    }

   
  
  }
  