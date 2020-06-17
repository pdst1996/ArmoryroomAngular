import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiberatePalletComponent } from '../../../components/pallet-validator/liberate-pallet/liberate-pallet.component';

const routes: Routes = [
  { path: '', component: LiberatePalletComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiberatePalletRoutingModule { }
