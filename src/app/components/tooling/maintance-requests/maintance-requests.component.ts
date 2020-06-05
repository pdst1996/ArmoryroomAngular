import { Component, OnInit,ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';
import { ApplicationData, Profile, User } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { RequesMaintance } from 'src/app/models/tooling/tooling.model';
import { Notify } from 'src/app/modules/notify/notify';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-maintance-requests',
  templateUrl: './maintance-requests.component.html',
  styleUrls: ['./maintance-requests.component.css']
})
export class MaintanceRequestsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id','tooling','requisitor', 'date', 'comment', 'auth'];
  public radioModel = 'in';
  public applicationData: ApplicationData;
  public profiles: Profile[];
  public user: User;
  public userPermissionToAproveReject = false;
  public requests : RequesMaintance[];
  public notifyLoading:any;
  action = false;
  pkRequest = 0;
  dataSource = new MatTableDataSource <RequesMaintance>(this.requests);
  modalRef: BsModalRef;
  valueSign = "";

  constructor(private toolingService: ToolingService, private notify:Notify, private modalService: BsModalService,private element : ElementRef) { 
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
    
    console.log(this.profiles)
    for (const profile of this.profiles) {
      if(profile.idProfile==41){
        this.userPermissionToAproveReject = true;
      }
    }
    this.getAllRequestMaintance();
  }

  getAllRequestMaintance(){
    this.toolingService.findAllRequestMaintance().subscribe(prequests =>{
      this.requests = prequests;
      this.dataSource = new MatTableDataSource <RequesMaintance>(this.requests);
      this.dataSource.paginator = this.paginator;
      console.log(this.requests)
    });
  }

  openModalConfirmRequest(action: boolean, pkRequest: number, template:any){
    this.valueSign = (action) ? "aprobar" : "denegar";
    this.openModal(template);
    this.action = action;
    this.pkRequest = pkRequest;
  }


  signRequest(){
    let value = "";
    if(this.action){
      value = "Aprobando requisicion";
    }else{
      value = "Rechazando requisicion"
    }

    this.notifyLoading = this.notify.setLoading(" "+value, this.notifyLoading);
    this.toolingService.aproveRejectRequestMaintance(this.action, this.pkRequest, this.user.userName).subscribe(
      results =>{
        this.notifyLoading = this.notify.setLoadingDone(" Listo", this.notifyLoading);
        this.modalRef.hide();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
