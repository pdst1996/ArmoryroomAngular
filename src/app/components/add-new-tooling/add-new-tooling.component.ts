import { Component, OnInit } from '@angular/core';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Project, PartNumber, cProject, cPartNumber, Type } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'
import { Notify } from 'src/app/modules/notify/notify';

@Component({
  selector: 'app-add-new-tooling',
  templateUrl: './add-new-tooling.component.html',
  styleUrls: ['./add-new-tooling.component.css']
})
export class AddNewToolingComponent implements OnInit {
  
  public project : Project;
  projects : Project[];
  public cproject : cProject;

  public partNumber : PartNumber;
  public partNumbers : PartNumber[];
  public cpartNumber : cPartNumber;

  public type : Type;
  public types : Type[];
  

  constructor(private toolingService: ToolingService, private notify : Notify) {
    this.cproject = new cProject();
    this.cpartNumber = new cPartNumber();
  }

  ngOnInit() {
    this.cproject.pkProject = 0;
    this.cpartNumber.pk_Partnumber = 0.1;
    this.getAllProjects();
    this.getAllTypes();
  }

  getAllProjects(){
    this.toolingService.findAllProjects().subscribe(pprojects =>{
      this.projects = pprojects;
    });
  }

  getPartNumbersByProject(pPkProject: number){
    this.toolingService.getPartNumbersByProject(pPkProject).subscribe(pPartNumbers =>{
      this.partNumbers = pPartNumbers;
      if(this.partNumbers != undefined && this.partNumbers.length != 0){
        this.cpartNumber.pk_Partnumber = 0;
      }else{
        this.cpartNumber.pk_Partnumber = 0.1;
      }
    });
  }

  getAllTypes(){
    this.toolingService.findAllTypes().subscribe(ptypes =>{
      this.types = ptypes;
    });
  }

  loadPartnumbers(){
    this.notify.setLoading("Espera un momento",1800);
    this.getPartNumbersByProject(this.cproject.pkProject);
  }
}