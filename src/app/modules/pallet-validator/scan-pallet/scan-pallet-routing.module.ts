import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanPalletComponent } from '../../../components/pallet-validator/scan-pallet/scan-pallet.component';

const routes: Routes = [
  { path: '', component: ScanPalletComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanPalletRoutingModule { }
