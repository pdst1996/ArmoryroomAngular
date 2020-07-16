
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})

export class UploadService {

    constructor(private httpClient: HttpClient) { }

    public upload(formData) {
        return this.httpClient.post<any>("", formData, {  
          reportProgress: true,  
          observe: 'events'  
        });  
    }

}