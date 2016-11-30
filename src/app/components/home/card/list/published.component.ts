import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../../services/index';

@Component({
    templateUrl: 'published.component.html'
})

export class PublishedComponent implements OnInit {
    title: string;
    p: number = 1;
    total: number;

    cards: any = [];

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService
    ) {
        this.title = route.snapshot.data['name'];
    }

    ngOnInit() {
        this.loadList(1);
    }

    loadList(page: number) {
        return this.cardService.getListPublished(page).subscribe(response => {
            this.total = response.total;
            this.p = response.page_num;
            this.cards = response.data;
        });
    }
}