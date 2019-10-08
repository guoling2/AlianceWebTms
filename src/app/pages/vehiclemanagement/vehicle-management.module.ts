import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerModelComponent } from './container-model/container-model.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonbizmoduleModule} from '../common/commonbizmodule.module';
import {OurdriverdetailComponent} from './ourdriverdetail/ourdriverdetail.component';
import {OutdriverlistComponent} from './outdriverlist/outdriverlist.component';
import {OutdriverinsertComponent} from './outdriverinsert/outdriverinsert.component';
import {FormsHelpModule} from '../../buinesscomponent/forms/formshelp.module';
import { OutdrivermotifyComponent } from './sub/outdrivermofity/outdrivermotify.component';
import { OutdriverupdateComponent } from './outdriverupdate/outdriverupdate.component';
import {LogisticpriceModule} from '../logisticpricemanagement/logisticprice.module';






const routes: Routes = [

  {
    path: 'containers',
    component: ContainerModelComponent
  },
  {
    path: 'ourdriver-detail/:id',
    component: OurdriverdetailComponent
  },
  {
    path: 'outdriver-insert',
    component: OutdriverinsertComponent
  },
  {
    path: 'outdriver-list',
    component: OutdriverlistComponent
  },
  {
    path: 'ourdriver-edit/:id',
    component: OutdriverupdateComponent
  },
];
@NgModule({
  declarations: [ContainerModelComponent, OurdriverdetailComponent, OutdriverinsertComponent, OutdriverlistComponent, OutdrivermotifyComponent, OutdriverupdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    RouterModule.forChild(routes),
    FormsHelpModule,
    LogisticpriceModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule

  ],
})
export class VehicleManagementModule { }
