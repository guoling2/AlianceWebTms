import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShipplanGroupInsideService} from '../../../../services/shiipplangroup/shipplan-group-inside.service';
import {ShipplanGroupOutsideService} from '../../../../services/shiipplangroup/shipplan-group-outside.service';
import {OutsideShipmentGroupModel} from '../../../../models/shipplangroup/outside-shipment-group-model';
import {TmssaveconfirmEvent} from '../../../../directive/tmssaveconfirm.directive';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {EmitService} from '../../../../help/emit-service';

@Component({
  selector: 'app-outside-plan-group-detail',
  templateUrl: './outside-plan-group-detail.component.html',
  styleUrls: ['./outside-plan-group-detail.component.css']
})
export class OutsidePlanGroupDetailComponent implements OnInit {

  outsideShipmentGroup: OutsideShipmentGroupModel;
  constructor( private emitService: EmitService, private route: ActivatedRoute, private shipplanGroupOutsideService: ShipplanGroupOutsideService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.shipplanGroupOutsideService.Detail(id).subscribe(a => {
      this.outsideShipmentGroup = a;
    });
  }

  Del(event: TmssaveconfirmEvent) {

    if (event.ActionFlag === false) {
      return;
    }
    this.shipplanGroupOutsideService.DelShipplanGroup(event.ExtendData.toString()).subscribe(a => {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
        //  this.logisticItemService.ClearData();
        window.history.back();
      }
    });
     // alert(event.ExtendData.toString());
  }

  Send(ShipmentGroupId: string) {

  }
}
