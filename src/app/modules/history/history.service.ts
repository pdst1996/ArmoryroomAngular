import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats';
import { GeneralResponse } from "../../models/login/login.model";
import { HistoryLog } from "src/app/models/history/history.model";

@Injectable({
    providedIn: "root"
})
export class HistoryService {

    private historyUrl = `${Constants.SERVER}history`;

    constructor(private httpClient : HttpClient) {
        
    }

    insertNewHistory(author:string, change:string){
        let objHistory = new HistoryLog();
        objHistory.author = author;
        objHistory.changes = change;
        this.insert(objHistory).subscribe(
            results =>{  },
            (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            } else {
                console.log("Server-side error");
            }
            }
        );
    }

    insert(obj: any):Observable<GeneralResponse>{
       return this.httpClient.post<GeneralResponse>(`${this.historyUrl}/insert`, obj).pipe();
    }

    getHistory():Observable<HistoryLog[]>{
        return this.httpClient.get<HistoryLog[]>(`${this.historyUrl}/all`).pipe();
     }
}
  