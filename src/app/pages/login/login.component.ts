import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import * as $ from 'jquery';
import { login_style } from '../login/login';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login-v2';
import { LoginService } from './services/login.service';
import { Usuario } from '../../models/usuarios';
import { SavedataService } from './services/savedata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public login: FormGroup;
  public settings: Settings;
  private usuario: Usuario;
  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    private socialAuthService: AuthService,
    private servicio: LoginService,
    private save: SavedataService,

  ) {

    this.settings = this.appSettings.settings;
    this.login = this.fb.group({
      'correo': [null, Validators.compose([Validators.required, emailValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  ngOnInit(): void {
    $(document).ready(function () {
      login_style();
    });
  }
  public onSubmit(values: Object): void {
    if (this.login.valid) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.settings.loadingSpinner = true;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {

        this.servicio.get_usuario_email(userData.email).subscribe(
          result => {
            if (JSON.stringify(result) == '[]') {
              this.settings.loadingSpinner = false;

              let username = userData.email.split('@')[0];
              this.registrar(userData.email, userData.name, userData.image, username);
            } else {
              this.settings.loadingSpinner = false;

              this.save.setUsuario(userData);
              this.save.setEmail(userData.email);
              this.loguear();
            }
          },
          error => {
            this.settings.loadingSpinner = false;

            console.log(error);
          }
        );
        
      }
    );
  }

  ingreso_dev(){
    this.save.setEmail('quinto0@misena.edu.co');
    this.router.navigate(['/']);
  }

  private loguear() {
    this.router.navigate(['/']);
  }



  private registrar(email: string, nombrecompleto: string, urlimagen: string, username: string) {
    let apellido;
    if (nombrecompleto.split(" ").length == 4) { apellido = nombrecompleto.split(" ")[2] } else { if (nombrecompleto.split(" ").length == 2) { apellido = nombrecompleto.split(" ")[1] } };
    let usuario: any = {
      "email": email,
      "nombrecompleto": nombrecompleto,
      "esadministrador": false,
      "urlimagen": urlimagen,
      "usuario": username,
      "primernombre": nombrecompleto.split(" ")[0],
      "primerapellido": apellido
    }
    this.settings.loadingSpinner = true;  
    this.servicio.add_usuario(usuario).subscribe(result => {

      this.servicio.get_usuario_email(usuario.email).subscribe(
        result =>{
          this.settings.loadingSpinner = false;
          this.save.setEmail(result[0].email);
          this.router.navigate(['/']);
        },
        error =>{
          this.settings.loadingSpinner = false;

          console.log(error);
        }
      )
      
    },
      error => {
        this.settings.loadingSpinner = false;

        console.log(error);
      });
  }
}




