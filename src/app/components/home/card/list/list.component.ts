import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../../services/index';

@Component({
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {
    title: string;
    p: number = 1;
    total: number;
    card_type: number;

    cards: any = [];
    types: any = [];

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService
    ) {
        this.title = route.snapshot.data['name'];
    }

    ngOnInit() {
        this.loadList(1);
        this.loadTypes();
    }

    loadList(page: number, type: number = null) {
        return this.cardService.getList(page, type).subscribe(response => {
            this.total = response.total;
            this.p = response.page_num;
            this.cards = response.data;
        });
    }

    loadTypes() {
        return this.cardService.getTypes().subscribe(response => this.types = response.data.data);
    }

    selectType(value) {
        this.card_type = value;
        return this.cardService.getList(this.p, this.card_type).subscribe(response => {
            this.total = response.total;
            this.p = response.page_num;
            this.cards = response.data
        });
    }
}