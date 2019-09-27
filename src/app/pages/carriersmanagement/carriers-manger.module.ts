import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierslistComponent } from './carrierslist/carrierslist.component';
import { CarriersdetailComponent } from './carriersdetail/carriersdetail.component';
import { CarrierinsertComponent } from './carrierinsert/carrierinsert.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {LogisticpriceModule} from '../logisticpricemanagement/logisticprice.module';


const routes: Routes = [

  {
    path: 'carriers',
    component: CarrierslistComponent
  },
  {
    path: 'carriers-detail/:id',
    component: CarriersdetailComponent
  },
  {
    path: 'carriers-insert',
    component: CarrierinsertComponent
  }
];
@NgModule({
  declarations: [CarrierslistComponent, CarriersdetailComponent, CarrierinsertComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    RouterModule.forChild(routes),
    LogisticpriceModule
  ]
})
export class CarriersMangerModule { }
