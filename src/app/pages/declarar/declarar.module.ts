import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill'
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { EntidadesComponent } from './entidades/entidades.component';
import { TributosComponent } from './tributos/tributos.component';
import { TributoComponent } from '../tributo/tributo.component'
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { ModalInfoComponent } from '../../modals/modal-info/modal-info.component'



export const routes = [
  { path: '', redirectTo: 'entidades', pathMatch: 'full'},
  { path: 'entidades', component: EntidadesComponent, data: { breadcrumb: 'Entidades' } },
  { path: 'tributos/:identidad', component: TributosComponent, data: { breadcrumb: 'Tributos' } },
  { path: 'tributo/:identributo/:periodo', component: TributoComponent},
  { path: 'tributo/:identtributo', component: TributoComponent},

];




@NgModule({
  declarations: [
    EntidadesComponent,
    TributosComponent,
    TributoComponent,
    ModalInfoComponent
    
  ],
  entryComponents: [
    ModalInfoComponent  
  ],
  providers:[
    FormioAppConfig
  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    QuillModule,
    SharedModule,
    PipesModule,
    FormioModule
  ]
})
export class DeclararModule { }
