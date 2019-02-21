import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ModalInfoComponent } from '../../../modals/modal-info/modal-info.component'
import { ApiRestService } from '../../../api-rest.service';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';


import { Entidad } from './Entidad'

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
})
export class EntidadesComponent implements OnInit {

  public settings: Settings;

  entidades: Entidad[];










  public searchText: string;
  constructor(private servicio : ApiRestService, public dialog: MatDialog, public appSettings: AppSettings) { 
    this.settings = this.appSettings.settings;

  }



  ngOnInit() {
    
    this.settings.loadingSpinner = true;
    this.servicio.get('bcententidad/list').subscribe(
      result =>{
        this.settings.loadingSpinner = false;
        const dialogRef = this.dialog.open(ModalInfoComponent, {
          width: '250px', data: { message: 'Para contiuar seleccione la entidad a tributar' }
        });
        this.entidades = result;
      },
      error =>{
        console.log(error);
      }
    )
    


    
    }
  }


