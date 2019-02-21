import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { numberLimits, emailValidator } from '../../../theme/utils/app-validators';
import { MatSnackBar } from '@angular/material';
import { tipo_identificacion } from '../../../models/tipo_identificacion';
import { Municipio } from '../../../models/municipio';
import { Usuario } from '../../../models/usuarios';
import { tipoContribuyente } from '../../../models/tipo_contribuyente';
import { tipoPersona } from '../../../models/tipo_persona';

import { Router } from '@angular/router';
import { DatosService } from './datos.service.service';
import { GuardarConfirmacionComponent } from '../../../modals/guardar-confirmacion/guardar-confirmacion.component';
import { MatDialog } from '@angular/material';
import { MatStepper } from '@angular/material/stepper';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { ApiRestService } from '../../../api-rest.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  public settings: Settings;
  usuario: Usuario;
  datos1: FormGroup;
  datos2: FormGroup;
  datos3: FormGroup;
  datos4: FormGroup;

  constructor(private service: ApiRestService, public appSettings: AppSettings, public router: Router, public dialog: MatDialog, public dialog2: MatDialog, private servicio: DatosService, private _formBuilder: FormBuilder, public verifica_registro: MatSnackBar) { this.settings = this.appSettings.settings; }


  tipo_persona: tipoPersona[] = [
    new tipoPersona(1, 'Persona jurídica', 'PJ'),
    new tipoPersona(2, 'Persona natural', 'PN')
  ];

  tipo_contribuyente: tipoContribuyente[] = [
    new tipoContribuyente(1, 'Régimen común', 'RC'),
    new tipoContribuyente(2, 'Régimen simplificado', 'RS'),
    new tipoContribuyente(3, 'Gran contribuyente', 'GC'),
  ];

  municipios: Municipio[];

  tipos_identificacion: tipo_identificacion[] = [
    new tipo_identificacion("CC", "Cedula de ciudadania"),
    new tipo_identificacion("NT", "NIT"),
    new tipo_identificacion("CE", "Cedula Extranjera"),
  ];

  ngOnInit() {
    this.service.get('municipios/list').subscribe(
      result => {
        this.municipios = result;
      },
      error => {

      }
    )
    this.datos1 = this._formBuilder.group({
      'tipoidentificacion': ['', Validators.compose([Validators.required])],
      'identificacion': [null, Validators.compose([Validators.required, numberLimits({ max: 10, min: 10 })])],
      'tipousuario': [null, Validators.compose([Validators.required])],
      'tipocontribuyente': [null, Validators.compose([Validators.required])],
      'razonsocial': [null, Validators.compose([])],

    });

    this.datos2 = this._formBuilder.group({
      'telefono': [null, Validators.compose([Validators.required, numberLimits({ max: 10, min: 10 })])],
      'direccion': [null, Validators.compose([Validators.required])],
      'idmunicipio': [null, Validators.compose([Validators.required])],
    });
    this.settings.loadingSpinner = true;

    this.servicio.get_usuario_email(localStorage.getItem('current_user')).subscribe(
      result => {
        this.settings.loadingSpinner = false;
        this.usuario = result[0];
        console.log(result);
        this.datos1.setValue(
          {
            tipoidentificacion: result[0].tipoidentificacion,
            identificacion: result[0].identificacion,
            tipousuario: result[0].tipousuario,
            tipocontribuyente: result[0].tipocontribuyente,
            razonsocial: result[0].razonsocial
          }
        );

        this.datos2.setValue(
          {
            telefono: result[0].telefono,
            direccion: result[0].direccion,
            idmunicipio: result[0].idmunicipio.id
          }
        )
      },
      error => {
        this.settings.loadingSpinner = false;
        console.log(error);
      }
    )
  }

  verificar(datos: FormGroup, stepper: MatStepper) {

    if (datos.valid) {
      if (datos == this.datos1) {
        const dialogRef = this.dialog.open(GuardarConfirmacionComponent, {
          width: '250px', data: { response: null, title: 'Guardar cambios', message: '¿Está seguro de actualizar los datos de perfil?' }
        });
        this.usuario.tipoidentificacion = datos.value.tipoidentificacion;
        this.usuario.identificacion = datos.value.identificacion;
        this.usuario.tipousuario = datos.value.tipousuario;
        this.usuario.tipocontribuyente = datos.value.tipocontribuyente;
        this.usuario.razonsocial = datos.value.razonsocial;
        dialogRef.afterClosed().subscribe(result => {

          if (result != null) {
            if (result.response == true) {
              this.settings.loadingSpinner = true;
              this.servicio.actualizar_usuario(this.usuario).subscribe(
                result => {
                  this.settings.loadingSpinner = false;

                  this.verifica_registro.open("Datos guardados correctamente", "Ok", {
                    duration: 1000,
                  });
                  stepper.next();
                },
                error => {
                  this.settings.loadingSpinner = false;
                  console.log(error);
                }
              )
            }
          }
        });
      }

      if (datos == this.datos2) {
        const dialogRef2 = this.dialog2.open(GuardarConfirmacionComponent, {
          width: '250px', data: { response: null, title: 'Guardar cambios', message: '¿Está seguro de actualizar los datos de contacto?' }
        });
        this.usuario.telefono = datos.value.telefono;
        this.usuario.direccion = datos.value.direccion;
        this.usuario.idmunicipio = datos.value.idmunicipio;
        dialogRef2.afterClosed().subscribe(result => {
          if (result != null) {
            if (result.response == true) {
              this.settings.loadingSpinner = true;

              this.servicio.actualizar_usuario(this.usuario).subscribe(
                result => {
                  this.settings.loadingSpinner = false;

                  this.verifica_registro.open("Datos guardados correctamente", "Ok", {
                    duration: 1000,
                  });
                  stepper.next();
                  setTimeout(() => {
                    this.router.navigate(['/']);
                  }, 2000);
                },
                error => {
                  this.settings.loadingSpinner = false;
                  console.log(error);
                }
              )
            }
          }
        });
      }
    } else {
      this.verifica_registro.open("Verifique los campos para continuar", "Ok", {
        duration: 5000,
      });

    }
  }

}
