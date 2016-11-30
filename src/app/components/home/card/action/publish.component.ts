import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService, AlertService } from '../../../../services/index';

@Component({
    templateUrl: 'publish.component.html'
})

export class PublishComponent implements OnInit {
    title: string;
    loading = false;
    model: any = {};
    params: any = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cardService: CardService,
        private alertService: AlertService
    ) {
        this.title = route.snapshot.data['name'];
        route.params.subscribe(params => this.params = params);
    }

    ngOnInit() {

    }

    onSubmit() {
        this.loading = true;
        this.model['id_card'] = parseInt(this.params['id']);
        this.cardService.publishCard(this.model)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.router.navigate(['/card/list/published']);
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