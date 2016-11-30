import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../../services/index';

@Component({
    templateUrl: 'generate.component.html'
})

export class GenerateComponent implements OnInit {
    title: string;
    types: any = [];
    data: any = [];

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService
    ) {
        this.title = route.snapshot.data['name'];
    }

    ngOnInit() {
        this.loadTypes();
    }

    loadTypes() {
        return this.cardService.getTypes().subscribe(response => this.types = response.data.data);
    }

    selectType(value) {
        return this.cardService.getListTemplates(value).subscribe(response => this.data = response.data);
    }
}