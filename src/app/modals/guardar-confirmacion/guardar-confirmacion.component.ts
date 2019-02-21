import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-guardar-confirmacion',
  templateUrl: './guardar-confirmacion.component.html',
  styleUrls: ['./guardar-confirmacion.component.scss']
})
export class GuardarConfirmacionComponent{
  constructor(
    public dialogRef: MatDialogRef<GuardarConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.data.response = null;
    }
 
    no(){
      this.data.response = false;
    }
    si(){
      this.data.response = true;
    }

}