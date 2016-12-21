import { Injectable } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
declare var $: any;

@Injectable()
export class HttpClient {
    apiUrl: string;

    constructor(
        private http: AuthHttp
    ) {
        this.apiUrl = process.env.apiUrl;
    }

    get(url: string, options?: RequestOptionsArgs) {
        $('.loader').addClass('is-active');
        return this.http.get(this.apiUrl + url, options).map((response: Response) => {
            $('.loader').removeClass('is-active');
            return response.json();
        });
    }

    post(url: string, data?: any, options?: RequestOptionsArgs) {
        $('.loader').addClass('is-active');
        return this.http.post(this.apiUrl + url, data, options).map((response: Response) => {
            $('.loader').removeClass('is-active');
            return response.json();
        });
    }

    put(url: string, data?: any, options?: RequestOptionsArgs) {
        $('.loader').addClass('is-active');
        return this.http.put(this.apiUrl + url, data, options).map((response: Response) => {
            $('.loader').removeClass('is-active');
            return response.json();
        });
    }

    delete(url: string, options?: RequestOptionsArgs) {
        $('.loader').addClass('is-active');
        return this.http.delete(this.apiUrl + url, options).map((response: Response) => {
            $('.loader').removeClass('is-active');
            return response.json();
        });
    }

    patch(url: string, data?: any, options?: RequestOptionsArgs) {
        $('.loader').addClass('is-active');
        return this.http.patch(this.apiUrl + url, data, options).map((response: Response) => {
            $('.loader').removeClass('is-active');
            return response.json();
        });
    }
}