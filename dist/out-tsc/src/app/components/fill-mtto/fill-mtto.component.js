var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FillMttoService } from '../../modules/fill-mtto/fill-mtto.service';
import { Notify } from '../../modules/notify/notify';
import { MatTableDataSource } from '@angular/material';
import { Answer, MaintenanceInsert } from '../../models/questions/questions.model';
import { Constants } from 'src/app/helpers/constats';
var FillMttoComponent = /** @class */ (function () {
    function FillMttoComponent(element, modalService, fillmttoService, notify) {
        this.element = element;
        this.modalService = modalService;
        this.fillmttoService = fillmttoService;
        this.notify = notify;
        this.tooling = '';
        this.comments = '';
        this.displayedColumns = ['question', 'answer'];
        this.btnDisabled = false;
    }
    FillMttoComponent.prototype.ngOnInit = function () {
        this.element.nativeElement.querySelector("#txtTooling").focus();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    };
    FillMttoComponent.prototype.saveChecklist = function () {
        var _this = this;
        if (this.answers.length != this.resultsTable.length) {
            this.notify.setNotification("Error", "Tienes preguntas sin contestar", "error");
        }
        else {
            this.btnDisabled = true;
            this.notifyLoader = this.notify.setLoading("Enviando cuestionario", this.notifyLoader);
            var objMaintenance = new MaintenanceInsert();
            objMaintenance.tooling = this.tooling;
            objMaintenance.comments = this.comments;
            objMaintenance.answers = this.answers;
            objMaintenance.username = this.applicationData.userInfo.userName;
            this.fillmttoService.insertNewChecklist(objMaintenance).subscribe(function (results) {
                if (results.success) {
                    _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
                    _this.notify.setNotification("LISTO", "Se ha enviado tu cuestionario a revisión", "success");
                    _this.modalRef.hide();
                }
                else {
                    _this.notify.setNotification("Error", results.message, "error");
                    _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
                }
                _this.btnDisabled = false;
            });
        }
    };
    FillMttoComponent.prototype.focusButton = function () {
        this.element.nativeElement.querySelector("#btnSubmit").focus();
    };
    FillMttoComponent.prototype.changeAnswer = function (radio, question) {
        var isNew = true;
        var index = 0;
        for (var i = 0; i < this.answers.length; i++) {
            if (this.answers[i].pkQuestion == question.pkQuestion) {
                index = i;
                isNew = false;
            }
        }
        if (isNew) {
            this.answers.push(new Answer(question.pkQuestion, radio.value));
        }
        else {
            this.answers[index] = new Answer(question.pkQuestion, radio.value);
        }
    };
    FillMttoComponent.prototype.fillModalChecklist = function (template) {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Validando herramental", this.notifyLoader);
        this.fillmttoService.findQuestionsByTool(this.tooling).subscribe(function (results) {
            if (results.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
                _this.resultsTable = results.data;
                _this.dataSource = new MatTableDataSource(_this.resultsTable);
                _this.openModal(template);
                _this.answers = new Array();
            }
            else {
                _this.notify.setNotification("Error", results.message, "error");
                _this.notifyLoader = _this.notify.setLoadingError("Error", _this.notifyLoader);
            }
        });
    };
    FillMttoComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-lg');
    };
    FillMttoComponent = __decorate([
        Component({
            selector: 'app-fill-mtto',
            templateUrl: './fill-mtto.component.html',
            styleUrls: ['./fill-mtto.component.css']
        }),
        __metadata("design:paramtypes", [ElementRef,
            BsModalService,
            FillMttoService,
            Notify])
    ], FillMttoComponent);
    return FillMttoComponent;
}());
export { FillMttoComponent };
//# sourceMappingURL=fill-mtto.component.js.map