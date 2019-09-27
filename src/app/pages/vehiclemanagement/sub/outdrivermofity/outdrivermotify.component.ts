import {Component, Input, OnInit} from '@angular/core';
import {OutTruckTransportationpoolRequestModel} from '../../../../models/Transportationpool/out-truck-transportationpool-request-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VehicleContainerModel} from '../../../../models/vehiclemanagement/container-model';
import {Router} from '@angular/router';
import {EmitService} from '../../../../help/emit-service';
import {OutTruckTransportationpoolService} from '../../../../services/Transportationpool/out-truck-transportationpool.service';
import {VehicleContainerService} from '../../../../services/vehiclemanagement/vehicle-container.service';
import {Formextension} from '../../../../help/formextension';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-biz-outdrivermotify',
  templateUrl: './outdrivermotify.component.html',
  styleUrls: ['./outdrivermotify.component.css']
})
export class OutdrivermotifyComponent implements OnInit {

  @Input('flag')
  Operate: number;


  saverequest: OutTruckTransportationpoolRequestModel;

  public saveform: FormGroup;
  public height = '250px';
  public fields: Object = { text: 'Name', value: 'Id' };
  public vehicleContainerData: VehicleContainerModel[];

  public btnmessage: string;

  constructor(
              private storageService: StorageService,
              private router: Router,
              private emitService: EmitService,
              private _services: OutTruckTransportationpoolService,
              private  vehicleContainerService: VehicleContainerService,
              private fb: FormBuilder) { }

  ngOnInit() {

    if (this.Operate === 1) {
      this.btnmessage = '保存外租车吗';
      this.saverequest = new OutTruckTransportationpoolRequestModel();
      this.saverequest. RType = '外部车辆';
      this.saverequest.  Enabel = true;
      this.saverequest. Weight = 0;
      this.saverequest.  Volume = 0;
      this.saverequest.AllowAddHandlerFee = true;
    } else {
      this.btnmessage = '确认修改外租车数据吗';

       this.saverequest = <OutTruckTransportationpoolRequestModel> this.storageService.retrieve('outdriver');

       if (this.saverequest === undefined) {
         alert('数据错误');
       }
    }

    this.saveform = this.fb.group({
      ResourceId: this.saverequest.ResourceId,
      RName:  [this.saverequest.RName, Validators.required],
      RType: this.saverequest.RType,
      Enabel: this.saverequest.Enabel,
      Mark: this.saverequest.Mark,
      Trnum: [this.saverequest.Trnum, Validators.required],
      Gpstype: this.saverequest.Gpstype,
      Gpsno: this.saverequest.Gpsno,
      Trtype: [this.saverequest.Trtype, Validators.required],
      Weight: this.saverequest.Weight,
      Volume: this.saverequest.Volume,
      Length: this.saverequest.Length,
      Width: this.saverequest.Width,
      Height: this.saverequest.Height,
      Drtel: [this.saverequest.Drtel, Validators.required],
      Dridnum: this.saverequest.Dridnum,
      Drlicensenum: this.saverequest.Drlicensenum,
      Draddr: this.saverequest.Draddr,
      AllowAddHandlerFee: this.saverequest.AllowAddHandlerFee
    });

    this.vehicleContainerService.Search({
      pageindex: 1,
      pagesize: 100,
      Name: ''}).subscribe(result => {

      this.vehicleContainerData = result.QueryResult;
    });
  }

  save($event: boolean) {
    if ($event === false) {
      return;
    }

    console.log(this.saveform.valid);
    if (this.saveform.valid === false) {

      Formextension.validateAllFormFields(this.saveform);
      // console.log('验证未通过');
      // console.log(CarrierValidatoinMessage);
      // Formextension.getFormValidationErrorsAndEmit(this.saveform, CarrierValidatoinMessage, this.emitService);
      return;
    } else {


      this. saverequest = <OutTruckTransportationpoolRequestModel> this.saveform.getRawValue();

      console.log( this. saverequest);
      const vc = this.vehicleContainerData.find(t => t.Id === parseInt(this.saverequest.Trtype) );

      if (vc === undefined) {
        alert('车型错误');
      }
      console.log(vc);
      this.saverequest.Trtype = vc.Name;
      this.saverequest.Weight = vc.Weightcapacity;
      this. saverequest.  Volume = vc.Volumecapacity;
      this. saverequest. Length = vc.TypeLegth;
      this. saverequest. Width = vc.TypeWidth;
      this.saverequest.Height = vc.TypeHeight;

      if (this.Operate === 1) {
        this._services.Insert(this.saverequest).subscribe(a => {

          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info,
              '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

             this.router.navigate(['biz/vehicle-management/ourdriver-detail', a.Data]);
            //  biz/customer-management/edit/BC100004000005
          }
        });
      } else {
        this._services.Update(this.saverequest).subscribe(a => {

          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info,
              '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {
            this.router.navigate(['biz/vehicle-management/ourdriver-detail', this.saverequest.ResourceId]);
            //  this.router.navigate(['biz/carriers-management/carriers-detail', a.Data]);
            //  biz/customer-management/edit/BC100004000005


          }
        });
      }

    }


  }
}
