import { Component, OnInit } from '@angular/core';
import {ShipmentOrderService} from '../../../services/logistic/order/shipment-order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EnterpriseOrderDetailModel} from '../../../models/CustomerOrder/enterprise-order-detail-model';
import {ShipmentOrderComplexModel} from '../../../models/shipment/shipment-order-complex-model';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  ordermodel: ShipmentOrderComplexModel = new ShipmentOrderComplexModel();

  public showSpinButton: false;

  displayedColumns = ['Package', 'PackingType', 'PackageCount', 'PackageWeightKg', 'PackageVolM' ];

  constructor(private shipmentOrderService: ShipmentOrderService,
              private router: Router,
              private route: ActivatedRoute,
              private emitService: EmitService) { }

  ngOnInit() {

    const orderId = this.route.snapshot.paramMap.get('id');

    this.shipmentOrderService.ComplexModel(orderId).subscribe(a => {this.ordermodel = a; });

  }

  delorder($event: boolean) {
    if ($event) {

      this.shipmentOrderService.DelOrder(this.ordermodel.SystemOrderId).subscribe(a => {
        if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Error, '系统信息', '删除成功', MessageShowType.Toast));
          this.router.navigateByUrl('biz/myorder/list');
        } else {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Error, '系统信息', a.Error.ErrorMsg, MessageShowType.Toast));

        }
      });
    }
  }
}
