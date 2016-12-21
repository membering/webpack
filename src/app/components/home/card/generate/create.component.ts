import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService, AlertService } from '../../../../services/index';
import { Util } from '../../../../_libraries/index';

@Component({
    templateUrl: 'create.component.html'
})

export class CreateComponent implements OnInit {
    form: FormGroup;
    title: string;
    params: any = [];
    loading = false;
    submitted = false;
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
        this.form = new FormGroup({});
    }

    ngOnInit() {
        this.image.front = localStorage.getItem('image_front');
        this.image.back = localStorage.getItem('image_back');
        this.loadFields();
        console.log(this.form);
    }

    loadFields() {
        return this.cardService.getCreateFields(this.params['type']).subscribe(response => {
            this.data = response.data.data;
            response.data.data.forEach((value: any) => {
                value.group_fields.forEach((v: any) => {
                    if (v.field_type != 'group') {
                        this.form.registerControl(v.field_id, new FormControl('', Validators.required));
                    }
                });
            });
        });
    }

    onSubmit() {
        this.submitted = true;
        this.form.patchValue({
            'hinh_mat_truoc': this.image.front,
            'hinh_mat_sau': this.image.back
        });
        if (this.form.valid) {
            this.loading = true;
            let formData = new FormData();
            for (let key in this.form.value) {
                if (key == 'hinh_mat_truoc' || key == 'hinh_mat_sau' || key == 'hinh_person') {
                    formData.append(key, this.util.dataURItoBlob(this.form.value[key]));
                }
                else formData.append(key, this.form.value[key]);
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

    fileChange(event: any) {
        var reader = new FileReader();
        reader.onload = () => {
            this.form.setControl(event.target.id, new FormControl(reader.result, Validators.required));
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}