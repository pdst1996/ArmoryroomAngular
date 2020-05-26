import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolingRoutingModule } from './tooling-routing.module';
import { ToolingComponent } from '../../components/tooling/tooling.component';
import { AddNewToolingComponent } from '../../components/add-new-tooling/add-new-tooling.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    ToolingRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [ToolingComponent, AddNewToolingComponent]
})
export class ToolingModule { }
