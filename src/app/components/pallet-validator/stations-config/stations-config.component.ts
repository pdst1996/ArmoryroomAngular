import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-stations-config',
  templateUrl: './stations-config.component.html',
  styleUrls: ['./stations-config.component.css']
})
export class StationsConfigComponent implements OnInit {

  displayedColumns: string[] = ['pkstation','station','project', 'correctVariable', 'unit', 'contramascaraQty', 'action'];
  dataSource :any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

}
