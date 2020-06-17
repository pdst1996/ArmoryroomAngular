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

@NgModule({
    declarations: [
        HomeComponent,
        ArraySortPipe,
        FilterMenuPipe
    ],
    imports: [
        CommonModule,
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        HomeRoutingModule,
        FormsModule

    ],
    providers: [
        HomeService
    ],

})
export class HomeModule { }
