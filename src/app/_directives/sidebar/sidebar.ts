import { Component } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarDirective {
	jwtHelper: JwtHelper = new JwtHelper();
	profile: any = {};

	constructor() {
		this.profile = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
		if (this.profile.avatar != null && this.profile.avatar.indexOf('http') < 0) {
			this.profile.avatar = 'http://static2.fastcard.vn/account/' + this.profile.avatar;
		}
	}
}
