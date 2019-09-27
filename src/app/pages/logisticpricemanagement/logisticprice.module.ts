import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricetemplateinsertComponent } from './pricetemplateinsert/pricetemplateinsert.component';
import { PricetemplatelistComponent } from './pricetemplatelist/pricetemplatelist.component';
import { PricetemplatedateinsertComponent } from './pricetemplatedateinsert/pricetemplatedateinsert.component';
import {RouterModule, Routes} from '@angular/router';
import {ContainerModelComponent} from '../vehiclemanagement/container-model/container-model.component';
import {OurdriverdetailComponent} from '../vehiclemanagement/ourdriverdetail/ourdriverdetail.component';
import {OutdriverinsertComponent} from '../vehiclemanagement/outdriverinsert/outdriverinsert.component';
import {OutdriverlistComponent} from '../vehiclemanagement/outdriverlist/outdriverlist.component';
import {OutdriverupdateComponent} from '../vehiclemanagement/outdriverupdate/outdriverupdate.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {FormsHelpModule} from '../../buinesscomponent/forms/formshelp.module';
import {DialogAlertComponent} from '../../component/tms/alert';
import {SimpleorderdetailComponent} from '../myorder/simpleorderdetail/simpleorderdetail.component';
import { PricetemplatedetailComponent } from './pricetemplatedetail/pricetemplatedetail.component';
import {AdminModule} from '../../admin/admin.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { UserpricecontractlistComponent } from './userpricecontractlist/userpricecontractlist.component';
import { UserpricecontractaddComponent } from './userpricecontractadd/userpricecontractadd.component';
import { UserpricevalueaddComponent } from './userpricevalueadd/userpricevalueadd.component';
import {BasedataModule} from '../../buinesscomponent/base/basedata.module';
import { UserpricevaluelistComponent } from './userpricevaluelist/userpricevaluelist.component';
import { UserpricevaluedetailComponent } from './userpricevaluedetail/userpricevaluedetail.component';


const routes: Routes = [

  {
    path: 'price-template-insert',
    component: PricetemplateinsertComponent
  },
  {
    path: 'price-template-list',
    component: PricetemplatelistComponent
  },
  {
    path: 'price-template-detail/:id',
    component: PricetemplatedetailComponent
  },
  {
    path: 'price-template-data-insert/:id',
    component: PricetemplatedateinsertComponent
  },
  {
    path: 'price-value-insert/:id',  // 运价合同中的数据
    component: UserpricevalueaddComponent
  },
  {
    path: 'price-value-list',  // 运价合同中的数据
    component: UserpricevaluelistComponent
  },
  {
    path: 'price-value-detail/:id',  // 运价合同中的数据
    component: UserpricevaluedetailComponent
  },

];

@NgModule({
  declarations: [
    PricetemplateinsertComponent, PricetemplatelistComponent, PricetemplatedateinsertComponent,
    PricetemplatedetailComponent, UserpricecontractlistComponent, UserpricecontractaddComponent, UserpricevalueaddComponent, UserpricevaluelistComponent, UserpricevaluedetailComponent],
  imports: [

    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    RouterModule.forChild(routes),
    FormsHelpModule,
    AdminModule,
    PerfectScrollbarModule,
    BasedataModule
  ],
  entryComponents: [PricetemplateinsertComponent, UserpricecontractaddComponent],

  exports: [
    UserpricecontractlistComponent
  ]
})
export class LogisticpriceModule { }
