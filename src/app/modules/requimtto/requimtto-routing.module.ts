import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequimttoComponent } from '../../components/requimtto/requimtto.component';

const routes: Routes = [
  { path: '', component: RequimttoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequimttoRoutingModule { }
