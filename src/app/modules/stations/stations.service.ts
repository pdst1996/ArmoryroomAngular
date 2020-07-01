import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "src/app/models/login/login.model";



@Injectable({
  providedIn: "root"
})
export class StationsService {
    private stationsUrl = `${Constants.SERVER}stations`;
  
    
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
  