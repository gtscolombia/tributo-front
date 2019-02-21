import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserMenuService } from './user-menu.service';
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = "https://i.stack.imgur.com/34AD2.jpg";
  public userName;
  public primerNombre;
  public primerApellido;
  constructor(private router : Router, private servicio: UserMenuService) { }

  ngOnInit() {

    this.servicio.get_usuario_email(localStorage.getItem('current_user')).subscribe(
      result =>{

          console.log(result[0].urlimagen);
          this.primerNombre = result[0].primernombre;
          this.primerApellido = result[0].primerapellido;
          this.userImage = result[0].urlimagen;
          this.userName = result[0].usuario;
      }
    );
    
  }


  cerrar_sesion(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}
