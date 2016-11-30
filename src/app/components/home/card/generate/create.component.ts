import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService, AlertService } from '../../../../services/index';
import { Util } from '../../../../_libraries/index';

@Component({
    templateUrl: 'create.component.html'
})

export class CreateComponent implements OnInit {
    title: string;
    params: any = [];
    loading = false;
    model: any = {};
    image: any = [];
    data: any = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cardService: CardService,
        private alertService: AlertService,
        private util: Util
    ) {
        this.title = route.snapshot.data['name'];
        route.params.subscribe(params => this.params = params);
    }

    ngOnInit() {
        this.image.front = localStorage.getItem('image_front');
        this.image.back = localStorage.getItem('image_back');
        this.loadFields();
    }

    loadFields() {
        return this.cardService.getCreateFields(this.params['type']).subscribe(response => this.data = response.data.data);
    }

    onSubmit() {
        this.loading = true;
        this.model['card_type'] = parseInt(this.params['type']);
        this.model['hinh_mat_truoc'] = this.image.front;
        this.model['hinh_mat_sau'] = this.image.back;
        let formData = new FormData();
        for (let key in this.model) {
            if (key == 'hinh_mat_truoc' || key == 'hinh_mat_sau') {
                formData.append(key, this.util.dataURItoBlob(this.model[key]));
            }
            else formData.append(key, this.model[key]);
        }
        this.cardService.createCard(formData)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.router.navigate(['/card/list']);
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