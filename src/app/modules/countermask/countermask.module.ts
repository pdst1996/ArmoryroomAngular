import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountermaskRoutingModule } from './countermask-routing.module';
import { CountermaskComponent } from '../../components/countermask/countermask.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [CountermaskComponent],
  imports: [
    CommonModule,
    CountermaskRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ButtonsModule
  ]
})
export class CountermaskModule { }
