import { Component, OnInit } from '@angular/core';
import { ToolingService } from 'src/app/modules/tooling/tooling.service';
import { Project } from '../../models/tooling/tooling.model'

@Component({
  selector: 'app-add-new-tooling',
  templateUrl: './add-new-tooling.component.html',
  styleUrls: ['./add-new-tooling.component.css']
})
export class AddNewToolingComponent implements OnInit {
  project : Project;
  projects : Project[];
  constructor(private projectService: ToolingService) { }

  getAllProjects(){
    this.projectService.findAllProjects().subscribe(projects =>{
      this.projects = projects;
      console.log(this.projects);
    });
  }

  ngOnInit() {
    this.getAllProjects();
  }

}


