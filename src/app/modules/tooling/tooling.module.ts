import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolingRoutingModule } from './tooling-routing.module';
import { ToolingComponent } from '../../components/tooling/tooling.component';
import { AddNewToolingComponent } from '../../components/add-new-tooling/add-new-tooling.component';
import { ShowToolingsComponent } from '../../components/tooling/show-toolings/show-toolings.component'
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';




@NgModule({
  imports: [
    CommonModule,
    ToolingRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    MatTabsModule,
    MatIconModule,
    BsDatepickerModule.forRoot(),
    
  ],
  declarations: [ToolingComponent, AddNewToolingComponent, ShowToolingsComponent]
})
export class ToolingModule { }
