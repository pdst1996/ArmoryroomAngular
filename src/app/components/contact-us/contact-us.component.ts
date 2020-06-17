import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constats';
import { ApplicationData } from 'src/app/models/home/home.model';
import { ContactUsService } from 'src/app/modules/contact-us/contact-us.service';

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

  constructor(private mailService : ContactUsService) { }

  ngOnInit() {
    //this.mailTo = Constants.mail;
    this.mailTo = "pedrodaniel.saldana@sanmina.com";
    this.applicationData = JSON.parse(localStorage.getItem(Constants.localStorage));
    this.mailFromText = this.applicationData.userInfo.mail;
    this.mailFrom = `<${Constants.applicationName}> ${Constants.application}@sanmina.com`;
    this.mailSubject = '';
    this.mailMessage = '';
  }

  sendMail(){
    this.mailService.sendMail(this.mailFrom, this.mailTo, this.mailSubject, this.mailMessage).subscribe(
      results =>{
        console.log(results)
      }
    )
  }

}
