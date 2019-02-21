import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { numberLimits, emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuarios';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GuardarConfirmacionComponent } from '../../../modals/guardar-confirmacion/guardar-confirmacion.component';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public settings: Settings;

  usuario: Usuario;
  datos: FormGroup;
  imagen: string = "https://i.stack.imgur.com/34AD2.jpg";
  correo: string;
  constructor(public appSettings: AppSettings, public dialog: MatDialog, private router: Router, private _formBuilder: FormBuilder, public verifica_registro: MatSnackBar, private servicio: PerfilService) {this.settings = this.appSettings.settings;}

  ngOnInit() {
    this.settings.loadingSpinner = true;
    this.datos = this._formBuilder.group({
      'nombres': ['', Validators.compose([Validators.required])],
      'apellidos': ['', Validators.compose([Validators.required])],
      'pass': ['', Validators.compose([Validators.required])],
      'repetirpass': ['', Validators.compose([Validators.required])]
    }, { validator: matchingPasswords('pass', 'repetirpass') });
    this.servicio.get_usuario_email(localStorage.getItem("current_user")).subscribe(
      result => {
        this.settings.loadingSpinner = false;

        this.usuario = result[0];
        this.imagen = result[0].urlimagen;
        this.correo = result[0].email;
        this.datos.setValue({
          nombres: result[0].primernombre,
          apellidos: result[0].primerapellido,
          pass: null,
          repetirpass: null,
        });
      },
      error => {
        console.log(error);
        this.settings.loadingSpinner = false;


      }
    )
  }


  guardar() {
    if (this.datos.valid) {
      const dialogRef = this.dialog.open(GuardarConfirmacionComponent, {
        width: '250px', data: { response: null, title: 'Guardar cambios', message: '¿Está seguro de actualizar tus datos basicos de perfíl?' } 
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          if (result.response == true) {
            this.settings.loadingSpinner = true;

            this.usuario.primernombre = this.datos.value.nombres;
            this.usuario.primerapellido = this.datos.value.apellidos;
            this.usuario.clave = this.datos.value.pass;
            this.servicio.actualizar_usuario(this.usuario).subscribe(
              result => {
                this.settings.loadingSpinner = false;

                this.verifica_registro.open("Datos guardados correctamente", "Ok", {
                  duration: 1000,
                });
              },
              error => {
                this.settings.loadingSpinner = false;

                this.verifica_registro.open("Hubo un error al guardar los datos: " + error, "Ok", {
                  duration: 2000,
                });
              }
            )

          }
        }
      });
    }
  }


  cancelar() {
    this.router.navigate(['/']);
  }


}
