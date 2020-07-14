import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {MatPaginator,MatTableDataSource} from '@angular/material';
import { Tooling, ToolingClass } from 'src/app/models/tooling/tooling.model';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Notify } from 'src/app/modules/notify/notify';
import { RequestMaintance } from 'src/app/models/request-maintance/request-maintance.model';
import { RequimttoService } from 'src/app/modules/requimtto/requimtto.service';
import { ApplicationData } from 'src/app/models/home/home.model';
import { Constants } from 'src/app/helpers/constats';
import { HistoryService } from 'src/app/modules/history/history.service';

@Component({
  selector: 'app-requimtto',
  templateUrl: './requimtto.component.html',
  styleUrls: ['./requimtto.component.css']
})
export class RequimttoComponent implements OnInit {

  displayedColumns: string[] = ['id','project','serial', 'type', 'qtyPasses', 'qtyMtto', 'proxMtto', 'status'];
  toolings:Tooling[];
  dataSource : any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  notifyLoader : any;
  commentToAskMaintance = "";
  toolingToAskMaintance = "";
  pktool = 0;
  dataApplication : ApplicationData;

  constructor(private toolingService : ToolingService, private notify : Notify, private element : ElementRef, private requimttoService:RequimttoService, private historyService : HistoryService) { }

  ngOnInit() {
    this.dataApplication = JSON.parse(
      localStorage.getItem(Constants.localStorage)
    );
    this.getAllToolings();
  }

  getAllToolings(){
    this.notifyLoader = this.notify.setLoading("Cargando herramentales",this.notifyLoader);
    this.toolingService.getAllToolings().subscribe(ptoolings =>{
      this.toolings = ptoolings;
      this.dataSource = new MatTableDataSource <Tooling>(this.toolings);
      this.dataSource.paginator = this.paginator;
      this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
    });
    this.dataApplication  = JSON.parse( localStorage.getItem(Constants.localStorage));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSerialOnTextBox(tool:string, pktool:number){
    this.toolingToAskMaintance = tool;
    this.element.nativeElement.querySelector("#txtComments").focus();
    this.pktool = pktool;
  }

  askToolingMaintance(){
   
    let obj = new RequestMaintance();
    obj.comments = this.commentToAskMaintance;
    obj.fkTooling = new ToolingClass(this.pktool);
    obj.userRequest = this.dataApplication.userInfo.userName;
    this.notifyLoader = this.notify.setLoading("Insertando",this.notifyLoader);
    console.log(obj)
    this.requimttoService.insertRequiMtto(obj).subscribe(results=>{
      if(results.success){
        this.notifyLoader = this.notify.setLoadingDone("Listo", this.notifyLoader);
        this.pktool = 0;
        this.historyService.insertNewHistory(this.dataApplication.userInfo.userName,  `Insertó una requisición para el herramental (${this.toolingToAskMaintance})`);
        this.toolingToAskMaintance = "";
        this.commentToAskMaintance = "";
      }
      else{
        this.notify.setNotification("Error", results.message.replace("null",this.toolingToAskMaintance),"error")
        this.notifyLoader = this.notify.setLoadingError("Error", this.notifyLoader);
      }
    });
  }

}
