import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GeneralResponse } from "src/app/models/login/login.model";
import { Constants } from "src/app/helpers/constats";


@Injectable({
  providedIn: "root"
})
export class ScanPalletService {

  urlStations = `${Constants.SERVER}stations`;
  urlValidator = `${Constants.SERVER}palletValidatorActions`;
  urlTool = `${Constants.SERVER}tools`;
 
  constructor(private httpClient : HttpClient) {
   
  }

  findStations(): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.urlStations}/all`).pipe();
  }

  getSerialValidation(serialNumber:string, station:number): Observable<GeneralResponse>{
    console.log(`${this.urlValidator}/validateStation?serialNumber=${serialNumber}&station=${station}`)
    return this.httpClient.get<GeneralResponse>(`${this.urlValidator}/validateStation?serialNumber=${serialNumber}&station=${station}`).pipe();
  }

  getToolValidation(tool:string, type:string, station:string): Observable<GeneralResponse>{
    console.log(`${this.urlTool}/validateTooling/${tool}/${type}/${station}`)
    return this.httpClient.get<GeneralResponse>(`${this.urlTool}/validateTooling/${tool}/${type}/${station}`).pipe();
  }

  getCMNumber(station:number): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.urlStations}/getById/${station}`).pipe();
  }

  cazar(obj:any): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.urlValidator}/mPassSerial`,obj).pipe();
  }
  
  
}
