import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    apiUrl: string;

    constructor(
        private http: Http
    ) {
        this.apiUrl = process.env.apiUrl;
    }

    login(email, pwd) {
        return this.http.post(this.apiUrl + '/auth/login', {email: email, pwd: pwd}).map((response: Response) => response.json());
    }

    logout() {
        localStorage.removeItem('id_token');
    }
}