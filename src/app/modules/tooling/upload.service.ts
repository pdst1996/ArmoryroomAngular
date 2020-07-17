
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "src/app/helpers/constats";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class UploadService {

    private url = `${Constants.SERVER}upload/file/daniel.jpg`;

    constructor(private httpClient: HttpClient) { }

    public upload(formData:any) : Observable<any>{
      console.log(formData)
        return this.httpClient.post<any>(this.url, formData).pipe();
    }

}