import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService, AlertService } from '../../../../services/index';
declare var $:any;

@Component({
    templateUrl: 'received.component.html'
})

export class ReceivedComponent implements OnInit {
    title: string;
    loading_accept = false;
    loading_cancel = false;
    p: number = 1;
    total: number;

    cards: any = [];

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService,
        private alertService: AlertService
    ) {
        this.title = route.snapshot.data['name'];
    }

    ngOnInit() {
        this.loadList(1);
    }

    loadList(page: number) {
        return this.cardService.getListReceived(page).subscribe(response => {
            this.total = response.total;
            this.p = response.page_num;
            this.cards = response.data;
        });
    }

    accept(id) {
        this.cardService.acceptCard(id)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.alertService.success(response.message);
                        $('#'+id).fadeOut('slow');
                    }
                    else {
                        this.alertService.error(response.message);
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    cancel(id) {
        this.cardService.cancelCard(id)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.alertService.success(response.message);
                        $('#'+id).fadeOut('slow');
                    }
                    else {
                        this.alertService.error(response.message);
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }
}