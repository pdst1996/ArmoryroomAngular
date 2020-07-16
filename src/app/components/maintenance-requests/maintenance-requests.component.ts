import { Component, OnInit,ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { ApplicationData, Profile, User } from '../../models/home/home.model';
import { Constants } from '../../helpers/constats';
import { MaintenanceRequestsService } from '../../modules/maintenance-requests/maintenance-requests.service';
import { HistoryService } from '../../modules/history/history.service';
import { RequestMaintance } from '../../models/request-maintance/request-maintance.model';
import { Notify } from '../../modules/notify/notify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-maintenance-requests',
  templateUrl: './maintenance-requests.component.html',
  styleUrls: ['./maintenance-requests.component.css']
})
export class MaintenanceRequestsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id','tooling','requisitor', 'date', 'comment', 'auth'];
  public radioModel = 'in';
  public applicationData: ApplicationData;
  public profiles: Profile[];
  public user: User;
  public userPermissionToAproveReject = false;
  public requests : RequestMaintance[];
  public notifyLoading:any;
  action = false;
  pkRequest = 0;
  dataSource = new MatTableDataSource <RequestMaintance>(this.requests);
  modalRef: BsModalRef;
  valueSign = "";
  thereRequests = false;
  commentToSign = "";

  constructor(private mrService: MaintenanceRequestsService, 
              private notify:Notify, 
              private modalService: BsModalService,
              private element : ElementRef,
              private historyService: HistoryService) { 
    this.applicationData = new ApplicationData();
    this.applicationData.profiles = new Array<Profile>();
  }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    if(this.applicationData != null){
      this.profiles = this.applicationData.profiles; 
      this.user = this.applicationData.userInfo;
    }
    
    for (const profile of this.profiles) {
      if(profile.idProfile==41){
        this.userPermissionToAproveReject = true;
      }
    }
    this.getAllRequestMaintance();
  }

  getAllRequestMaintance(){
    
    this.mrService.findAllRequestMaintance().subscribe(prequests =>{
      this.requests = new Array<RequestMaintance>();
      this.thereRequests = false;
      for (const iterator of prequests) {
        if(iterator.aproved == null){
          this.requests.push(iterator);
        } 
      }
      if(this.requests.length != 0 || this.requests == null)
        this.thereRequests = true;
      
      this.dataSource = new MatTableDataSource <RequestMaintance>(this.requests);
      this.dataSource.paginator = this.paginator;
    });
  }

  openModalConfirmRequest(action: boolean, pkRequest: number, template:any){
    this.valueSign = (action) ? "aprobar" : "denegar";
    this.openModal(template);
    this.action = action;
    this.pkRequest = pkRequest;
    this.commentToSign = "";
  }

  signRequest(){
    let value = "";
    let value2 = "";
    if(this.action){
      value = "Aprobando requisicion";
      value2 = "aprobó";
    }else{
      value = "Rechazando requisicion";
      value2 = "denegó";
    }

    if(!this.action && this.commentToSign.trim() == ""){
      this.notify.setNotification("ERROR", "Ingrese un comentario", "error");
    }else{
      this.notifyLoading = this.notify.setLoading(" "+value, this.notifyLoading);
      this.mrService.aproveRejectRequestMaintance(this.action, this.pkRequest, this.user.userName, this.commentToSign).subscribe(
        results =>{
          if(results.success){
            this.notifyLoading = this.notify.setLoadingDone(" Listo", this.notifyLoading);
            this.modalRef.hide();
            this.historyService.insertNewHistory(this.user.userName, `Se ${value2} la requisición ${this.pkRequest}`);
            this.getAllRequestMaintance();
          }else{
            this.notifyLoading = this.notify.setLoadingError(" Error", this.notifyLoading);
            this.notify.setNotification("ERROR", results.message +". Se recomiendo actualizar la pagina", "error");
            this.modalRef.hide();
          }
        
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error");
          } else {
            console.log("Server-side error");
          }
          this.notifyLoading = this.notify.setLoadingError(" Ocurrio un error", this.notifyLoading);
          this.getAllRequestMaintance();
          this.modalRef.hide();
        }
      );
    }
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
