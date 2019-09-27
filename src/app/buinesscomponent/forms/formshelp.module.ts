import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorTipsComponent } from './form-error-tips/form-error-tips.component';



@NgModule({
  declarations: [FormErrorTipsComponent],
  exports: [
    FormErrorTipsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormsHelpModule { }
