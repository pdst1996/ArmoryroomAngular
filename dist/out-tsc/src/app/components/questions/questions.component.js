var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { QuestionsService } from 'src/app/modules/questions/questions.service';
import { Type } from '../../models/type/type.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Question } from 'src/app/models/questions/questions.model';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
import { BsModalService } from 'ngx-bootstrap/modal';
var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent(questionsService, element, notify, historyService, modalService) {
        this.questionsService = questionsService;
        this.element = element;
        this.notify = notify;
        this.historyService = historyService;
        this.modalService = modalService;
        this.displayedColumns = ['question', 'answer', 'action'];
        this.typeSelected = 0;
        this.dataSource = new MatTableDataSource(this.questionsArray);
        this.thereQuestions = false;
        this.questionsFilled = false;
        this.questionNew = "";
        this.answerSelected = "Yes";
    }
    QuestionsComponent.prototype.ngOnInit = function () {
        this.getAllTypes();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    };
    QuestionsComponent.prototype.saveNewQuestion = function () {
        var _this = this;
        var newObjQuestion = new Question();
        newObjQuestion.question = "¿" + this.questionNew + "?";
        newObjQuestion.correctAnswer = this.answerSelected;
        newObjQuestion.fkType = new Type(this.typeSelected, "");
        newObjQuestion.status = true;
        this.notifyLoader = this.notify.setLoading("Insertando", this.notifyLoader);
        this.questionsService.insertQuestion(newObjQuestion).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Insertado", _this.notifyLoader);
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Se inserto la pregunta " + _this.questionNew);
                _this.questionNew = "";
                _this.getAllQuestions("reload");
            }
            else {
                _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
                _this.notify.setNotification("Error", results.message, "error");
            }
        });
    };
    QuestionsComponent.prototype.changeAnswer = function (radio) {
        this.answerSelected = radio.value;
    };
    QuestionsComponent.prototype.openModalAddQuestions = function (template) {
        this.answerSelected = "Yes";
        this.openModal(template);
    };
    QuestionsComponent.prototype.editQuestion = function (pkQuestion) {
        this.element.nativeElement.querySelector("#inputQuestion_" + pkQuestion).setAttribute('style', 'display:block;');
        this.element.nativeElement.querySelector("#spQuestion_" + pkQuestion).setAttribute('style', 'display:none;');
        this.element.nativeElement.querySelector("#inputQuestion_" + pkQuestion).focus();
    };
    QuestionsComponent.prototype.saveQuestionChanges = function (objQuestion) {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Actualizando pregunta", this.notifyLoader);
        var txtQuestion = this.element.nativeElement.querySelector("#txtQuestion_" + objQuestion.pkQuestion).value;
        objQuestion.question = txtQuestion;
        this.questionsService.updateQuestion(objQuestion).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
                _this.element.nativeElement.querySelector("#spQuestion_" + objQuestion.pkQuestion).setAttribute('innerHTML', txtQuestion);
                _this.closeInputFieldEdit("" + objQuestion.pkQuestion);
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Se cambio el nombre de la pregunta " + objQuestion.pkQuestion);
            }
            else {
                _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
                _this.notify.setNotification("ERROR", results.message, "error");
            }
        });
    };
    QuestionsComponent.prototype.saveAnswerChanges = function (objQuestion, mrChange) {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Actualizando pregunta", this.notifyLoader);
        objQuestion.correctAnswer = mrChange.value;
        this.questionsService.updateQuestion(objQuestion).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Se cambio la respuesta de la pregunta " + objQuestion.pkQuestion + " a " + objQuestion.correctAnswer);
            }
            else {
                _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
                _this.notify.setNotification("ERROR", results.message, "error");
            }
        });
    };
    QuestionsComponent.prototype.saveStatusChanges = function (objQuestion, mrChange) {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Actualizando pregunta", this.notifyLoader);
        objQuestion.status = mrChange.checked;
        this.questionsService.updateQuestion(objQuestion).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
                _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Se cambio el status de la pregunta " + objQuestion.pkQuestion + " a " + objQuestion.status);
            }
            else {
                _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
                _this.notify.setNotification("ERROR", results.message, "error");
            }
        });
    };
    QuestionsComponent.prototype.closeInputFieldEdit = function (pkQuestion) {
        this.element.nativeElement.querySelector("#inputQuestion_" + pkQuestion).setAttribute('style', 'display:none;');
        this.element.nativeElement.querySelector("#spQuestion_" + pkQuestion).setAttribute('style', 'display:block;');
    };
    QuestionsComponent.prototype.getAllQuestions = function (action) {
        var _this = this;
        if (action == "load")
            this.notifyLoader = this.notify.setLoading("Cargando preguntas", this.notifyLoader);
        this.questionsService.findAllQuestions().subscribe(function (results) {
            var questions = new Array();
            questions = results.data;
            _this.questionsArray = new Array();
            for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
                var element = questions_1[_i];
                if (element.fkType.pktype == _this.typeSelected) {
                    _this.questionsArray.push(element);
                }
            }
            if (_this.questionsArray.length != 0)
                _this.thereQuestions = true;
            else
                _this.thereQuestions = false;
            _this.questionsFilled = true;
            _this.dataSource = new MatTableDataSource(_this.questionsArray);
            _this.dataSource.paginator = _this.paginator;
            if (action == "load")
                _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
        });
    };
    QuestionsComponent.prototype.getAllTypes = function () {
        var _this = this;
        this.questionsService.findAllTypes().subscribe(function (results) { _this.types = results; });
    };
    QuestionsComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-md');
    };
    QuestionsComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], QuestionsComponent.prototype, "paginator", void 0);
    QuestionsComponent = __decorate([
        Component({
            selector: 'app-questions',
            templateUrl: './questions.component.html',
            styleUrls: ['./questions.component.css']
        }),
        __metadata("design:paramtypes", [QuestionsService,
            ElementRef,
            Notify,
            HistoryService,
            BsModalService])
    ], QuestionsComponent);
    return QuestionsComponent;
}());
export { QuestionsComponent };
//# sourceMappingURL=questions.component.js.map