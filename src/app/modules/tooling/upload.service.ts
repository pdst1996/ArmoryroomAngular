
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "src/app/helpers/constats";


@Injectable({
    providedIn: "root"
})

export class UploadService {

    private url = `${Constants.SERVER}upload/file/daniel.jpg`;

    constructor(private httpClient: HttpClient) { }

    public upload(formData) {
        console.log(formData)
        return this.httpClient.post<any>(this.url, formData, {  
          reportProgress: true,  
          observe: 'events'  
        });  
    }

}