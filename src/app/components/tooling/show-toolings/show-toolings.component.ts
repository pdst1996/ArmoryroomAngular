import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator,MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  id: number;
  project: string;
  serial: string;
  type: string;
  qtyPasses: string;
  qtyMtto: string;
  proxMtto: string;
  status: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, project: 'NOKIA', serial: 'SNGETE45T27TE', type: 'Pallet', qtyPasses: '2', qtyMtto: 'N/A', proxMtto: '2 semanas', status: 'En toolcrib'},
  { id: 2, project: 'TESLA', serial: 'SN5363G3D', type: 'Pallet', qtyPasses: '1', qtyMtto: 'N/A', proxMtto: '3 semanas', status: 'En produccion'},
  { id: 3, project: 'HARMAN', serial: 'SN635453T3D', type: 'Magazine', qtyPasses: 'NA', qtyMtto: '1', proxMtto: '1 semana', status: 'Expirado'}
];


@Component({
  selector: 'app-show-toolings',
  templateUrl: './show-toolings.component.html',
  styleUrls: ['./show-toolings.component.css']
})
export class ShowToolingsComponent implements OnInit {

  displayedColumns: string[] = ['id','project','serial', 'type', 'qtyPasses', 'qtyMtto', 'proxMtto', 'status', 'controls'];
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
