import { Route } from '@angular/router';
import { CardComponent } from './index';
import { ListComponent, PublishedComponent, ReceivedComponent } from './list/index';
import { GenerateComponent, TemplateComponent, CreateComponent } from './generate/index';
import { DetailComponent, EditComponent, PublishComponent, SendComponent } from './action/index';

export const CardRoutes: Route[] = [
    {
        path: 'card',
        component: CardComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListComponent, data: { name: 'Card List' } },
            { path: 'list/published', component: PublishedComponent, data: { name: 'Card Published' } },
            { path: 'list/received', component: ReceivedComponent, data: { name: 'Card Received' } },
            { path: 'detail/:id', component: DetailComponent, data: { name: 'Card Detail' } },
            { path: 'generate', component: GenerateComponent, data: { name: 'Card Generate' } },
            { path: 'generate/:id', component: TemplateComponent, data: { name: 'Generate Template' } },
            { path: 'generate/create/:type', component: CreateComponent, data: { name: 'Card Create' } },
            { path: 'edit/:id', component: EditComponent, data: { name: 'Card Edit' } },
            { path: 'publish/:id', component: PublishComponent, data: { name: 'Card Publish' } },
            { path: 'send/:id', component: SendComponent, data: { name: 'Card Send' } }
        ]
    }
];