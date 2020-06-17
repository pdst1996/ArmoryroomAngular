import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from '../../helpers/constats';
import { GeneralResponse } from "../../models/login/login.model";
import { Mail } from "../../models/mail/mail.model";

@Injectable({
    providedIn: "root"
})
export class ContactUsService {

    private mailUrl = `${Constants.SERVER}EmailService`;

    constructor(private httpClient : HttpClient) {
        
    }

    sendMail(from:string, to:string, subject:string, message:string, user:string) : Observable<GeneralResponse>{
        let date: Date = new Date();  
        let mail = new Mail();
        mail.from = from;
        mail.to = to;
        mail.subject = subject;
        mail.message = message +`\n\n\nUSER: ${user}\nDATE: ${date}`;
        console.log(mail)
        return this.httpClient.post<GeneralResponse>(`${this.mailUrl}/sendmail`,mail).pipe();
    }

    
}
  