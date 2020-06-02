import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolingRoutingModule } from './tooling-routing.module';
import { ToolingComponent } from '../../components/tooling/tooling.component';
import { AddNewToolingComponent } from '../../components/tooling/add-new-tooling/add-new-tooling.component';
import { ShowToolingsComponent } from '../../components/tooling/show-toolings/show-toolings.component';
import { MaintanceRequestsComponent } from '../../components/tooling/maintance-requests/maintance-requests.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    ToolingRoutingModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: [ToolingComponent, AddNewToolingComponent, ShowToolingsComponent, MaintanceRequestsComponent]
})
export class ToolingModule { }
