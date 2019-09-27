import { Component, OnInit } from '@angular/core';
import {CarriersTransportationpoolRequestModel} from '../../../models/Transportationpool/carriers-transportationpool-request-model';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OutTruckTransportationpoolService} from '../../../services/Transportationpool/out-truck-transportationpool.service';
import {EmitService} from '../../../help/emit-service';
import {Formextension} from '../../../help/formextension';
import {VehicleContainerService} from '../../../services/vehiclemanagement/vehicle-container.service';
import {DataManager, JsonAdaptor, Query, WebApiAdaptor} from '@syncfusion/ej2-data';
import {VehicleContainerModel} from '../../../models/vehiclemanagement/container-model';
import {ChangeEventArgs, FilteringEventArgs} from '@syncfusion/ej2-dropdowns';
import {EmitType} from '@syncfusion/ej2-base';
import {GridDataSource} from '../../../models/grid-data-source';
import {OutTruckTransportationpoolRequestModel} from '../../../models/Transportationpool/out-truck-transportationpool-request-model';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';

@Component({
  selector: 'app-outdriverinsert',
  templateUrl: './outdriverinsert.component.html',
  styleUrls: ['./outdriverinsert.component.css'] // 外租车
})
export class OutdriverinsertComponent implements OnInit {

  // saverequest: OutTruckTransportationpoolRequestModel = new OutTruckTransportationpoolRequestModel();
  // public saveform: FormGroup;
  // public height = '250px';
  // public fields: Object = { text: 'Name', value: 'Id' };
  // public vehicleContainerData: VehicleContainerModel[];

  constructor( ) { }

  ngOnInit() {

    //    this.saveform = this.fb.group({
    //   ResourceId: '',
    //   RName:  ['', Validators.required],
    //   RType: '外部车辆',
    //   Enabel: true,
    //   Mark: '',
    //   Trnum: ['', Validators.required],
    //   Gpstype: '',
    //   Gpsno: '',
    //      Trtype: ['', Validators.required],
    //   Weight: 0,
    //   Volume: 0,
    //   Length: '',
    //   Width: '',
    //   Height: '',
    //   Drtel: ['', Validators.required],
    //   Dridnum: '',
    //   Drlicensenum: '',
    //   Draddr: ''
    // });
    //
    //    this.vehicleContainerService.Search({
    //   pageindex: 1,
    //   pagesize: 100,
    //   Name: ''}).subscribe(result => {
    //
    //     this.vehicleContainerData = result.QueryResult;
      // result.QueryResult.forEach((a, b) => {
      //
      //   this.vehicleContainerData = [
      //     { Name: a.Name,
      //       Code: a.Code ,
      //       TypeHeight: a.TypeHeight,
      //       TypeWidth: a.TypeWidth,
      //       TypeLegth: a.TypeLegth,
      //       Volumecapacity: a.Volumecapacity,
      //       Weightcapacity: a.Weightcapacity}
      //   ];
      // });
   // });
  }

  // save($event: boolean) {
  //   if ($event === false) {
  //     return;
  //   }
  //
  //   console.log(this.saveform.valid);
  //   if (this.saveform.valid === false) {
  //
  //     Formextension.validateAllFormFields(this.saveform);
  //     // console.log('验证未通过');
  //     // console.log(CarrierValidatoinMessage);
  //     // Formextension.getFormValidationErrorsAndEmit(this.saveform, CarrierValidatoinMessage, this.emitService);
  //     return;
  //   } else {
  //
  //
  //     this. saverequest = <OutTruckTransportationpoolRequestModel> this.saveform.getRawValue();
  //
  //     console.log( this. saverequest);
  //     const vc = this.vehicleContainerData.find(t => t.Id === parseInt(this.saverequest.Trtype) );
  //
  //     if (vc === undefined) {
  //       alert('车型错误');
  //     }
  //     console.log(vc);
  //       this.saverequest.Trtype = vc.Name;
  //       this.saverequest.Weight = vc.Weightcapacity;
  //       this. saverequest.  Volume = vc.Volumecapacity;
  //       this. saverequest. Length = vc.TypeLegth;
  //       this. saverequest. Width = vc.TypeWidth;
  //       this.saverequest.Height = vc.TypeHeight;
  //
  //       this._services.Insert(this.saverequest).subscribe(a => {
  //
  //         this.emitService.eventEmit.emit(
  //           new EmitAlertMessage(AlertMessageType.Info,
  //             '系统信息', a.Info, MessageShowType.Toast));
  //         if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {
  //
  //         //  this.router.navigate(['biz/carriers-management/carriers-detail', a.Data]);
  //           //  biz/customer-management/edit/BC100004000005
  //
  //
  //         }
  //       });
  //   }
  //
  //
  // }



}
