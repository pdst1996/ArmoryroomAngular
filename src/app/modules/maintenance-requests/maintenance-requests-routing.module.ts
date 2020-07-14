import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceRequestsComponent } from '../../components/maintenance-requests/maintenance-requests.component';

const routes: Routes = [
  { path: '', component: MaintenanceRequestsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRequestsRoutingModule { }
