import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor() {
        console.log(process.env.ENV);
        console.log(process.env.apiUrl);
    }
}