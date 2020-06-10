import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/modules/questions/questions.service';
import { Type } from '../../models/type/type.model'
import { MatPaginator, MatTableDataSource, MatRadioChange, MatRadioButton, MatCheckboxChange } from '@angular/material';
import { Question } from 'src/app/models/questions/questions.model';
import { element } from 'protractor';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryLog } from 'src/app/models/history/history.model';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['question','answer','action'];
  typeSelected = 0;
  types : Type[];
  questionsArray : Question[];
  dataSource =  new MatTableDataSource <Question>(this.questionsArray);
  notifyLoader : any;
  thereQuestions = false;
  questionsFilled = false;
  applicationData :ApplicationData;

  constructor(private questionsService: QuestionsService, private element: ElementRef, private  notify: Notify, private historyService: HistoryService) { }

  ngOnInit() {
    this.getAllTypes();
    this.applicationData = JSON.parse( localStorage.getItem(Constants.localStorage) );
  }

  editQuestion(pkQuestion:string){
    this.element.nativeElement.querySelector("#inputQuestion_"+pkQuestion).setAttribute('style','display:block;');
    this.element.nativeElement.querySelector("#spQuestion_"+pkQuestion).setAttribute('style','display:none;');
    this.element.nativeElement.querySelector("#inputQuestion_"+pkQuestion).focus();
  }

  saveQuestionChanges(objQuestion: Question){
    this.notifyLoader = this.notify.setLoading("Actualizando pregunta",this.notifyLoader);
    let txtQuestion = this.element.nativeElement.querySelector("#txtQuestion_"+objQuestion.pkQuestion).value;
    objQuestion.question = txtQuestion;
    this.questionsService.updateQuestion(objQuestion).subscribe( results =>{
      if(results.success){
        this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
        this.element.nativeElement.querySelector("#spQuestion_"+objQuestion.pkQuestion).setAttribute('innerHTML',txtQuestion);
        this.closeInputFieldEdit(""+objQuestion.pkQuestion);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,"Se cambio el nombre de la pregunta "+objQuestion.pkQuestion);
      }else{
        this.notifyLoader = this.notify.setLoadingError("Error",this.notifyLoader);
        this.notify.setNotification("ERROR",results.message,"error");
      }
    });
  }

  saveAnswerChanges(objQuestion: Question, mrChange: MatRadioChange){

    this.notifyLoader = this.notify.setLoading("Actualizando pregunta",this.notifyLoader);
    objQuestion.correctAnswer = mrChange.value;
    this.questionsService.updateQuestion(objQuestion).subscribe( results =>{
      if(results.success){
        this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,`Se cambio la respuesta de la pregunta ${objQuestion.pkQuestion} a ${objQuestion.correctAnswer}`);
      }else{
        this.notifyLoader = this.notify.setLoadingError("Error",this.notifyLoader);
        this.notify.setNotification("ERROR",results.message,"error");
      }
    });
  }

  saveStatusChanges(objQuestion: Question, mrChange: MatCheckboxChange){

    this.notifyLoader = this.notify.setLoading("Actualizando pregunta",this.notifyLoader);
    objQuestion.status = mrChange.checked;
    this.questionsService.updateQuestion(objQuestion).subscribe( results =>{
      if(results.success){
        this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,`Se cambio el status de la pregunta ${objQuestion.pkQuestion} a ${objQuestion.status}`);
      }else{
        this.notifyLoader = this.notify.setLoadingError("Error",this.notifyLoader);
        this.notify.setNotification("ERROR",results.message,"error");
      }
    });
  }

  closeInputFieldEdit(pkQuestion:string){
    this.element.nativeElement.querySelector("#inputQuestion_"+pkQuestion).setAttribute('style','display:none;');
    this.element.nativeElement.querySelector("#spQuestion_"+pkQuestion).setAttribute('style','display:block;');
  }

  getAllQuestions(){
    this.notifyLoader = this.notify.setLoading("Cargando preguntas",this.notifyLoader);
    this.questionsService.findAllQuestions().subscribe(results =>{
      let questions = new Array<Question>();
      questions=results.data;
      this.questionsArray = new Array<Question>();
      for (const element of questions) {
        if(element.fkType.pktype == this.typeSelected){
          this.questionsArray.push(element);
        }
      }
      if(this.questionsArray.length != 0)
        this.thereQuestions = true;
      else
        this.thereQuestions = false;
      this.questionsFilled = true;
    
      this.dataSource = new MatTableDataSource <Question>(this.questionsArray);
      this.dataSource.paginator = this.paginator;
      let newRowObject = this.element.nativeElement.querySelector("#trAdditional");
      this.dataSource.data.unshift(newRowObject);
      this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
    });
  }

  getAllTypes(){
    this.questionsService.findAllTypes().subscribe( results =>{ this.types = results; } );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
