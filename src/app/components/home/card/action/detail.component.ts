import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../../services/index';

@Component({
    templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {
    title: string;
    params: any = [];
    model: any = {};
    image: any = [];
    data: any = [];
    dataCommon: any = [];

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService
    ) {
        this.title = route.snapshot.data['name'];
        route.params.subscribe(params => this.params = params);
    }

    ngOnInit() {
        this.loadDetail();
    }

    loadDetail() {
        return this.cardService.getEditFields(this.params['id']).subscribe(response => {
            this.image.front = response.data[0].group_fields[0].value;
            this.image.back = response.data[0].group_fields[1].value;
            response.data[0].group_fields.forEach((value: any) => {
                if (value.field_type == 'datetime') {
                    value.value = value.value.substr(0, 19);
                }
            })
            this.data = response.data;
            this.dataCommon = response.dataCommon;
        });
    }
}