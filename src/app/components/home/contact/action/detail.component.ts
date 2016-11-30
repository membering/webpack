import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService, AlertService } from '../../../../services/index';
import { Util } from '../../../../_libraries/index';

@Component({
    templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {
    title: string;
    params: any = [];
    loading = false;
    model: any = {};
    data: any = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private contactService: ContactService,
        private alertService: AlertService,
        private util: Util
    ) {
        this.title = route.snapshot.data['name'];
        route.params.subscribe(params => this.params = params);
    }

    ngOnInit() {
        this.loadDetail();
    }

    loadDetail() {
        return this.contactService.getDetail(this.params['id']).subscribe(response => {
            if (response.data.photo != null && response.data.photo.indexOf('http') < 0) {
                response.data.photo = 'http://static2.fastcard.vn/customer/' + response.data.photo;
            }
            this.data = response.data;
        });
    }

    fileChange(event) {
        var reader = new FileReader();
        reader.onload = () => {
            this.data.photo = reader.result;
            this.model.photo = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    onSubmit() {
        this.loading = true;
        this.model['id'] = this.params['id'];
        let formData = new FormData();
        for (let key in this.model) {
            if (key == 'photo') {
                formData.append(key, this.util.dataURItoBlob(this.model[key]));
            }
            else formData.append(key, this.model[key]);
        }
        this.contactService.editContact(formData)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.alertService.success(response.message);
                        this.loading = false;
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