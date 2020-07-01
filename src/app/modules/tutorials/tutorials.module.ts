import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { TutorialsComponent } from '../../components/tutorials/tutorials.component'
import { TutorialsRoutingModule } from './tutorials-routing.module';


@NgModule({
  declarations: [ TutorialsComponent],
  imports: [
    CommonModule,
    TutorialsRoutingModule
  ]
})
export class TutorialsModule { }
