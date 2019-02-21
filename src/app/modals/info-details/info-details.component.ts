import { Component, OnInit , Inject, ElementRef, ViewChild} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';


@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.scss']
})


export class InfoDetailsComponent implements OnInit{



 public cars: any  = [
    {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
    {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
    {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
    {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
    {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
    {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
    {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
    {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
    {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
];

  

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<InfoDetailsComponent>) {}

  ngOnInit() {
  }

  
  selectCar(car: any) {
    console.log(car);
}


  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}