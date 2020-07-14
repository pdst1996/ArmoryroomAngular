import { Component, OnInit } from '@angular/core';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    let deck = new Reveal({
      plugins: [ Markdown ]
   })
   deck.initialize();

  }

}
