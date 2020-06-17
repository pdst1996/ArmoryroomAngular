import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats';
import { GeneralResponse } from "../../models/login/login.model";

@Injectable({
    providedIn: "root"
})
export class FillMttoService {

    private questionsUrl = `${Constants.SERVER}questions`;
    private mtceUrl = `${Constants.SERVER}maintenance`;

    constructor(private httpClient : HttpClient) {
        
    }

    findQuestionsByTool(tool:string): Observable<GeneralResponse>{
        return this.httpClient.get<GeneralResponse>(`${this.questionsUrl}/getQuestionsForTool/${tool}`).pipe();
    }

    insertNewChecklist(obj:any): Observable<GeneralResponse>{
        return this.httpClient.post<GeneralResponse>(`${this.mtceUrl}/insert`,obj).pipe();
    }
    
}
  