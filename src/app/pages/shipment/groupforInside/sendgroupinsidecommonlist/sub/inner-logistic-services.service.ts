import { Injectable } from '@angular/core';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../help/emit-alert-message';
import {GroupOrderAtionModel} from '../../group-order-ation-model';
import {LogisticItemService} from '../../../../../services/shiipplangroup/logistic-item.service';
import {LogisticItemComponentService} from '../../../../../services/shiipplangroup/shipplan-item-service.service';
import {EmitService} from '../../../../../help/emit-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InnerLogisticServicesService {

  constructor(  public router: Router,
                public emitService: EmitService,
                public itemServiceService: LogisticItemComponentService,
                public logisticItemService: LogisticItemService ) { }
  public OpenLogistciOrder(subtype: string, datasource: Object[]) {
   // const alreadyloadshipmentdatasource = new GroupOrderAtionModel[] ;

   // const GroupSubItemType = subtype;

    const selectredord = [];

    datasource.forEach(a => {

      selectredord.push(a['ShipmentId']);
    });

    this.itemServiceService.ClearData();


    let i = selectredord.length;

    selectredord.forEach(a => {

      this.logisticItemService.detail(a, '').subscribe(item => {

        i--;
        if (item.ShipmentPlanId === null) {
          this.itemServiceService.AttchItem(item);
        } else {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Error, '系统信息', '已经添加', MessageShowType.Toast));
        }

        this.router.navigateByUrl('/biz/shipment/create-inside-shipment/' + subtype);

      });

    });


  }
}
