import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AuthService } from '../../services/index';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.authService.logout();
    }

    login() {
        this.loading = true;
        this.authService.login(this.model.email, this.model.pwd)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        if (response.data.token) {
                            localStorage.setItem('id_token', response.data.token);
                            this.router.navigate(['/']);
                        }
                    }
                    else {
                        this.alertService.error(response.message);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
