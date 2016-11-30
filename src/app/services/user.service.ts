import { Injectable } from '@angular/core';
import { HttpClient } from '../_libraries/http.client';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getProfile() {
        return this.http.post('/account/profile_info');
    }
}