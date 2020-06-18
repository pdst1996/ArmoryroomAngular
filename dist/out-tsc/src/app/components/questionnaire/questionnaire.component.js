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
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Maintenance, Maintenance2 } from '../../models/questionnaire/questionnaire.model';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';
import { Constants } from 'src/app/helpers/constats';
import { BsModalService } from 'ngx-bootstrap/modal';
import { QuestionnaireService } from 'src/app/modules/questionnaire/questionnaire.service';
var QuestionnaireComponent = /** @class */ (function () {
    function QuestionnaireComponent(questionnaireService, element, notify, historyService, modalService, serviceHistory) {
        this.questionnaireService = questionnaireService;
        this.element = element;
        this.notify = notify;
        this.historyService = historyService;
        this.modalService = modalService;
        this.serviceHistory = serviceHistory;
        this.displayedColumns = ['question', 'tooling', 'answer', 'action', 'comments', 'status'];
        this.displayedColumnsQuestions = ['question', 'answer', 'correct'];
        this.averageMaintenanceClass = '';
        this.userMaintenance = '';
        this.idMaintenance = '';
        this.dateMaintenance = '';
        this.processSignDone = false;
        this.processSignPermission = false;
        this.processSignRejected = false;
        this.qualitySignDone = false;
        this.qualitySignPermission = false;
        this.qualitySignRejected = false;
        this.imgSrc = '';
        this.valueSign = '';
        this.departmentSign = '';
    }
    QuestionnaireComponent.prototype.ngOnInit = function () {
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
        this.getAllQuestionnaires();
        if (this.applicationData != null) {
            this.profiles = this.applicationData.profiles;
        }
        for (var _i = 0, _a = this.applicationData.profiles; _i < _a.length; _i++) {
            var profile = _a[_i];
            if (profile.idProfile == 42) {
                this.processSignPermission = true;
            }
            if (profile.idProfile == 43) {
                this.qualitySignPermission = true;
            }
        }
    };
    QuestionnaireComponent.prototype.getAllQuestionnaires = function () {
        var _this = this;
        this.notifyLoader = this.notify.setLoading("Cargando cuestionarios", this.notifyLoader);
        this.questionnaireService.findAllQuestionnaires().subscribe(function (results) {
            _this.questionnaires = results.data;
            _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
            _this.dataSource = new MatTableDataSource(_this.questionnaires);
            _this.dataSource.paginator = _this.paginator;
        });
    };
    QuestionnaireComponent.prototype.openModalQuestionnaire = function (template, objMaintenance) {
        var _this = this;
        this.currentMaintenance = objMaintenance;
        this.openModal(template);
        this.dateMaintenance = objMaintenance.dateMtce.replace('T', ' ').substring(0, 16);
        this.userMaintenance = objMaintenance.userName;
        this.idMaintenance = objMaintenance.pkMaintenance + "";
        this.averageMaintenanceClass = "c100 p45";
        this.processSignDone = false;
        this.processSignRejected = false;
        this.qualitySignDone = false;
        this.qualitySignRejected = false;
        this.processSignPermission = false;
        this.qualitySignPermission = false;
        this.notifyLoader = this.notify.setLoading("Cargando datos", this.notifyLoader);
        this.questionnaireService.findQuestionsByMaintenance('' + objMaintenance.pkMaintenance).subscribe(function (results) {
            _this.dataSourceQuestions = new MatTableDataSource(results.data);
            var array = new Array();
            array = results.data;
            var average = 0, total = 0;
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var iterator = array_1[_i];
                if (iterator.answer.toUpperCase() == iterator.correctAnswer.toUpperCase())
                    total += 100;
            }
            if (total != 0)
                average = total / (array.length * 100);
            _this.averageMaintenanceClass = "c100 p" + (Number(_this.dosDecimales(average)) * 100);
        });
        this.loadSignsOfMaintenance();
        this.imgSrc = "http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee=" + objMaintenance.userName;
    };
    QuestionnaireComponent.prototype.loadSignsOfMaintenance = function () {
        var _this = this;
        this.questionnaireService.findSignaturesByMaintenance(this.currentMaintenance.pkMaintenance + "").subscribe(function (resultsSignatures) {
            console.log(resultsSignatures);
            var array = new Array();
            array = resultsSignatures.data;
            for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
                var iterator = array_2[_i];
                if (iterator.department.toLowerCase() == "procesos" && iterator.approved) {
                    _this.processSignDone = true;
                    _this.processSigner = iterator.username;
                }
                else if (iterator.department.toLowerCase() == "procesos" && !iterator.approved)
                    _this.processSignRejected = true;
                if (iterator.department.toLowerCase() == "calidad" && iterator.approved) {
                    _this.qualitySignDone = true;
                    _this.qualitySigner = iterator.username;
                }
                else if (iterator.department.toLowerCase() == "calidad" && !iterator.approved)
                    _this.qualitySignRejected = true;
            }
            for (var _a = 0, _b = _this.applicationData.profiles; _a < _b.length; _a++) {
                var profile = _b[_a];
                if (profile.idProfile == 42) {
                    _this.processSignPermission = true;
                }
                if (profile.idProfile == 43) {
                    _this.qualitySignPermission = true;
                }
            }
            _this.notifyLoader = _this.notify.setLoadingDone("Listo", _this.notifyLoader);
        });
    };
    QuestionnaireComponent.prototype.signMaintenance = function (department, action, template2) {
        this.openModalConfirm(template2);
        this.valueSign = (action) ? 'aprobar' : 'denegar';
        this.actionSign = action;
        this.departmentSign = department;
    };
    QuestionnaireComponent.prototype.addSignMaintenance = function () {
        var _this = this;
        var objSign = new Maintenance2();
        objSign.approved = this.actionSign;
        objSign.department = this.departmentSign;
        objSign.username = this.applicationData.userInfo.userName;
        objSign.fkMaintenance = new Maintenance(Number(this.currentMaintenance.pkMaintenance));
        objSign.comments = "xd";
        objSign.dateSign = "";
        this.notifyLoader = this.notify.setLoading("Firmando mantenimiento", this.notifyLoader);
        this.questionnaireService.signMaintenance(objSign).subscribe(function (resultsSignatures) {
            if (resultsSignatures.success) {
                _this.notifyLoader = _this.notify.setLoadingDone("Firmada", _this.notifyLoader);
                _this.loadSignsOfMaintenance();
                _this.modalRef2.hide();
                _this.serviceHistory.insertNewHistory(_this.applicationData.userInfo.userName, "Se " + ((_this.valueSign) ? 'aprobó' : 'denegó') + " el mantenimiento " + _this.currentMaintenance.pkMaintenance + " por el dep. de " + _this.departmentSign);
            }
            else {
                _this.notifyLoader = _this.notify.setLoadingError("Ocurrio un error", _this.notifyLoader);
                _this.notify.setNotification("Error", resultsSignatures.message, "error");
            }
        });
    };
    QuestionnaireComponent.prototype.dosDecimales = function (n) {
        var t = n.toString();
        var regex = /(\d*.\d{0,1})/;
        return t.match(regex)[0];
    };
    QuestionnaireComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-lg');
    };
    QuestionnaireComponent.prototype.openModalConfirm = function (template) {
        this.modalRef2 = this.modalService.show(template);
        this.modalRef2.setClass('modal-md');
    };
    QuestionnaireComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], QuestionnaireComponent.prototype, "paginator", void 0);
    QuestionnaireComponent = __decorate([
        Component({
            selector: 'app-questionnaire',
            templateUrl: './questionnaire.component.html',
            styleUrls: ['./questionnaire.component.scss']
        }),
        __metadata("design:paramtypes", [QuestionnaireService,
            ElementRef,
            Notify,
            HistoryService,
            BsModalService,
            HistoryService])
    ], QuestionnaireComponent);
    return QuestionnaireComponent;
}());
export { QuestionnaireComponent };
//# sourceMappingURL=questionnaire.component.js.map