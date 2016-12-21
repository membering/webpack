import { Injectable } from '@angular/core';
import { HttpClient } from '../_libraries/http.client';

@Injectable()
export class CardService {
    constructor(private http: HttpClient) { }

    getProfile() {
        return this.http.post('/supplier/profile');
    }

    editProfile(params: any) {
        return this.http.post('/supplier/profile/save', params);
    }

    getList(page: any, type: any = null) {
        return this.http.post('/supplier/card/list', {page: page, card_type: type, no_cache: 1});
    }

    getListPublished(page: any) {
        return this.http.post('/supplier/publish/list', {page: page, no_cache: 1});
    }

    getListReceived(page: any) {
        return this.http.post('/supplier/card/received_list', {page: page, no_cache: 1});
    }

    getDetail(id: any) {
        return this.http.post('/supplier/card/view_edit', {id_card: id});
    }

    getTypes() {
        return this.http.post('/app/card_types');
    }

    getListTemplates(type: any) {
        return this.http.post('/template/list', {card_type: type});
    }

    getTemplate(id: any) {
        return this.http.post('/template/view', {id: id});
    }

    getCreateFields(type: any) {
        return this.http.post('/app/fields_create_card', {card_type: type});
    }

    getEditFields(id: any) {
        return this.http.post('/supplier/card/view_edit', {id_card: id});
    }

    createCard(params: any) {
        return this.http.post('/supplier/card/create', params);
    }

    editCard(params: any) {
        return this.http.post('/supplier/card/save_edit', params);
    }

    publishCard(params: any) {
        return this.http.post('/supplier/card/publish_external', params);
    }

    sendCard(params: any) {
        return this.http.post('/supplier/card/send', params);
    }

    acceptCard(id: any) {
        return this.http.post('/supplier/card/receive', {instance_id: id});
    }

    cancelCard(id: any) {
        return this.http.post('/supplier/card/receive', {instance_id: id});
    }

    getCategories() {
        return this.http.post('/card/categories_list');
    }

    getCities() {
        return this.http.post('/app/cities');
    }

    getDistricts() {
        return this.http.post('/app/districts');
    }
}