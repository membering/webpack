import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
	templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
	ngOnInit() {
		$.getScript('../../../assets/js/custom.js');
	}
}
