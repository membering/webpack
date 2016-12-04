import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  ngOnInit() {
    $.getScript('../../../assets/js/custom.js');
  }
}