import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Constants } from '../../helpers/constats'
import { CounterMask,PartNumber } from '../../models/countermask/countermask.model'

@Injectable({
  providedIn: "root"
})
export class CountermaskService {
 
  
  private partNumberUrl = `${Constants.SERVER}partnumbers`
  private counterMaskUrl = `${Constants.SERVER}tools`
  constructor(private httpClient : HttpClient) { }

  

  getPartNumbers(): Observable<PartNumber[]>{
    return this.httpClient.get<PartNumber[]>(`${this.partNumberUrl}/all`).pipe();
  }

  getCounterMask():Observable<CounterMask[]>{
    return this.httpClient.get<CounterMask[]>(`${this.counterMaskUrl}/all`).pipe();
  }
  
  

  
}
