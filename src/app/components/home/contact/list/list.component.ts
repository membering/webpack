import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../../services/index';

@Component({
    templateUrl: 'list.component.html'
})

export class ListComponent implements OnInit {
    title: string;
    p: number = 1;
    total: number;

    data: any = [];

    constructor(
        private route: ActivatedRoute,
        private contactService: ContactService
    ) {
        this.title = route.snapshot.data['name'];
    }

    ngOnInit() {
        this.loadList(1);
    }

    loadList(page: number) {
        return this.contactService.getList(page).subscribe(response => {
            this.total = response.total;
            this.p = response.page_num;
            this.data = response.data;
        });
    }
}