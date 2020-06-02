import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator,MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  id: number;
  tooling: string;
  requisitor: string;
  date: string;
  comment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, tooling: 'SN6373EHJUWEW', requisitor: 'PEDRODANIEL_SALDANA', date: '2020-05-12', comment: 'Salio del tool para hacer cosas en la linea de produccion'}
];

@Component({
  selector: 'app-maintance-requests',
  templateUrl: './maintance-requests.component.html',
  styleUrls: ['./maintance-requests.component.css']
})
export class MaintanceRequestsComponent implements OnInit {

  displayedColumns: string[] = ['id','tooling','requisitor', 'date', 'comment', 'auth'];
  dataSource = new MatTableDataSource <PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
