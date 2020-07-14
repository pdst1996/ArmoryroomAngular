import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Tooling, ToolingClass } from 'src/app/models/tooling/tooling.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { LiberatePalletService } from 'src/app/modules/pallet-validator/liberate-pallet/liberate-pallet.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryService } from 'src/app/modules/history/history.service';

@Component({
  selector: 'app-liberate-pallet',
  templateUrl: './liberate-pallet.component.html',
  styleUrls: ['./liberate-pallet.component.css']
})
export class LiberatePalletComponent implements OnInit {

  modalRef: BsModalRef;
  toolingTable : Tooling[];
  displayedColumns: string[] = ['id','project','serial', 'qtyPasses', 'status', 'liberate'];
  dataSource :any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applicationData: ApplicationData;
  palletToLiberate : Tooling;
  loader : any;

  constructor(private modalService: BsModalService, private liberateService : LiberatePalletService, private notify:Notify, private historyService : HistoryService) { }

  ngOnInit() {
    this.applicationData = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    this.getPalletsBlocked();
  }

  liberate( element:Tooling, modal:any){
    this.palletToLiberate = element;
    this.openModal(modal);
  }

  liberatePallet(){
    this.liberateService.liberatePallet(this.palletToLiberate.pkTooling).subscribe(results =>{
      if(results.success){
        this.notify.setNotification("HECHO", "Se libero el pallet "+this.palletToLiberate.tooling,"success");
        this.historyService.insertNewHistory(this.applicationData.userInfo.userName,  `Liberó el pallet (${this.palletToLiberate.tooling})`);
        this.closeModal();
      }else{
        this.notify.setNotification("HECHO", results.message,"error");
      }
      this.getPalletsBlocked();
    });
  }


  getPalletsBlocked(){
    this.loader = this.notify.setLoading("Cargando pallets",this.loader);
    this.toolingTable = new Array<Tooling>();
    this.liberateService.getPalletsBlocked().subscribe(ptoolings =>{
      this.loader = this.notify.setLoadingDone("Listo",this.loader);
      this.toolingTable = ptoolings;
      this.dataSource = new MatTableDataSource <Tooling>(this.toolingTable);
      this.dataSource.paginator = this.paginator;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-md');
  }

  closeModal(){
    this.modalRef.hide()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
