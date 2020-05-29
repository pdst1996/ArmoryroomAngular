import { Injectable } from "@angular/core";

import PNotify from "pnotify/dist/es/PNotifyCompat";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";

@Injectable({
  providedIn: "root"
})
export class Notify {
  constructor() {
    PNotifyButtons;
    PNotify.defaults.styling = "bootstrap4";
    PNotify.defaults.icons = "fontawesome5";
  }
  setNotification(title: string, text: string, type: string) {
    return new PNotify({
      title: title,
      text: text,
      type: type,
      delay: "1000"
    });
  }

  setConfirm(title: string, text: string, type: string, icon: string) {
    return PNotify.notice({
      title: title,
      text: text,
      icon: icon,
      hide: false,
      stack: {
        dir1: "down",
        modal: true,
        firstpos1: 25
      },
      modules: {
        Confirm: {
          confirm: true
        },
        Buttons: {
          closer: false,
          sticker: false
        },
        History: {
          history: false
        }
      }
    });
  }

  setLoading(text: string, time:number, delay:number) {
      
    const loader = PNotify.alert({
      text: ' '+text,
      icon: 'fas fa-spinner fa-pulse',
      type: 'info',
      title:false,
      shadow: false,
      sticker: false,
      delay: time,
      stack: {
        dir1: 'down',
        firstpos1: 25,
        modal: false,
        maxOpen: Infinity
      }
    });
    
    setTimeout(() => {
      loader.update({
        icon : 'fas fa-check',
        type : 'success',
        text: "   Listo"
      });
    }, delay);

  
    
   
  
  

    return loader;
 

  }
}
