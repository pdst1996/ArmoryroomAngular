import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiberatePalletRoutingModule } from './liberate-pallet-routing.module';
import { LiberatePalletComponent } from '../../../components/pallet-validator/liberate-pallet/liberate-pallet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    LiberatePalletRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    LiberatePalletComponent
  ]
})
export class LiberatePalletModule { }
