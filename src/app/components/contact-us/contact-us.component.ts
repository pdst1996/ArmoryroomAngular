import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constats';
import { ApplicationData } from 'src/app/models/home/home.model';
import { ContactUsService } from 'src/app/modules/contact-us/contact-us.service';
import { Notify } from 'src/app/modules/notify/notify';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  mailTo : string;
  mailFromText : string;
  mailFrom : string;
  applicationData : ApplicationData;
  mailSubject : string;
  mailMessage : string;
  innerButton : string;

  constructor(private mailService : ContactUsService, private notify : Notify) { }

  ngOnInit() {
    this.mailTo = Constants.mail;
    this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    this.mailFromText = this.applicationData.userInfo.mail;
    this.mailFrom = `${Constants.application}@sanmina.com`;
    this.mailSubject = '';
    this.mailMessage = '';
    this.innerButton = '<span class=\"content\"><i class=\"far fa-paper-plane\"></i>&nbsp;&nbsp;Enviar</span>';
  }

  sendMail(){
    this.innerButton = '<span class=\"content\"><i class=\"fas fa-spinner fa-pulse\"></i></span>';
    this.mailService.sendMail(this.mailFrom, this.mailTo, this.mailSubject, this.mailMessage, this.applicationData.userInfo.userName).subscribe(
      results =>{
        setTimeout(() => {
          this.innerButton = '<span class=\"content\"><i class=\"far fa-paper-plane\"></i>&nbsp;&nbsp;Enviar</span>';
        }, 500);
        this.notify.setNotification("Listo","Se envió el correo con éxito", "success");
        this.mailSubject = "";
        this.mailMessage = "";
      }
    )
  }

}
