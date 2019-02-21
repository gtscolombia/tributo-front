import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { ApiRestService } from '../../api-rest.service';
import { Tributo } from './tributo-view';
import { GuardarConfirmacionComponent } from '../../modals/guardar-confirmacion/guardar-confirmacion.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { usuTributo } from '../tributo/usu_tributo';
import {ChartModule} from 'primeng/chart';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { InfoDetailsComponent } from '../../modals/info-details/info-details.component';




@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.scss']
})
export class EstadoCuentaComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public datos;
  private userid;
  public settings: Settings;
  public sidenavOpen: boolean = true;
  public tributos: Tributo[] = [];
  public tributo: any;
  public newMail: boolean;
  public type: string = 'todos';
  public searchText: string;
  public form: FormGroup;
  public data_ubicacion: any;
  public data_estado: any;

  constructor(
    private info: MatBottomSheet,
    public router: Router,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private servicio: ApiRestService) {

      this.data_ubicacion = {
        labels: ['Manizales', 'Atlantico', 'Distracción'],
        datasets: [
            {
                label: '2018',
                backgroundColor: '#1b81d7',
                borderColor: '#1b81d7',
                data: [3000000, 590000, 8000000]
            },
            {
                label: '2019',
                backgroundColor: '#2bbfeb',
                borderColor: '#2bbfeb',
                data: [280000, 480000, 400000]
            }
        ]
    }

    this.data_estado = {
      labels: ['Borradores','Presentados','Liquidados','pagados'],
      datasets: [
          {
              data: [30000000, 50000000, 100500000,542000000],
              backgroundColor: [
                '#1b81d7',
                '#2bbfeb',
                '#1b81d7',
                '#2bbfeb',


                  
              ],
              hoverBackgroundColor: [
                '#1b81d7',
                '#2bbfeb',
                '#1b81d7',
                '#2bbfeb',
                 
              ]
          }]    
      };



    this.settings = this.appSettings.settings;
  }



  ver(event){
      console.log(event.element._model);
      this.info.open(InfoDetailsComponent,{ data: { names: event.element._model}});
  }


  ngOnInit() {
    this.settings.loadingSpinner = true;
    this.servicio.get('frusuarios/email/'.concat(localStorage.getItem('current_user'))).subscribe(
      result => {
        this.settings.loadingSpinner = false;
        this.userid = result[0].id;
        this.getTributos();
      },
      error => {
        this.settings.loadingSpinner = false;
        console.log(error);
      }
    );
    if (window.innerWidth <= 992) {
      this.sidenavOpen = false;
    }
  }

  getDatos() {
    let esquema = '';
    for (var p in this.tributo.datos) {
      if (this.tributo.datos.hasOwnProperty(p)) {
        if (this.tributo.datos[p] == '{' || this.tributo.datos[p] == '}' || this.tributo.datos[p] == '"') continue;
        esquema += this.tributo.datos[p];
      }
    }
    this.datos = esquema.split(',');
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }



  editar() {
    console.log(this.tributo.id);
    this.router.navigate(['/declarar/tributo/' + this.tributo.id]);
  }

  presentar() {
    console.log(this.tributo);
    const dialogRef = this.dialog.open(GuardarConfirmacionComponent, {
      width: '250px', data: { response: null, title: 'Presentar tributo', message: '¿Está seguro de presentar el tributo ' + this.tributo.identtributo.idtributo.nombre + '?', note: 'Recuerde que esto no le permitira eliminar ni editar el tributo' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.response == true) {
        console.log(this.tributo.id);
        this.tributo.estado = 'PR';
        this.tributo.fechapresentacion = new Date();
        this.settings.loadingSpinner = true;
        this.servicio.post('frusutributo/save', this.tributo).subscribe(
          result => {
            this.settings.loadingSpinner = false;
            this.type = 'todos';
            let temp = this.tributo;

            console.log(result)
          },
          error => {
            this.settings.loadingSpinner = false;
            console.log(error);
          }
        )
      }
    });
  }

  liquidar() {
    console.log(this.tributo);
    const dialogRef = this.dialog.open(GuardarConfirmacionComponent, {
      width: '250px', data: { response: null, title: 'Liquidar tributo', message: '¿Está seguro de liquidar el tributo ' + this.tributo.identtributo.idtributo.nombre + '?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.response == true) {
        console.log(this.tributo.id);
        this.tributo.estado = 'LI';
        this.tributo.fechaliquidacion = new Date();
        this.settings.loadingSpinner = true;
        this.servicio.post('frusutributo/save', this.tributo).subscribe(
          result => {
            this.settings.loadingSpinner = false;
            this.type = 'todos';
            let temp = this.tributo;


            console.log(result)
          },
          error => {
            this.settings.loadingSpinner = false;
            console.log(error);
          }
        )
      }
    });





  }





  public getTributos() {
    switch (this.type) {
      case 'todos':
        this.getTributosPorEstados('0');
        break;
      case 'borradores':
        this.getTributosPorEstados('BO');
        break;
      case 'presentados':
        this.getTributosPorEstados('PR');
        break;
      case 'liquidados':
        this.getTributosPorEstados('LI');
        break;
      case 'eliminados':
        this.getTributosPorEstados('EL');
        break;
    }
  }

  delete() {
    const dialogRef = this.dialog.open(GuardarConfirmacionComponent, {
      width: '250px', data: {
        response: null
        , title: 'Eliminar tributo', message: '¿Está seguro de ELIMINAR el tributo ' + this.tributo.identtributo.idtributo.nombre + '?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.response == true) {
        console.log(this.tributo.id);
        this.tributo.estado = 'EL';
        this.tributo.fechapresentacion = null;
        this.settings.loadingSpinner = true;
        this.tributo.fechapresentacion = null;
        this.tributo.fechaanulado = new Date();
        this.servicio.post('frusutributo/save', this.tributo).subscribe(
          result => {
            this.settings.loadingSpinner = false;
            this.type = 'eliminados';

            console.log(result)
          },
          error => {
            this.settings.loadingSpinner = false;
            console.log(error);
          }
        )
      }
    });





  }

  getTributosPorEstados(estado: string) {
    this.settings.loadingSpinner = true;
    this.servicio.get('frusutributo/filter/'.concat(this.userid) + '/' + 0 + '/' + 0 + '/'.concat(estado)).subscribe(
      result => {
        console.log(result);
        console.log(this.userid);
        this.tributos = result;
        console.log(this.tributos)
        this.settings.loadingSpinner = false;
      },
      error => {
        console.log(error);
        this.settings.loadingSpinner = false;
      }
    );

  }




  public viewDetail(tributo) {
    this.tributo = tributo;
    this.tributos.forEach(m => m.selected = false);
    this.tributo.selected = true;
    this.getDatos();
    if (window.innerWidth <= 992) {
      this.sidenav.close();
    }
  }





  public onSubmit(mail) {
    console.log(mail)
    if (this.form.valid) {
      this.snackBar.open('Mail sent to ' + mail.to + ' successfully!', null, {
        duration: 2000,
      });
      this.form.reset();
    }
  }

}
