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
 
  constructor(private httpClient : HttpClient) {
   
  }

  findStations(): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.urlStations}/all`).pipe();
  }

  getPalletValidation(serialNumber:string, station:number): Observable<GeneralResponse>{
    console.log(`${this.urlValidator}/validateStation?serialNumber=${serialNumber}&station=${station}`)
    return this.httpClient.get<GeneralResponse>(`${this.urlValidator}/validateStation?serialNumber=${serialNumber}&station=${station}`).pipe();
  }
  
}
