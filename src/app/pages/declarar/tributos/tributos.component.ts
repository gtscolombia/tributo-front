import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../../api-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SeleccionarPeriodoComponent } from '../../../modals/seleccionar-periodo/seleccionar-periodo.component'
import { ModalInfoComponent } from '../../../modals/modal-info/modal-info.component'
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';




@Component({
  selector: 'app-tributos',
  templateUrl: './tributos.component.html',
  styleUrls: ['./tributos.component.scss']
})
export class TributosComponent implements OnInit {
  public settings: Settings;

  public sub:any;
  public idEnTributo;
  public idEntidad = '';
  public tributos = [];
  public searchText: string;
  constructor(private servicio: ApiRestService,
    public appSettings: AppSettings,
              public info : MatDialog,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { 
                this.settings = this.appSettings.settings;
                this.sub = this.route.params.subscribe(params => {
                  this.idEntidad = params['identidad'];
              });

              }




  ngOnInit() {

    this.settings.loadingSpinner = true;

        let url = 'bcenttributos/activas/';
        this.servicio.get(url.concat(this.idEntidad)).subscribe(
          result =>{
            this.settings.loadingSpinner = false;

    const dialogRef = this.dialog.open(ModalInfoComponent, {
      width: '250px', data: { message: 'Seleccione el tributo para continuar con la operación' }
    });
            this.tributos = result;
            console.log(this.tributos[0].idtributo.nombre);
            },
          error =>{
            console.log(error);
          }
        );
          
          


  }


  seleccionarPeriodo(id : string){
    this.idEnTributo = id;
    const dialogRef = this.dialog.open(SeleccionarPeriodoComponent, {
      width: '250px', data: {idtributo : id, response: null }
    });

    dialogRef.afterClosed().subscribe(
      result =>{
        if(result == undefined){

        }else{
          this.router.navigate(['/declarar/tributo/'+this.idEnTributo+'/'+result]);
        }
      },
      error =>{
        console.log(error);
      }

    );

  }




}
