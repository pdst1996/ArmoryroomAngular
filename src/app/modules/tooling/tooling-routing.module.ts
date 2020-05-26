import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolingComponent } from '../../components/tooling/tooling.component';

const routes: Routes = [
  { path: '', component: ToolingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolingRoutingModule { }
