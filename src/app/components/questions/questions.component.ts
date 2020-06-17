import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { QuestionsService } from 'src/app/modules/questions/questions.service';
import { Type } from '../../models/type/type.model'
import { MatPaginator, MatTableDataSource, MatRadioChange, MatRadioButton, MatCheckboxChange, MatRadioGroup } from '@angular/material';
import { Question } from 'src/app/models/questions/questions.model';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  modalRef : BsModalRef;
  questionNew = "";
  answerSelected = "Yes";

  constructor(private questionsService: QuestionsService, 
    private element: ElementRef, 
    private  notify: Notify, 
    private historyService: HistoryService,
    private modalService : BsModalService) { }

  ngOnInit() {
    this.getAllTypes();
    this.applicationData = JSON.parse( localStorage.getItem(Constants.localStorage) );
  }

  saveNewQuestion(){
    let newObjQuestion = new Question();
    newObjQuestion.question = "¿"+this.questionNew+"?";
    newObjQuestion.correctAnswer = this.answerSelected;
    newObjQuestion.fkType = new Type(this.typeSelected,"");
    newObjQuestion.status = true;
    this.notifyLoader = this.notify.setLoading("Insertando",this.notifyLoader);
    this.questionsService.insertQuestion(newObjQuestion).subscribe(
      results =>{
        if(results.success){
          this.notifyLoader = this.notify.setLoadingDone("Insertado",this.notifyLoader);
          this.historyService.insertNewHistory(this.applicationData.userInfo.userName,"Se inserto la pregunta "+this.questionNew);
          this.questionNew = "";
          this.getAllQuestions("reload");
        }else{
          this.notifyLoader = this.notify.setLoadingError("Error",this.notifyLoader);
          this.notify.setNotification("Error",results.message,"error");
        }
      }
    );
  }

  changeAnswer(radio:MatRadioChange){
    this.answerSelected = radio.value;
  }

  openModalAddQuestions(template:any){
    this.answerSelected = "Yes";
    this.openModal(template);
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

  getAllQuestions(action:string){
    if(action=="load")
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
      
      if(action=="load")
        this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
    });
  }

  getAllTypes(){
    this.questionsService.findAllTypes().subscribe( results =>{ this.types = results; } );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-md');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
