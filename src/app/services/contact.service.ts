import { Injectable } from '@angular/core';
import { HttpClient } from '../_libraries/http.client';

@Injectable()
export class ContactService {
    constructor(private http: HttpClient) { }

    getList(page) {
        return this.http.post('/supplier/contact/list', {page: page, no_cache: 1});
    }

    getDetail(id) {
        return this.http.post('/supplier/contact/view', {id: id});
    }

    editContact(params) {
        return this.http.post('/supplier/contact/save', params);
    }

}