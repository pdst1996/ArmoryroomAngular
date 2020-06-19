import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsConfigComponent } from '../../../components/pallet-validator/stations-config/stations-config.component';

const routes: Routes = [
  { path: '', component: StationsConfigComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsConfigRoutingModule { }
