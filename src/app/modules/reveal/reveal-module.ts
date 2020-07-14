import { Injectable } from "@angular/core";

import Reveal from "reveal.js/dist/reveal.js";
import RevealNotes from "reveal.js/plugin/notes/notes.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.js";


@Injectable({
  providedIn: "root"
})

export class RevealModule {
  constructor() {
    Reveal.initialize({
      hash: true,
      plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
    });
    
  }

 
}