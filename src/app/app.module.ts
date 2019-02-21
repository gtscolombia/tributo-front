import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import {HttpClientModule} from '@angular/common/http';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true               
};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { DirectivesModule } from './theme/directives/directives.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GuardarConfirmacionComponent } from './modals/guardar-confirmacion/guardar-confirmacion.component';
import { SeleccionarPeriodoComponent } from './modals/seleccionar-periodo/seleccionar-periodo.component';
import { TributoComponent } from './pages/tributo/tributo.component';

import { FormioModule, FormioAppConfig } from 'angular-formio';
import { FormioGrid } from 'angular-formio/grid';
import { FormioResources } from 'angular-formio/resource';

import { DeclararModule } from './pages/declarar/declarar.module';
import { EstadoCuentaComponent } from './pages/estado-cuenta/estado-cuenta.component';
import { LOCALE_ID } from '@angular/core';
import localeEsCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import {ChartModule} from 'primeng/chart';
import { InfoDetailsComponent } from './modals/info-details/info-details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {CarouselModule} from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
import {AccordionModule} from 'primeng/accordion';

import {CurrencyPipe} from '@angular/common'

registerLocaleData(localeEsCo);


@NgModule({
  imports: [
   
    ChartModule,
    BrowserModule,
    BrowserAnimationsModule,     
    FormsModule, 
    HttpClientModule,
    FormioModule,
    FormioGrid,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0'
    }), 
    PerfectScrollbarModule, 
    CalendarModule.forRoot(),
    SharedModule,
    PipesModule,
    routing,
    DirectivesModule,
    AngularFontAwesomeModule,
    NgxChartsModule,
    CarouselModule,
    ToastModule,
    AccordionModule,
    
    
    

    
   

    

    
  ],
  declarations: [
    AppComponent,
    PagesComponent,
  
    NotFoundComponent,
    ErrorComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    FullScreenComponent,
    MessagesComponent,
    UserMenuComponent,
    GuardarConfirmacionComponent,
    SeleccionarPeriodoComponent,
    EstadoCuentaComponent,
    InfoDetailsComponent,
    

    
    
  ],
  entryComponents:[
    VerticalMenuComponent,
    GuardarConfirmacionComponent,
    SeleccionarPeriodoComponent,
    InfoDetailsComponent,
    

    
  ],
  providers: [ 
    CurrencyPipe,
    AppSettings,
    FormioResources,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    { provide: LOCALE_ID, useValue: "es-CO" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }