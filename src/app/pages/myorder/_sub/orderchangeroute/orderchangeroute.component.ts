import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OrderChangeRequestModel} from '../order-change-request-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ShipmentOrderService} from '../../../../services/logistic/order/shipment-order.service';
import {TrackRouteProcessServiceService} from '../../track-route-process-service.service';
import {EmitService} from '../../../../help/emit-service';
import {TmsResponseModle, TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {OrderDestsrviceChangeRequest} from '../../../../models/shipment/order-destsrvice-change-request';

@Component({
  selector: 'app-orderchangeroute',
  templateUrl: './orderchangeroute.component.html',
  styleUrls: ['./orderchangeroute.component.css']
})
export class OrderchangerouteComponent implements OnInit {

  public saveform: FormGroup;

  public PlanTxt: string;
  constructor(
    private shipmentOrderService: ShipmentOrderService,
    private trackRouteProcessServiceService: TrackRouteProcessServiceService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public emitService: EmitService,
    public dialogRef: MatDialogRef<OrderchangerouteComponent>,
    @Inject(MAT_DIALOG_DATA) public orders: Array<OrderChangeRequestModel>) { }

  ngOnInit() {
    this.saveform = this.fb.group({
      DestserviceId: '',
      BeginLogisticStoreId: '',
      EndLogisticStoreId: '',
      RoutePlanId: '',
      RequestOrderLogisticDetailId: ''});

    console.log('this.orders');
    console.log(this.orders[0].OrderLogisticDetailId);
  }
  // 提交
  changedestsrvice() {


    this.orders.forEach((a, index) => {


      const savemodel = <OrderDestsrviceChangeRequest>this.saveform.getRawValue();

      savemodel.RequestOrderLogisticDetailId = a.OrderLogisticDetailId;

      this.shipmentOrderService.ChangeOrderDestsrvice(savemodel).subscribe(result => {
         if (result.StatusCode !== TmsresponseStatusCode.Succeed()) {
           this.emitService.eventEmit.emit(
             new EmitAlertMessage(AlertMessageType.Error, '系统信息', result.Error.ErrorMsg, MessageShowType.Toast));
         }

      });


      if (index === this.orders.length - 1) {


        this.dialogRef.close(new TmsResponseModle(200, '操作完成，请刷新'));

      }
    });

  }
  // 备选运输线路
  backuproute() {

    const s1 = <string>this.saveform.get('BeginLogisticStoreId').value;
    const s2 = <string> this.saveform.get('EndLogisticStoreId').value;
    const RoutePlanId = <string> this.saveform.get('RoutePlanId').value;

    this.trackRouteProcessServiceService.caclorderroute('50em', '50em', this.dialog, this.emitService, s1, s2, RoutePlanId)
      .subscribe(a => {

        if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Error, '系统信息', '网点参数错误！', MessageShowType.Toast));

          return;
        }

        this.saveform.get('RoutePlanId').patchValue((<string[]>a.Data)[0]);
        this.PlanTxt = (<string[]>a.Data)[1];

        console.log( this.saveform.get('RoutePlanId'));
      });

  }
}
