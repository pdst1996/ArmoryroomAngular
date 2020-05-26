import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from 'src/app/components/principal/principal.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [PrincipalComponent]
})
export class PrincipalModule { }
