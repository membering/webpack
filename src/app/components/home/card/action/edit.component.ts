import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService, AlertService } from '../../../../services/index';
import { Util } from '../../../../_libraries/index';
declare var $: any;

@Component({
    templateUrl: 'edit.component.html'
})

export class EditComponent implements OnInit {
    form: FormGroup;
    title: string;
    params: any = [];
    loading = false;
    change = false;
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
        this.loadFields();
        $('input[type=datetime]').datetimepicker();
    }

    loadFields() {
        return this.cardService.getEditFields(this.params['id']).subscribe(response => {
            this.image.front = response.data[0].group_fields[0].value;
            this.image.back = response.data[0].group_fields[1].value;
            this.data = response.data;
            response.data.forEach((value: any) => {
                value.group_fields.forEach((v: any) => {
                    if (v.field_type == 'datetime') {
                        v.value = v.value.substr(0, 19);
                    }
                    if (v.field_id != 'hinh_mat_truoc' && v.field_id != 'hinh_mat_sau' && v.field_type != 'group') {
                        this.form.registerControl(v.field_id, new FormControl(v.value, Validators.required));
                    }
                });
            });
            this.form.addControl('card_type', new FormControl(response.dataCommon.card_type));
            this.form.addControl('id_card', new FormControl(this.params['id']));
        });
    }

    onSubmit() {
        this.loading = true;
        let formData = new FormData();
        for (let key in this.form.value) {
            if (key == 'hinh_person' && this.change) formData.append(key, this.util.dataURItoBlob(this.form.value[key]));
            else formData.append(key, this.form.value[key]);
        }
        this.cardService.editCard(formData)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.router.navigate(['/card/detail/' + this.params['id']]);
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

    fileChange(event: any) {
        var reader = new FileReader();
        reader.onload = () => {
            this.form.setControl(event.target.id, new FormControl(reader.result, Validators.required));
            this.change = true;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}