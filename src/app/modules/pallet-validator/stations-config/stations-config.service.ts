import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class StationsConfigService {
 

 
  constructor(private httpClient : HttpClient) {
   
  }
  
}
