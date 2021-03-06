import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogistictoreModule} from './buinesscomponent/logistore/logistictore.module';
import {SharedModule} from './shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasedataModule} from './buinesscomponent/base/basedata.module';
import {ShipplangroupModule} from './buinesscomponent/shipplangroup/shipplangroup.module';
import {SimpleorderdetailComponent} from './pages/myorder/simpleorderdetail/simpleorderdetail.component';
import {FormsHelpModule} from './buinesscomponent/forms/formshelp.module';

@NgModule({


  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LogistictoreModule,
    BasedataModule,
    ShipplangroupModule,
    FormsHelpModule
  ]

})
export class AppbuinessModule { }
