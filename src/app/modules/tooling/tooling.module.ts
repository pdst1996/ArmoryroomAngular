import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolingRoutingModule } from './tooling-routing.module';
import { ToolingComponent } from '../../components/tooling/tooling.component';
import { AddNewToolingComponent } from '../../components/tooling/add-new-tooling/add-new-tooling.component';
import { ShowToolingsComponent } from '../../components/tooling/show-toolings/show-toolings.component';
import { InOutToolingsComponent } from '../../components/tooling/in-out-toolings/in-out-toolings.component';
import { ToolingPartnumberComponent } from '../../components/tooling/tooling-partnumber/tooling-partnumber.component';
import { ToolingStationsComponent } from '../../components/tooling/tooling-stations/tooling-stations.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatProgressBarModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatExpansionModule} from '@angular/material/expansion';

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
    MatCheckboxModule,
    ButtonsModule,
    TooltipModule.forRoot(),
    MatSelectModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatProgressBarModule,
    MatExpansionModule
    
  ],
  declarations: [
    ToolingComponent, 
    AddNewToolingComponent, 
    ShowToolingsComponent,
    InOutToolingsComponent,
    ToolingPartnumberComponent,
    ToolingStationsComponent,
    ]
})
export class ToolingModule { }
