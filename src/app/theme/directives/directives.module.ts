import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectScrollDirective } from './detect-scroll/detect-scroll.directive';
import { ShowErrorsDirective } from '../directives/show-errors/show-errors.component';

@NgModule({
  imports: [
    CommonModule,
    

  ],
  declarations: [
    DetectScrollDirective,
    ShowErrorsDirective
    
  ],
  exports: [
    DetectScrollDirective,
    ShowErrorsDirective
  ]
})
export class DirectivesModule { }
