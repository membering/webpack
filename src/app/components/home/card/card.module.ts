import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MomentModule } from 'angular2-moment';

import { CardComponent } from './index';
import { ListComponent, PublishedComponent, ReceivedComponent } from './list/index';
import { GenerateComponent, TemplateComponent, CreateComponent } from './generate/index';
import { DetailComponent, EditComponent, PublishComponent, SendComponent } from './action/index';

import { CardService } from '../../../services/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterModule,
        Ng2PaginationModule,
        MomentModule
    ],
    declarations: [
        CardComponent,
        ListComponent, PublishedComponent, ReceivedComponent,
        GenerateComponent, TemplateComponent, CreateComponent, PublishComponent,
        DetailComponent, EditComponent, SendComponent
    ],
    providers: [
        CardService
    ],
    bootstrap: [ CardComponent ]
})

export class CardModule { }