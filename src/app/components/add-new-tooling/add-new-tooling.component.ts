import { Component, OnInit } from '@angular/core';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Project, PartNumber } from '../../models/tooling/tooling.model'
import { Constants } from '../../helpers/constats'

@Component({
  selector: 'app-add-new-tooling',
  templateUrl: './add-new-tooling.component.html',
  styleUrls: ['./add-new-tooling.component.css']
})
export class AddNewToolingComponent implements OnInit {
  project : Project;
  projects : Project[];
  partNumber : PartNumber;
  PartNumbers : PartNumber[];
  public slProject : number;
  constructor(private projectService: ToolingService) { }


  
  getAllProjects(){
    this.projectService.findAllProjects().subscribe(projects =>{
      this.projects = projects;
    });
  }

  getPartNumbersByProject(){
    this.projectService.getPartNumbersByProject(8).subscribe(PartNumbers =>{
      this.PartNumbers = PartNumbers;
    });
  }

  ngOnInit() {
    this.getAllProjects();
    //this.loadPartnumbers();
  }

  loadPartnumbers(){
    alert(this.slProject);
  }

}




