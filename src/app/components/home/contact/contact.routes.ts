import { Route } from '@angular/router';
import { ContactComponent } from './index';
import { ListComponent } from './list/index';
import { DetailComponent, CreateComponent } from './action/index';

export const ContactRoutes: Route[] = [
    {
        path: 'contact',
        component: ContactComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'create', component: CreateComponent, data: { name: 'Create Contact' } },
            { path: 'list', component: ListComponent, data: { name: 'Contact List' } },
            { path: 'detail/:id', component: DetailComponent, data: { name: 'Contact Detail' } },
        ]
    }
];