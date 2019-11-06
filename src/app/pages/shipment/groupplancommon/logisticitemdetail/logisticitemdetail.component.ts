import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Commonsetting} from '../../../../help/commonsetting';
import {EditSettingsModel} from '@syncfusion/ej2-grids';
import {LogisticItemModel} from '../../../../models/shipment/logistic-item-model';
import {LogisticItemService} from '../../../../services/shiipplangroup/logistic-item.service';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {EmitService} from '../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {MatDialog} from '@angular/material/dialog';
import {SelectvehicelComponent} from '../selectvehicel/selectvehicel.component';
import {SpliterorderComponent} from '../SpliterOrderCommand/spliterorder.component';
import {TmsResponseModle} from '../../../../models/tms-response.module';

@Component({
  selector: 'app-biz-logisticitemdetail',
  templateUrl: './logisticitemdetail.component.html',
  styleUrls: ['./logisticitemdetail.component.css']
})
export class LogisticitemdetailComponent implements OnInit {

  gridheight: number = Commonsetting.GridHeightshort();

  public editSettings: EditSettingsModel;

  logisticItemDataSource: LogisticItemModel[];

  @Input()
  ShipmentGroupId: string;
  @Input()
  IputDataGridCss: string;

  @ViewChild('logitsticitemgrid', {static: false})
  public grid: GridComponent;

  @Output('SpliterResultEvent')
  SpliterResultEvent: EventEmitter<TmsResponseModle> = new EventEmitter<TmsResponseModle>();

  constructor(  private dialog: MatDialog, public emitService: EmitService, private logisticItemService: LogisticItemService) { }

  ngOnInit() {
    this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };

    this.logisticItemService.list(this.ShipmentGroupId).subscribe(a => {
      this.logisticItemDataSource = a;
    });

  }

  spliterorder() {


   const selectrods = this.grid.getSelectedRecords();

   if (selectrods.length === 0) {
     this.emitService.eventEmit.emit(
       new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择一条记录进行操作', MessageShowType.Toast));
     return;
   }
    const selectitem = selectrods[0];

    const dialogRef = this.dialog.open(SpliterorderComponent, {
      minHeight: 500,
      minWidth: 600,
      disableClose: true,
      data: selectitem
    });

    dialogRef.afterClosed().subscribe(a => {
      this.SpliterResultEvent.emit(a);
    });
  }

  delorder() {

  }
}
