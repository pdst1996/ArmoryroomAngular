import { Injectable } from "@angular/core";

import SlimSelect from 'slim-select'

@Injectable({
  providedIn: "root"
})
export class Slim {
  constructor() {
    SlimSelect;
  }
  
  setSlimSelet(id: string) {
    return  new SlimSelect({
      select: '#'+id
    });
  }
  
}
