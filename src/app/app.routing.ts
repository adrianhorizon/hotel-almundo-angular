// definir las rutas de la app
import { Routes, RouterModule } from '@angular/router';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { Page404Component } from './page404/page404.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HOTELS_ROUTES } from './hotels/hotels.routing';

const APP_ROUTES = [
    { path: '', component: PrincipalPageComponent, pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'hotelsNew', children: HOTELS_ROUTES },
    { path: '**', component: Page404Component }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
