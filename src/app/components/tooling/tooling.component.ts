import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tooling',
  templateUrl: './tooling.component.html',
  styleUrls: ['./tooling.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  reloadToolings(){
    alert(2)
  }

}
