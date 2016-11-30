import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardService, AlertService } from '../../../../services/index';

@Component({
    templateUrl: 'send.component.html'
})

export class SendComponent implements OnInit {
    title: string;
    params: any = [];
    loading = false;
    model: any = {};
    data: any = [];

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
        this.loadDetail();
    }

    loadDetail() {
        return this.cardService.getDetail(this.params['id']).subscribe(response => this.data = response.data);
    }

    onSubmit() {
        this.loading = true;
        this.model['id_card'] = this.params['id'];
        this.cardService.sendCard(this.model)
            .subscribe(
                response => {
                    if (response.code === 200) {
                        this.alertService.success(response.message);
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
}