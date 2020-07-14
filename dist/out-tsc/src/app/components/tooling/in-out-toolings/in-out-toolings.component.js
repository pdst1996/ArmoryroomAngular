var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Constants } from 'src/app/helpers/constats';
var ValidationResults = /** @class */ (function () {
    function ValidationResults(serial, message) {
        this.serial = serial;
        this.message = message;
    }
    return ValidationResults;
}());
export { ValidationResults };
var IOTool = /** @class */ (function () {
    function IOTool() {
    }
    IOTool = __decorate([
        Component({
            selector: 'app-in-out-toolings',
            templateUrl: './in-out-toolings.component.html',
            styleUrls: ['./in-out-toolings.component.css']
        })
    ], IOTool);
    return IOTool;
}());
export { IOTool };
var InOutToolingsComponent = /** @class */ (function () {
    function InOutToolingsComponent(notify, element, toolingService, historyService) {
        this.notify = notify;
        this.element = element;
        this.toolingService = toolingService;
        this.historyService = historyService;
        this.radioModel = 'in';
        this.btnSaveEnabled = false;
        this.spCountSerials = 0;
        this.tableErrorsHidden = true;
        this.statusAvailablesToIn = ["In Line"];
        this.statusAvailablesToOut = ["In Toolcrib"];
        this.serialsDone = false;
        this.delieveringEmployee = "";
        this.receivingEmployee = "";
        this.employeesDone = false;
        this.displayedColumns = ['serial', 'message'];
    }
    InOutToolingsComponent.prototype.ngOnInit = function () {
        this.txtToolings = "";
        this.iconButtonValidate = "<i class=\"fas fa-check-circle\"></i>";
        this.iconButtonValidateEmployee = "<i class=\"fas fa-check-circle\"></i>";
        this.ELEMENT_DATA = new Array();
        this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
        this.contentTooltip = "Solo podrás cambiar entrada/salida mientras estés editando los seriales";
    };
    InOutToolingsComponent.prototype.saveInOut = function () {
        var _this = this;
        this.notifyLoading = this.notify.setLoading("Guadando " + ((this.radioModel == 'in') ? "entradas" : "salidas"), this.notifyLoading);
        var toolingsToInOut = this.getToolingsSerialsFormated();
        var ioTool = new IOTool();
        ioTool.newStatus = (this.radioModel == 'in') ? 5 : 2;
        ioTool.toolings = toolingsToInOut;
        ioTool.userDelivery = this.delieveringEmployee;
        ioTool.userReceive = this.receivingEmployee;
        this.toolingService.ioToolings(ioTool).subscribe(function (results) {
            _this.notifyLoading = _this.notify.setLoadingDone(" Cambios guardados", _this.notifyLoading);
            _this.historyService.insertNewHistory(_this.applicationData.userInfo.userName, "Se les dio " + ((_this.radioModel == 'in') ? "entrada" : "salida") + " a los herramentales (" + toolingsToInOut + ") entreg\u00F3: " + _this.delieveringEmployee + " y recibi\u00F3: " + _this.receivingEmployee);
        }, function (err) {
            if (err.error instanceof Error) {
                console.log("Client-side error");
            }
            else {
                console.log("Server-side error");
            }
        });
    };
    InOutToolingsComponent.prototype.clearForm = function () {
        this.serialsDone = false;
        this.tableErrorsHidden = true;
        this.employeesDone = false;
        this.txtToolings = "";
        this.receivingEmployee = "";
        this.delieveringEmployee = "";
        this.radioModel = 'in';
    };
    InOutToolingsComponent.prototype.validateToolings = function () {
        var _this = this;
        if (this.txtToolings.trim() != "") {
            this.ELEMENT_DATA = new Array();
            this.setStatusButtonValidate('loading', 'btnValidateToolings');
            this.toolingService.getToolingsValidation(this.getToolingsSerialsFormated()).subscribe(function (results) {
                var auxSerials = "";
                for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                    var element = results_1[_i];
                    if (element.existe) {
                        if (_this.radioModel == 'in' && !_this.checkIfExists(_this.statusAvailablesToIn, element.status)) {
                            _this.ELEMENT_DATA.push(new ValidationResults(element.tooling, "Se ecuentra en statuss " + element.status));
                        }
                        else if (_this.radioModel == 'out' && !_this.checkIfExists(_this.statusAvailablesToOut, element.status)) {
                            _this.ELEMENT_DATA.push(new ValidationResults(element.tooling, "Se ecuentra en status " + element.status));
                        }
                        else {
                            auxSerials += element.tooling + "\n";
                        }
                    }
                    else {
                        _this.ELEMENT_DATA.push(new ValidationResults(element.tooling, "No existe este herramental"));
                    }
                }
                if (_this.ELEMENT_DATA.length == 0) {
                    _this.tableErrorsHidden = true;
                    _this.setStatusButtonValidate('success', 'btnValidateToolings');
                }
                else {
                    _this.tableErrorsHidden = false;
                    _this.dataSource = new MatTableDataSource(_this.ELEMENT_DATA);
                    _this.dataSource.paginator = _this.paginator;
                    _this.setStatusButtonValidate('error', 'btnValidateToolings');
                }
                _this.txtToolings = auxSerials;
                _this.serialsDone = true;
                _this.countNumberOfSerials();
            }, function (err) {
                if (err.error instanceof Error)
                    console.log("Client-side error");
                else
                    console.log("Server-side error");
                _this.notify.setNotification("Lo sentimos", "Error interno, favor de contactar a IT", "error");
            });
        }
        else {
            this.notify.setNotification("Campo vacio", "Inserta al menos un herramnetal", "error");
            this.element.nativeElement.querySelector("#textAreaToolings").focus();
        }
    };
    InOutToolingsComponent.prototype.checkIfExists = function (array, word) {
        var exists = false;
        for (var index = 0; index < array.length; index++) {
            if (word == array[index])
                exists = true;
        }
        return exists;
    };
    InOutToolingsComponent.prototype.validateEmployees = function () {
        var _this = this;
        if (this.delieveringEmployee.trim() != "") {
            if (this.receivingEmployee.trim() != "") {
                if (this.receivingEmployee.trim() != this.delieveringEmployee.trim()) {
                    this.setStatusButtonValidate('loading', 'btnValidateEmployees');
                    this.toolingService.getEmployeeValidation(this.delieveringEmployee.trim()).subscribe(function (results) {
                        if (!results.success) {
                            _this.notify.setNotification("Error", results.message, "error");
                            _this.element.nativeElement.querySelector("#txtDelieveringEmployee").focus();
                            _this.setStatusButtonValidate('error', 'btnValidateEmployees');
                        }
                        else {
                            _this.toolingService.getEmployeeValidation(_this.receivingEmployee.trim()).subscribe(function (results) {
                                if (!results.success) {
                                    _this.setStatusButtonValidate('error', 'btnValidateEmployees');
                                    _this.notify.setNotification("Error", results.message, "error");
                                    _this.element.nativeElement.querySelector("#txtReceivingEmployee").focus();
                                }
                                else {
                                    _this.setStatusButtonValidate('success', 'btnValidateEmployees');
                                    _this.employeesDone = true;
                                    _this.element.nativeElement.querySelector("#divButtonsEmployees").setAttribute('class', 'col-2');
                                }
                            }, function (err) {
                                if (err.error instanceof Error)
                                    console.log("Client-side error");
                                else
                                    console.log("Server-side error");
                                _this.notify.setNotification("Lo sentimos", "Error interno, favor de contactar a IT", "error");
                            });
                        }
                    }, function (err) {
                        if (err.error instanceof Error)
                            console.log("Client-side error");
                        else
                            console.log("Server-side error");
                        _this.notify.setNotification("Lo sentimos", "Error interno, favor de contactar a IT1", "error");
                    });
                }
                else {
                    this.notify.setNotification("Campo vacio", "El usuario que entrega no debe ser el mismo que recibe", "error");
                    this.element.nativeElement.querySelector("#txtReceivingEmployee").focus();
                }
            }
            else {
                this.notify.setNotification("Campo vacio", "Inserta el numero de empleado de quien recibe", "error");
                this.element.nativeElement.querySelector("#txtReceivingEmployee").focus();
            }
        }
        else {
            this.notify.setNotification("Campo vacio", "Inserta el numero de empleado de quien entrega", "error");
            this.element.nativeElement.querySelector("#txtDelieveringEmployee").focus();
        }
    };
    InOutToolingsComponent.prototype.getToolingsSerialsFormated = function () {
        return this.txtToolings.trim().replace(/\r?\n/g, ",");
    };
    InOutToolingsComponent.prototype.continueEditing = function () {
        var _this = this;
        this.serialsDone = false;
        this.tableErrorsHidden = true;
        setTimeout(function () {
            _this.element.nativeElement.querySelector("#textAreaToolings").focus();
        }, 200);
    };
    InOutToolingsComponent.prototype.continueEditingEmployees = function () {
        var _this = this;
        this.employeesDone = false;
        this.element.nativeElement.querySelector("#divButtonsEmployees").setAttribute('class', 'col-1');
        setTimeout(function () {
            _this.element.nativeElement.querySelector("#txtDelieveringEmployee").focus();
        }, 200);
    };
    InOutToolingsComponent.prototype.countNumberOfSerials = function () {
        var vTextArea = this.txtToolings;
        if (vTextArea.trim() == "") {
            this.spCountSerials = 0;
        }
        else {
            vTextArea = vTextArea.replace(/\r?\n/g, " ");
            vTextArea = vTextArea.replace(/[ ]+/g, " ");
            vTextArea = vTextArea.replace(/^ /, "");
            vTextArea = vTextArea.replace(/ $/, "");
            var textoTroceado = vTextArea.split(" ");
            this.spCountSerials = textoTroceado.length;
        }
    };
    InOutToolingsComponent.prototype.setStatusButtonValidate = function (status, button) {
        var _this = this;
        var btnClass = "";
        if (button == 'btnValidateToolings') {
            btnClass = "btn-toolings";
        }
        else {
            btnClass = "btn-employees";
        }
        if (status == 'error') {
            this.element.nativeElement.querySelector("#" + button).setAttribute('class', 'btn btn-outline-danger btn-lg ' + btnClass);
            this.setIconButtonValidate("<i class=\"fas fa-times\"></i>", button);
            setTimeout(function () {
                _this.element.nativeElement.querySelector("#" + button).setAttribute('class', 'btn btn-outline-success btn-lg ' + btnClass);
                _this.setIconButtonValidate("<i class=\"fas fa-check-circle\"></i>", button);
            }, 2000);
        }
        else if (status == 'success') {
            this.element.nativeElement.querySelector("#" + button).setAttribute('class', 'btn btn-outline-success btn-lg ' + btnClass);
            this.setIconButtonValidate("<i class=\"fas fa-check-double\"></i>", button);
            setTimeout(function () {
                _this.setIconButtonValidate("<i class=\"fas fa-check-circle\"></i>", button);
            }, 1500);
        }
        else if (status == 'loading') {
            this.element.nativeElement.querySelector("#" + button).setAttribute('class', 'btn btn-outline-info btn-lg ' + btnClass);
            this.setIconButtonValidate("<i class=\"fas fa-spinner fa-pulse\"></i>", button);
        }
    };
    InOutToolingsComponent.prototype.setIconButtonValidate = function (icon, button) {
        if (button == 'btnValidateToolings') {
            this.iconButtonValidate = icon;
        }
        else {
            this.iconButtonValidateEmployee = icon;
        }
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], InOutToolingsComponent.prototype, "paginator", void 0);
    return InOutToolingsComponent;
}());
export { InOutToolingsComponent };
//# sourceMappingURL=in-out-toolings.component.js.map