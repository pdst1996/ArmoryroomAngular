import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FillMttoComponent } from '../../components/fill-mtto/fill-mtto.component';

const routes: Routes = [
  { path: '', component: FillMttoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillMttoRoutingModule { }
