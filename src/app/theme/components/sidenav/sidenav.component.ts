import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenavPS') sidenavPS: PerfectScrollbarComponent;
  public tipoPersona;
  public tipo;
  public identificacion;
  public userImage = 'https://i.stack.imgur.com/34AD2.jpg';
  public primernombre;
  public primerapellido;
  public menuItems: Array<any>;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    private servicio: SidenavService
  ) {
    this.settings = this.appSettings.settings;

  }

  ngOnInit() {

    this.servicio.get_usuario_email(localStorage.getItem('current_user')).subscribe(
      result => {

        this.tipo = result[0].tipoidentificacion;
        this.identificacion = result[0].identificacion;
        if (result[0].tipousuario == 'PN') {
          this.tipoPersona = 'Persona natural';
        } else {
          this.tipoPersona = 'Persona jurídica';
        }
        this.userImage = result[0].urlimagen;

        this.primernombre = result[0].primernombre;
        this.primerapellido = result[0].primerapellido;


      },
      error => {

      }
    )



    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  public closeSubMenus() {
    let menu = document.querySelector(".sidenav-menu-outer");
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

  public updatePS(e) {
    this.sidenavPS.directiveRef.update();
  }

}
