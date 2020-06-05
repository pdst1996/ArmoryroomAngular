import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Notify } from 'src/app/modules/notify/notify';
import { MatPaginator,MatTableDataSource } from '@angular/material';

export interface ValidationResults {
  serial: string;
  message: string;
}

const ELEMENT_DATA: ValidationResults[] = [
  { serial: 'SNGSS88HS', message: 'Herramental fuera del toolcrib'},
  { serial: 'SNGSS88HS', message: 'Herramental no existente'},
  { serial: 'SNGSS88HS', message: 'Herramental en scrap'},
  { serial: 'SNGSS88HS', message: 'Herramental en cuarentena'}
];

@Component({
  selector: 'app-in-out-toolings',
  templateUrl: './in-out-toolings.component.html',
  styleUrls: ['./in-out-toolings.component.css']
})
export class InOutToolingsComponent implements OnInit {

  public radioModel = 'in';
  public txtToolings : string ;
  public notifyLoading : any;
  public iconButtonValidate : string;

  displayedColumns: string[] = ['serial','message'];
  dataSource = new MatTableDataSource <ValidationResults>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private notify : Notify, private element : ElementRef) { }

  ngOnInit() {
    this.txtToolings = "";
    this.dataSource.paginator = this.paginator;
    this.iconButtonValidate = "<i class=\"fas fa-check-circle\"></i>";
  }

  validateToolings(){
    this.setStatusButtonValidate('loading');
    setTimeout(() => {
      this.setStatusButtonValidate('success');
    }, 2000);
  }

  saveInOut(){
    this.notifyLoading = this.notify.setLoading(" Guardando in-out", this.notifyLoading);
    setTimeout(() => {
      this.notifyLoading = this.notify.setLoadingChangeText(" Wue sigo esperando :c", this.notifyLoading);
      setTimeout(() => {
        this.notifyLoading = this.notify.setLoadingDone(" :)", this.notifyLoading);
      }, 3000);
    }, 3000);
  }

  setStatusButtonValidate(status:string){
    if(status == 'error'){
      this.element.nativeElement.querySelector("#btnValidateToolings").setAttribute('class','btn btn-outline-danger btn-lg btn-toolings');
      this.iconButtonValidate = "<i class=\"fas fa-times\"></i>";
      setTimeout(() => {
        this.element.nativeElement.querySelector("#btnValidateToolings").setAttribute('class','btn btn-outline-success btn-lg btn-toolings');
        this.iconButtonValidate = "<i class=\"fas fa-check-circle\"></i>";
      }, 1500);
    }
    else if(status == 'success'){
      this.element.nativeElement.querySelector("#btnValidateToolings").setAttribute('class','btn btn-outline-success btn-lg btn-toolings');
      this.iconButtonValidate = "<i class=\"fas fa-check-double\"></i>";
      setTimeout(() => {
        this.iconButtonValidate = "<i class=\"fas fa-check-circle\"></i>";
      }, 1500);
    }
    else if(status == 'loading'){
      this.element.nativeElement.querySelector("#btnValidateToolings").setAttribute('class','btn btn-outline-info btn-lg btn-toolings');
      this.iconButtonValidate = "<i class=\"fas fa-spinner fa-pulse\"></i>";
    }
  }

}
