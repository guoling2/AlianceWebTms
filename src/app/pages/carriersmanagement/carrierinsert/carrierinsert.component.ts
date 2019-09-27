import { Component, OnInit } from '@angular/core';
import {TransportationpoolForCarriersService} from '../../../services/Transportationpool/transportationpool-for-carriers.service';
import {CarriersTransportationpoolRequestModel} from '../../../models/Transportationpool/carriers-transportationpool-request-model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Formextension} from '../../../help/formextension';
import {EmitService} from '../../../help/emit-service';
import {CarrierValidatoinMessage} from '../carrier-validatoin-message';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carrierinsert',
  templateUrl: './carrierinsert.component.html',
  styleUrls: ['./carrierinsert.component.css']
})
export class CarrierinsertComponent implements OnInit {

  CarriersTransportationpoolRequest: CarriersTransportationpoolRequestModel;
  public saveform: FormGroup;

  constructor( private router: Router,
               private emitService: EmitService,
               private transportationpoolForCarriersService: TransportationpoolForCarriersService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.saveform = this.fb.group({
      ResourceId: '',
      RName:  ['', Validators.required],
      RType: '外部运输商',
      Enabel: true,
      Mark: '',
      LinkMan:  ['', Validators.required],
      LinkTel:  ['', Validators.required],
      LinkAddress: '',
      AllowAddHandlerFee: true
    });
  }

  save(result: boolean) {

    console.log(result);
    if (result === false) {
      return;
    }
     if (this.saveform.valid === false) {
       console.log('验证未通过');
       console.log(CarrierValidatoinMessage);
       Formextension.getFormValidationErrorsAndEmit(this.saveform, CarrierValidatoinMessage, this.emitService);
       return;
     }
    if (this.saveform.valid) {
      this.CarriersTransportationpoolRequest = <CarriersTransportationpoolRequestModel> this.saveform.getRawValue();

      this.transportationpoolForCarriersService.Insert(this.CarriersTransportationpoolRequest)
        .subscribe(a => {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info,
              '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

            this.router.navigate(['biz/carriers-management/carriers-detail', a.Data]);
            //  biz/customer-management/edit/BC100004000005


          }

        });
      console.log(this.CarriersTransportationpoolRequest);
    }
  }
}
