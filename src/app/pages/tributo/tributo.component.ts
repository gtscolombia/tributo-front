import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRestService } from '../../api-rest.service'
import { MatSnackBar } from '@angular/material';
import { usuTributo } from './usu_tributo';
import { Settings } from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import { GuardarConfirmacionComponent } from '../../modals/guardar-confirmacion/guardar-confirmacion.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {CurrencyPipe} from '@angular/common'

@Component({
  selector: 'app-tributo',
  templateUrl: './tributo.component.html',
  styleUrls: ['./tributo.component.scss']
})
export class TributoComponent implements OnInit {
  public settings: Settings;
  public idusuario: any;
  public formulario: any = '';
  public old_formulario: any = '';
  public refreshForm: any;
  public periodo;
  public idEnTributo: any;

  public idtributo;

  public entidadTitle;
  public title;

  public dialogref;

  public tributo;

  public tipo;
  public sub;


  public Tributo;
  public datos;

  public tasa;
  public valor_a_pagar;

  constructor(
    public appSettings: AppSettings,
    private router: Router,
    private route: ActivatedRoute,
    private servicio: ApiRestService,
    public mensaje: MatSnackBar,
    public dialog: MatDialog,
    private cp: CurrencyPipe

  ) {
    this.settings = this.appSettings.settings;
    this.sub = this.route.params.subscribe(params => {


      if (params['identributo'] && params['periodo']) {
        this.tipo = 'DECLARAR';
        this.periodo = params['periodo'];
        this.idEnTributo = params['identributo'];

      } else {
        if (params['identtributo']) {
          this.tipo = 'REVISAR';
          this.idEnTributo = params['identtributo'];
        }
      }


    });

  }

  ngOnInit() {
    this.refreshForm = new EventEmitter();
    if (this.tipo == 'DECLARAR') {
      console.log(this.tipo);
      this.getDeclararTributo();
    }
    if (this.tipo == 'REVISAR') {
      this.getRevisarTributo();
      console.log(this.tipo);

    }


  }


  getRevisarTributo() {
    this.settings.loadingSpinner = true;
    this.servicio.get('frusutributo/id/'.concat(this.idEnTributo)).subscribe(
      //traer entidad tributo por id, y de ahí sacar el tributo)
      result => {
        console.log(result);
        this.tasa = result.identtributo.parametroTributo;
        this.settings.loadingSpinner = false;
        console.log(result.datos)
        this.idtributo = result;
        this.tributo = result.identtributo.idtributo;
        this.idEnTributo = result.identtributo;
        this.formulario = JSON.parse(this.tributo.esquema);
        this.old_formulario = JSON.parse(this.tributo.esquema);
        this.datos = { data: JSON.parse(result['datos']) };
        this.entidadTitle = result.identtributo.identidad.nombre;
        this.title = result.identtributo.idtributo.nombre;
        this.setButton('editar');
      }
    );
  }


