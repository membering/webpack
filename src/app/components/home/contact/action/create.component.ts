import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService, AlertService } from '../../../../services/index';
import { Util } from '../../../../_libraries/index';

@Component({
    templateUrl: 'create.component.html'
})

export class CreateComponent implements OnInit {
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
        this.model.photo = '/assets/images/default_avatar.png';
    }

    fileChange(event) {
        var reader = new FileReader();
        reader.onload = () => {
            this.model.photo = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    onSubmit() {
        this.loading = true;
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
                        this.router.navigate(['/contact/list']);
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