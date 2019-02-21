import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { PerfilComponent } from './perfil/perfil.component';
import { DatosComponent } from './datos/datos.component';
import { DirectivesModule } from '../../theme/directives/directives.module';


export const routes = [
  { path: '', redirectTo: 'perfil', pathMatch: 'full'},
  { path: 'perfil', component: PerfilComponent, data: { breadcrumb: 'Perfil' } },
  { path: 'datos', component: DatosComponent, data: { breadcrumb: 'Datos' } },
  

  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    DirectivesModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    PerfilComponent,
    DatosComponent
  ],
  entryComponents: [
   
  ]
})
export class MiCuentaModule { }
