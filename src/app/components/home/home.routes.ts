import { Route } from '@angular/router';
import { AuthGuard } from '../../_guards/index';
import { HomeComponent } from './index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CardRoutes } from './card/index';
import { ContactRoutes } from './contact/index';

export const HomeRoutes: Route[] = [
  	{
    	path: '',
    	component: HomeComponent,
    	children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent, data: { name: 'Dashboard' } },
			{ path: 'profile', component: ProfileComponent, data: { name: 'Profile' } },
			...CardRoutes,
			...ContactRoutes
    	],
		canActivate: [ AuthGuard ]
  	}
];