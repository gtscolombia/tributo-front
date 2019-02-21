import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApiRestService } from '../../api-rest.service';
import { Tp_estado } from './tp-estado';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-seleccionar-periodo',
  templateUrl: './seleccionar-periodo.component.html',
  styleUrls: ['./seleccionar-periodo.component.scss']
})
export class SeleccionarPeriodoComponent implements OnInit {
  public tp_estados : Tp_estado[];

 public tipoPeriodo: any;
  public tiposPeriodos : any[] = [];

  public periodo = '';
  public periodos : Tp_estado[] = [];


  public grupo: any;


  constructor(public dialogRef: MatDialogRef<SeleccionarPeriodoComponent>,
    @Inject(MAT_DIALOG_DATA) public Periodo: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicio : ApiRestService,
    public Mensaje: MatSnackBar){}

  ngOnInit() {
    this.get_tiposPeriodo();

  }







 get_periodos(subgrupo : any){
   this.servicio.get('estados/subgrupo/'+subgrupo).subscribe(
     result =>{
       this.periodos = result;
     }
   );


 }


  get_tiposPeriodo(){
    let tributos: any[];
    this.servicio.get('bctritributo/list').subscribe(
      result =>{
        tributos = result;
        for(let t of tributos){
          if(t.id == this.data.idtributo){
            this.grupo = t.tipoperiodo;
          }
        }
        this.servicio.get('estados/distinctsubgrupo/'.concat(this.grupo)).subscribe(
          result =>{
            this.tiposPeriodos = result;
        
          },
        error =>{
          console.log(error);
        }
        );
      }
    );
  }


  liquidar(){
    if(this.periodo !='' ){
      console.log('liquidar')
      this.Periodo = this.periodo;
      this.dialogRef.close(this.Periodo);
    }else{
      this.Mensaje.open("Complete todos los campos", "Ok", {
        duration: 2000,
      });

    }
  }





}
