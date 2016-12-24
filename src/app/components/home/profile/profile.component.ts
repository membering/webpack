import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CardService, AlertService } from '../../../services/index';
import { Util } from '../../../_libraries/index';

@Component({
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    form: FormGroup;
    title: string;
    params: any = [];
    loading = false;
    data: any = [];
    categories: any = [];
    cities: any = [];
    districts: any = [];

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService,
        private alertService: AlertService,
        private util: Util,
        private _fb: FormBuilder
    ) {
        this.title = route.snapshot.data['name'];
        route.params.subscribe(params => this.params = params);
        this.form = this._fb.group({
            name: '',
            phone: '',
            web: '',
            openingtime: '',
            bio: '',
            field: '',
            avatar: '',
            address: this._fb.array([
                this.initAddress()
            ])
        });
    }

    ngOnInit() {
        this.loadProfile();
        this.loadCategories();
        this.loadCities();
        this.loadDistricts();
    }

    fileChange(event: any) {
        var reader = new FileReader();
        reader.onload = () => {
            this.data.supp_avatar = reader.result;
            this.form.patchValue({
                avatar: reader.result
            });
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    initAddress() {
        return this._fb.group({
            address: [],
            city_id: [],
            district_id: []
        });
    }

    addAddress() {
        const control = <FormArray>this.form.controls['address'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.form.controls['address'];
        control.removeAt(i);
    }

    loadProfile() {
        return this.cardService.getProfile().subscribe(response => {
            this.data = response.data;
            this.data.address = JSON.parse(this.data.address);
            this.data.supp_address = JSON.parse(this.data.supp_address);
            this.form.patchValue({
                name: this.data.supp_name,
                phone: this.data.supp_phone,
                web: this.data.supp_web,
                openingtime: this.data.supp_openingtime,
                bio: this.data.supp_bio,
                field: this.data.supp_field
            });
            this.data.address.forEach((v: any, i: any) => {
                (<FormArray>this.form.controls['address']).setControl(i,
                    this._fb.group({
                        address: v.address,
                        city_id: v.city_id,
                        district_id: v.district_id,
                    })
                );
            });
        });
    }

    loadCategories() {
        return this.cardService.getCategories().subscribe(response => this.categories = response.data.data);
    }

    loadCities() {
        return this.cardService.getCities().subscribe(response => this.cities = response.data.data);
    }

    loadDistricts() {
        return this.cardService.getDistricts().subscribe(response => this.districts = response.data.data);
    }

    onSubmit() {
        this.loading = true;
        let formData = new FormData();
        for (let key in this.form.value) {
            if (key == 'address') {
                formData.append(key, JSON.stringify(this.form.value[key]));
            }
            else if (key == 'avatar' && this.form.value[key] != '') {
                formData.append(key, this.util.dataURItoBlob(this.form.value[key]));
            }
            else formData.append(key, this.form.value[key]);
        }
        this.cardService.editProfile(formData)
            .subscribe(
                res => {
                    if (res.code === 200) {
                        this.alertService.success(res.message);
                        this.loading = false;
                    }
                    else {
                        this.alertService.error(res.message);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
}