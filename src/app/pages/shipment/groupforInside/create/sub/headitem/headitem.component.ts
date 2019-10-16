import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../../../modeldata/vehicel-task-type';
import {OrderrouteplanComponent} from '../../../../../myorder/_sub/orderrouteplan/orderrouteplan.component';
import {MatDialog} from '@angular/material';
import {EmitService} from '../../../../../../help/emit-service';
import {HttpClient} from '@angular/common/http';
import {BusAreaService} from '../../../../../../services/base/bus-area.service';
import {FormsControlServiceService} from '../../../../../../services/forms-control-service.service';
import {ShipmentOrderService} from '../../../../../../services/logistic/order/shipment-order.service';
import {LogisticStoreServiceService} from '../../../../../../services/logisticstore/logisticstoreservice';
import {LogisticStoreAuthorizeServiceService} from '../../../../../../services/logisticstore/logistic-store-authorize-service.service';
import {CustomerTaxServiceService} from '../../../../../../services/customers/customer-tax-service.service';
import {DialogservicesService} from '../../../../../../help/dialogservices.service';
import {SelectvehicelComponent} from '../../../../groupplancommon/selectvehicel/selectvehicel.component';
import {SelectdriverComponent} from '../../../../groupplancommon/selectdriver/selectdriver.component';
import {Vehicelmodel} from '../../../../../../models/vehiclemanagement/vehicelmodel';
import {LogisticStore} from '../../../../../../models/LogisticStore/logistic-store';
import {LogisticItemComponentService} from '../../../../../../services/shiipplangroup/shipplan-item-service.service';

@Component({
  selector: 'app-shipmentplan-insert-headitem',
  templateUrl: './headitem.component.html',
  styleUrls: ['./headitem.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: HeaditemComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: HeaditemComponent}
  ],
})
export class HeaditemComponent implements OnInit  {

  private  logsiticinserthead: FormGroup;

  @Input()
  public saveform: FormGroup;

  @Input()
  public tasktype: string;

  constructor(
               private itemServiceService: LogisticItemComponentService,
               private fb: FormBuilder,
               private dialog: MatDialog,
               public emitService: EmitService,
               private  dialogx: DialogservicesService) { }

  ngOnInit() {

    // this.logsiticinserthead =  this.fb.group({
    //   ShipmentGroupId: { value: '', disabled: true },
    //   ShipmentUserLinkTel: ''
    // });
    // first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),

    switch (this.tasktype) {

      case 'localtihuo':
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '小车提货', disabled: false}));
        break;
      case 'transfer':
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '干线运输', disabled: false}));
        break;
      // case 'sendnoreturn':
      //   this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '直提直送', disabled: false}));
      //   break;
      case 'songhuo':
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '同城配送', disabled: false}));
        break;
      default:
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '未知', disabled: false}));
        break;
    }




    this.saveform.addControl('LogisticFeeBlanceMethod', new FormControl({value: '10', disabled: false}));

    this.saveform.addControl('ShipmentGroupId', new FormControl({value: '', disabled: false}));

    this.saveform.addControl('SendCarTime', new FormControl({value: new Date(), disabled: false}));



    this.saveform.addControl('CarringToolId', new FormControl({value: '', disabled: true}, Validators.required));
    this.saveform.addControl('CarryingToolName', new FormControl({value: '', disabled: false}, Validators.required));
    this.saveform.addControl('ShipmentUserId', new FormControl({value: '', disabled: true}, Validators.required));
    this.saveform.addControl('ShipmentUserDesc', new FormControl({value: '', disabled: false}, Validators.required));

    this.saveform.addControl('ShipmentUserLinkTel', new FormControl());

    this.saveform.addControl('SendOrderCount', new FormControl({value: 0, disabled: false}));
    this.saveform.addControl('SendOrderWeight', new FormControl({value: 0, disabled: false}));
    this.saveform.addControl('SendOrderVol', new FormControl({value: 0, disabled: false}));
    this.saveform.addControl('Mark', new FormControl());

    this.saveform.addControl('SendTrincId', new FormControl());
    this.saveform.addControl('SendTrincName', new FormControl());


    this.saveform.addControl('VehicelSourceFrom', new FormControl());

    this.itemServiceService.LogisiticItemAddBehavior.subscribe(next => {

      if (next == null) {
        return;
      }

      this.saveform.patchValue({SendOrderCount:  this.itemServiceService.SendOrderCount});
      this.saveform.patchValue({SendOrderWeight:  this.itemServiceService.SendOrderWeight});
      this.saveform.patchValue({SendOrderVol: this.itemServiceService.SendOrderVol});


    });
  }

  /**
   * 车辆选择
   */
  selectvehicel($event: MouseEvent, height: string, width: string) {

    if($event.clientX==0){
      return;
    }
    const dialogRef = this.dialog.open(SelectvehicelComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: ''
    });
   // (value: LogisticStore[])
    dialogRef.afterClosed().subscribe((result: Vehicelmodel) => {

      if (result != null) {


        this.saveform.patchValue({CarringToolId: result.VehicelId});
        this.saveform.patchValue({CarryingToolName: result.VehicelName});
        this.saveform.patchValue({ShipmentUserId: result.PrimaryDriverId});
        this.saveform.patchValue({ShipmentUserDesc: result.PrimaryDriverName});
        this.saveform.patchValue({ShipmentUserLinkTel: result.PrimaryDriverTel});
        this.saveform.patchValue({VehicelSourceFrom: result.VehicelSourceFrom});

        this.saveform.patchValue({SendTrincId: result.VehicelId});
        this.saveform.patchValue({SendTrincName: result.VehicelName});


        console.log(result);
       // this.saveform.patchValue('CarringToolId', result);
      }



    });


  }

  /**
   * 司机选择
   */
  selectdriver($event: MouseEvent, height: string, width: string) {
    const dialogRef = this.dialog.open(SelectdriverComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {



    });
  }
}
