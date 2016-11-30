import { Injectable } from '@angular/core';
import { HttpClient } from '../_libraries/http.client';

@Injectable()
export class CardService {
    constructor(private http: HttpClient) { }

    getProfile() {
        return this.http.post('/supplier/profile');
    }

    editProfile(params) {
        return this.http.post('/supplier/profile/save', params);
    }

    getList(page, type = null) {
        return this.http.post('/supplier/card/list', {page: page, card_type: type, no_cache: 1});
    }

    getListPublished(page) {
        return this.http.post('/supplier/publish/list', {page: page, no_cache: 1});
    }

    getListReceived(page) {
        return this.http.post('/supplier/card/received_list', {page: page, no_cache: 1});
    }

    getDetail(id) {
        return this.http.post('/supplier/card/detail', {card_id: id});
    }

    getTypes() {
        return this.http.post('/app/card_types');
    }

    getListTemplates(type) {
        return this.http.post('/template/list', {card_type: type});
    }

    getTemplate(id) {
        return this.http.post('/template/view', {id: id});
    }

    getCreateFields(type) {
        return this.http.post('/app/fields_create_card', {card_type: type});
    }

    getEditFields(id) {
        return this.http.post('/supplier/card/view_edit', {id_card: id});
    }

    createCard(params) {
        return this.http.post('/supplier/card/create', params);
    }

    editCard(params) {
        return this.http.post('/supplier/card/save_edit', params);
    }

    publishCard(params) {
        return this.http.post('/supplier/card/publish_external', params);
    }

    sendCard(params) {
        return this.http.post('/supplier/card/send', params);
    }

    acceptCard(id) {
        return this.http.post('/supplier/card/receive', {instance_id: id});
    }

    cancelCard(id) {
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