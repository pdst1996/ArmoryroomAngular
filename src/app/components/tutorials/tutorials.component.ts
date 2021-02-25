import { Component, OnInit } from '@angular/core';
import Reveal from "ng-revealjs/src/ng-reveal.js";
import Markdown from 'ng-revealjs/demo/lib/reveal/plugin/markdown/markdown.js';
import Highlight from 'ng-revealjs/demo/lib/reveal/plugin/highlight/highlight.js';
import Notes from 'ng-revealjs/demo/lib/reveal/plugin/notes/notes.js';


@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  

  }

  // ngAfterViewInit() {
  //   Reveal.initialize(
  //     {
  //       plugins: [
  //         Markdown,
  //         Highlight,
  //         Notes
  //       ]
  //     }
  //   );
  // }


}
