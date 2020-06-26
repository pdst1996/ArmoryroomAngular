import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats'


import { Project } from "src/app/models/project/project.model";
import { Station } from "src/app/models/stations/stations.model";
import { GeneralResponse } from "src/app/models/login/login.model";



@Injectable({
  providedIn: "root"
})
export class StationsService {
 
    private projectUrl = `${Constants.SERVER}projects`;
    private stationsUrl = `${Constants.SERVER}stations`;
    private typeUrl = `${Constants.SERVER}types`;
    private intranetUrl = `${Constants.SERVER}Auth/EmployeeNumber`;
    
    constructor(private httpClient : HttpClient) {
     
    }
  
    findAllStations(): Observable<GeneralResponse>{
      return this.httpClient.get<GeneralResponse>(`${this.stationsUrl}/all`).pipe();
    }

    getStationById(id:number): Observable<GeneralResponse>{
      return this.httpClient.get<GeneralResponse>(`${this.stationsUrl}/getById/${id}`).pipe();
    }

    updateStation(obj: any): Observable<GeneralResponse>{
      return this.httpClient.post<GeneralResponse>(`${this.stationsUrl}/insert`, obj).pipe();
    }
    deleteStation(id: number): Observable<GeneralResponse>{
      return this.httpClient.delete<GeneralResponse>(`${this.stationsUrl}/delete/${id}`).pipe();
    }
  
  }
  