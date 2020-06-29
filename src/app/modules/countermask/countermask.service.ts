import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Constants } from '../../helpers/constats'
import { CounterMask,PartNumber } from '../../models/countermask/countermask.model'
import { GeneralResponse } from "src/app/models/login/login.model";

@Injectable({
  providedIn: "root"
})
export class CountermaskService {
 
  
  private partNumberUrl = `${Constants.SERVER}partnumbers`
  private counterMaskUrl = `${Constants.SERVER}tools`
  private groupsUrl = `${Constants.SERVER}groups`
  constructor(private httpClient : HttpClient) { }

  //Armoryroom/groups/findByPartNumber/4

  getPartNumbers(): Observable<PartNumber[]>{
    return this.httpClient.get<PartNumber[]>(`${this.partNumberUrl}/all`).pipe();
  }

  getCounterMask():Observable<CounterMask[]>{
    return this.httpClient.get<CounterMask[]>(`${this.counterMaskUrl}/all`).pipe();
  }
  
  findCounterMaskByPartNumber(id:number): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.groupsUrl}/findByPartNumber/${id}`).pipe();
  }
  findPartNumberByCounterMask(id:number): Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.groupsUrl}/findByTooling/${id}`).pipe();
  }
  insertCounterMaskToPartNumber(id:number, values:string): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.groupsUrl}/insertByPartNumber/${id}`,values).pipe();
  }
  insertPartNumbersToCounterMask(id:number, values:string): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.groupsUrl}/insertByTooling/${id}`,values).pipe();
  }
  deleteCounterMasksFromPartNumber(id:number, values:string[]): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.groupsUrl}/deleteGroupsByPartNumbers/${id}`,values).pipe();
  }
  
  deletePartNumbersFromCounterMask(id:number, values:string[]): Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.groupsUrl}/deleteGroupsByTooling/${id}`,values).pipe();
  }
}
