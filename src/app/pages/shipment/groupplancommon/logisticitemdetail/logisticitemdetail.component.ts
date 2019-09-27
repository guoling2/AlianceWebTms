import {Component, Input, OnInit} from '@angular/core';
import {Commonsetting} from '../../../../help/commonsetting';
import {EditSettingsModel} from '@syncfusion/ej2-grids';
import {LogisticItemModel} from '../../../../models/shipment/logistic-item-model';
import {LogisticItemService} from '../../../../services/shiipplangroup/logistic-item.service';

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

  constructor(private logisticItemService: LogisticItemService) { }

  ngOnInit() {
    this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };

    this.logisticItemService.list(this.ShipmentGroupId).subscribe(a => {
      this.logisticItemDataSource = a;
    });

  }

}
