import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MomentModule } from 'angular2-moment';

import { ContactComponent } from './index';
import { ListComponent } from './list/index';
import { DetailComponent, CreateComponent } from './action/index';

import { ContactService } from '../../../services/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        Ng2PaginationModule,
        MomentModule
    ],
    declarations: [
        ContactComponent,
        ListComponent,
        DetailComponent, CreateComponent
    ],
    providers: [
        ContactService
    ],
    bootstrap: [ ContactComponent ]
})

export class ContactModule { }