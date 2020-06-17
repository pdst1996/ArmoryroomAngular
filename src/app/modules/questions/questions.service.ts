import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Type } from '../../models/type/type.model'
import { Constants } from '../../helpers/constats'
import { GeneralResponse } from "../../models/login/login.model";
import { Question } from "src/app/models/questions/questions.model";


@Injectable({
  providedIn: "root"
})
export class QuestionsService {
 
  private questionsUrl = `${Constants.SERVER}questions`;
  private typeUrl = `${Constants.SERVER}types`;
 
  constructor(private httpClient : HttpClient) {
   
  }

  findAllTypes() : Observable<Type[]>{
    return this.httpClient.get<Type[]>(`${this.typeUrl}/all`).pipe();
  }

  findAllQuestions() : Observable<GeneralResponse>{
    return this.httpClient.get<GeneralResponse>(`${this.questionsUrl}/all`).pipe();
  }

  updateQuestion(obj:Question) : Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.questionsUrl}/insert`,obj).pipe();
  }

  insertQuestion(obj:Question) : Observable<GeneralResponse>{
    return this.httpClient.post<GeneralResponse>(`${this.questionsUrl}/insert`,obj).pipe();
  }
  
}