  enviarFormulario(event) {
    this.valor_a_pagar = (parseInt(event.data['valorDelContrato']) * this.tasa)/100;
    if (event.data.editar == true) {
      this.refreshForm.emit({
        formulario: this.formulario
      });
      event.data.editar = false;
     
      this.guardarTributo('BO', event.data);
      //event.data.presentar = false;
    } else {
      if (event.data.declarar == true) {
        this.refreshForm.emit({
          formulario: this.formulario
        });
        event.data.declarar = false;
        this.guardarTributo('BO', event.data);
        //event.data.declarar = false;
      }
    }
  }

goback(){
  if(this.datos == null){
    this.router.navigate(['/']);
  }else{
    this.router.navigate(['/estado-cuenta']);
  }
}
  guardarTributo(estado, data) {
    this.settings.loadingSpinner = true;
    this.servicio.get('frusuarios/email/'.concat(localStorage.getItem('current_user'))).subscribe(
      result => {
        this.settings.loadingSpinner = false;
        this.idusuario = result[0].id;
        if (estado == 'BO') {
          let body;
          switch (this.tipo) {
            case 'REVISAR':
              body = new usuTributo(this.idusuario, this.idtributo.fechacrea, this.idEnTributo, estado, this.tributo, JSON.stringify(this.old_formulario, null, 4), this.periodo, JSON.stringify(data, null, 4), this.valor_a_pagar, this.idtributo.id, new Date());
              this.dialogref = this.dialog.open(GuardarConfirmacionComponent, {
                width: '250px', data: { response: null, title: 'Editar tributo', message: '¿Está seguro de editar el borrador ' + this.idtributo.identtributo.idtributo.nombre + '?', note: 'Valor estampilla: ' +  this.cp.transform(this.valor_a_pagar, 'COP') }
              });
              break;
            case 'DECLARAR':
              body = new usuTributo(this.idusuario, '', this.idEnTributo, estado, this.tributo, JSON.stringify(this.old_formulario, null, 4), this.periodo, JSON.stringify(data, null, 4), this.valor_a_pagar);
              this.dialogref = this.dialog.open(GuardarConfirmacionComponent, {
                width: '250px', data: { response: null, title: 'Crear tributo', message: '¿Está seguro de crear borrador?',note: 'Valor estampilla: ' +  this.cp.transform(this.valor_a_pagar, 'COP') }
              });
              break;
          }

          this.dialogref.afterClosed().subscribe(result => {
            if (result.response == true) {
              this.settings.loadingSpinner = true;

              this.servicio.post('frusutributo/save', body).subscribe(
                result => {
                  this.settings.loadingSpinner = false;
                  this.mensaje.open('Borrador guardado exitosamente', 'Ok', {
                    duration: 2000,
                  });
                  this.router.navigate(['/']);
                },
                error => {
                  this.settings.loadingSpinner = false;
                  this.mensaje.open('Error : ' + error.message, 'Ok', {
                    duration: 2000,
                  });
                }
              );
            }
          });
        }
      })
  }




  getDeclararTributo() {
    this.settings.loadingSpinner = true;
    this.servicio.get('bcenttributos/id/'.concat(this.idEnTributo)).subscribe(
      result => {
        this.tasa = result[0].parametroTributo;

        this.servicio.get('frusuarios/email/'.concat(localStorage.getItem('current_user'))).subscribe(
          result2 =>{
            let data : any = {data : {}};
            data.data.numeroDocumento = result2[0].identificacion;
            data.data.nombreCompleto = result2[0].nombrecompleto;
            // data: { "name": 'Gautam', "address": 'India' }
            //let strin = '{data:{"numeroDocumento": "'+result[0].email+'" , "nombreCompleto":"'+result[0].identificacion+'"}}';
            console.log("TASA-- : "+this.tasa);
             this.datos = data; 
             console.log(this.datos);
             this.settings.loadingSpinner = false;
        this.idEnTributo = result[0];
        console.log(result);
        this.entidadTitle = result[0].identidad.nombre;
        this.tributo = result[0].idtributo;
        this.title = result[0].idtributo.nombre;
        this.formulario = JSON.parse(this.tributo.esquema);
        this.old_formulario = JSON.parse(this.tributo.esquema);
        this.setButton('Declarar');




          }
        );




       

      }
    );
  }



  deleteButton(label: string) {
    for (var i = 0; i < this.formulario.components.length; i++) {
      if (this.formulario.components[i].key == label) {
        console.log(this.formulario.components[i].key);
        console.log(this.formulario.components[i]);
        this.formulario.components.pop;
      }
    }
    this.refreshForm.emit({
      form: this.formulario
    });
  }


  setButton(label: string) {
    this.formulario.components.push({
      type: 'button',
      label: label,
      action: 'submit',
      key: label.toLowerCase(),
      input: true,
      theme: 'primary',
      tableView: true,
      showValidations: true,
      disableOnInvalid: true
    });
    this.refreshForm.emit({
      form: this.formulario
    });
  }





}
