import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Type } from '../../models/type/type.model'
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "../../models/login/login.model";
import { Maintenance2 } from "src/app/models/questionnaire/questionnaire.model";


@Injectable({
  providedIn: "root"
})
export class QuestionnaireService {
 
  private questionnairesUrl = `${Constants.SERVER}maintenance`;
  private questionnairerDetailUrl = `${Constants.SERVER}maintenanceDetail`;
  private signaturesUrl = `${Constants.SERVER}signatures`;
  private typeUrl = `${Constants.SERVER}types`;
  private url = `${Constants.SERVER}`;
 
  constructor(private httpClient : HttpClient) {
   
  }
  
  findAllQuestionnaires() : Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.questionnairesUrl}/all`).pipe();
  }

  findQuestionsByMaintenance(id:string) : Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.questionnairerDetailUrl}/getMtceDetailById/${id}`);
  }

  findSignaturesByMaintenance(id:string) : Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.signaturesUrl}/getSignaturesByPkMaintenance/${id}`);
  }

  signMaintenance(obj:Maintenance2) : Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.signaturesUrl}/insert`,obj);
  }

  findUserProfile(user:string) : Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.url}User/userInfo/${user}`);
  }

  validateUserLDAP(user:string, pwd:string) : Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.url}User/validateUserLDAP/${user}/${pwd}`);
  }

  
}
