import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryService } from 'src/app/modules/history/history.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Notify } from 'src/app/modules/notify/notify';
import { HistoryLog } from 'src/app/models/history/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['author','changes','date'];
  dataSource : any;
  notifyLoader : any;

  constructor(private historyService : HistoryService, private notify:Notify) { }

  ngOnInit() {
    this.getAllHistory();
  }

  getAllHistory(){
    this.notifyLoader = this.notify.setLoading("Cargando historial",this.notifyLoader);
    this.historyService.getHistory().subscribe(results =>{

      this.dataSource = new MatTableDataSource <HistoryLog>(results.reverse());
      this.dataSource.paginator = this.paginator;
      this.notifyLoader = this.notify.setLoadingDone("Listo",this.notifyLoader);
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
