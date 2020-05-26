import { NgModule } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeRoutingModule } from './home-routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from './home.service';
import { ArraySortPipe } from 'src/app/helpers/pipes/orderMenu';
import { FilterMenuPipe } from 'src/app/helpers/pipes/filterMenu';
import { RequimttoComponent } from 'src/app/components/requimtto/requimtto.component';
import {MatTableModule, MatPaginatorModule} from '@angular/material';

@NgModule({
    declarations: [
        HomeComponent,
        ArraySortPipe,
        FilterMenuPipe,RequimttoComponent
        
    ],
    imports: [
        CommonModule,
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        HomeRoutingModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule

    ],
    providers: [
        HomeService
    ],

})
export class HomeModule { }
