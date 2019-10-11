import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShipplanGroupInsideService} from '../../../../services/shiipplangroup/shipplan-group-inside.service';
import {InsideShipmentGroupModel} from '../../../../models/shipplangroup/inside-shipment-group-model';
import {EditSettingsModel} from '@syncfusion/ej2-grids';
import {LogisticItemService} from '../../../../services/shiipplangroup/logistic-item.service';
import {LogisticItemModel} from '../../../../models/shipment/logistic-item-model';
import {Commonsetting} from '../../../../help/commonsetting';
import {DialogservicesService} from '../../../../help/dialogservices.service';
import {EmitService} from '../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {DataGridWeightConvert} from '../../../../SyncfusionHelp/data-grid-weight-convert';
import { AggregateService, GroupService, GridComponent } from '@syncfusion/ej2-angular-grids';
@Component({

  selector: 'app-groupdetail',
  templateUrl: './groupdetail.component.html',
  styleUrls: ['./groupdetail.component.css'],
  providers: [AggregateService, GroupService]
})
export class GroupdetailComponent implements OnInit {

  gridheight: number;
  insideShipmentGroup: InsideShipmentGroupModel;

  logisticItemDataSource: LogisticItemModel[];

  public editSettings: EditSettingsModel;


  public dataGridWeightConvert: DataGridWeightConvert;
  constructor(
    private emitService: EmitService,
    private logisticItemService: LogisticItemService,
    private route: ActivatedRoute,
    private shipplanGroupInsideServiceService: ShipplanGroupInsideService,
    private  dialogx: DialogservicesService) { }

  ngOnInit() {

    this.gridheight = Commonsetting.GridHeightshort();

    this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };

    this.shipplanGroupInsideServiceService.InsideGroupDetail(this.route.snapshot.params['id']).subscribe(a => {
      this.insideShipmentGroup = a;
    });

    this.logisticItemService.list(this.route.snapshot.params['id']).subscribe(a => {
      this.logisticItemDataSource = a;
    });
  }

  /**
   * 发运
   */
  Send(ShipmentGroupId: string) {

    const alerter = {
      Title: '确认',
      Message: '是否发运，发运将无法修改和添加托运单,并直接传输到司机终端。',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {
          this.shipplanGroupInsideServiceService.SetIsSend(ShipmentGroupId).subscribe(a => {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
              location.reload();
          });
        } finally {

        }

      })};
    this.dialogx.openDialog(alerter);
  }

  Del(ShipmentGroupId: string) {
    const alerter = {
      Title: '确认',
      Message: '是否删除派车单?',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {
          this.shipplanGroupInsideServiceService.DelShipGroup(ShipmentGroupId).subscribe(a => {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
            if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
            //  this.logisticItemService.ClearData();
              window.history.back();
            }
          });
        } finally {

        }

      })};
    this.dialogx.openDialog(alerter);
  }
}
