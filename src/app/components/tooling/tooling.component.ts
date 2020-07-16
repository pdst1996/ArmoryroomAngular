import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShowToolingsComponent } from '../../components/tooling/show-toolings/show-toolings.component'

@Component({
  selector: 'app-tooling',
  templateUrl: './tooling.component.html',
  styleUrls: ['./tooling.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolingComponent implements OnInit {

  constructor() { }

  selectedTabIndex: number = 0;

  ngOnInit() {
  }

  reloadToolings(){
    ShowToolingsComponent
  }

 
}
