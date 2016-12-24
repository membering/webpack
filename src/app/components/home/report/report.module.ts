import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardService } from '../../../services/index';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule, ReactiveFormsModule,
    ],
    declarations: [

    ],
    providers: [
        CardService
    ]
})

export class ReportModule { }