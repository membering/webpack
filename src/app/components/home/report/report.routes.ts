import { Route } from '@angular/router';
import { ReportComponent } from './index';

export const ReportRoutes: Route[] = [
    {
        path: 'report',
        component: ReportComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            // { path: 'list', component: ListComponent, data: { name: 'Card List' } },
        ]
    }
];