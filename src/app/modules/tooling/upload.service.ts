
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "src/app/helpers/constats";
import { Observable } from "rxjs";
import { GeneralResponse } from "src/app/models/login/login.model";


@Injectable({
    providedIn: "root"
})

export class UploadService {

    private url = `${Constants.SERVER}ScrapEvidence/`;

    constructor(private httpClient: HttpClient) { }

    public upload(formData:any, filename:string, idtool:number) : Observable<GeneralResponse>{
        return this.httpClient.post<GeneralResponse>(`${this.url}uploadfile/${filename}/${idtool}`, formData).pipe();
    }

    public uploadWF(comments:string, idtool:number) : Observable<GeneralResponse>{
        return this.httpClient.post<GeneralResponse>(`${this.url}whitoutfile/${comments}/${idtool}`, null).pipe();
    }

}