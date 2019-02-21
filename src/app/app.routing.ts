import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { PerfilComponent } from './pages/mi-cuenta/perfil/perfil.component';
import { AuthGuardService } from './pages/login/services/auth-guard.service';
import { TributoComponent } from './pages/tributo/tributo.component';
import { EstadoCuentaComponent } from './pages/estado-cuenta/estado-cuenta.component';

export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'mi-cuenta', loadChildren: './pages/mi-cuenta/mi-cuenta.module#MiCuentaModule', data: { breadcrumb: 'Mi cuenta' } },
            { path: 'declarar', loadChildren: './pages/declarar/declarar.module#DeclararModule', data: { breadcrumb: 'Declarar' } },
            { path: 'estado-cuenta', component: EstadoCuentaComponent}
        ], canActivate: [AuthGuardService]
    },
    { path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent },
    

    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});