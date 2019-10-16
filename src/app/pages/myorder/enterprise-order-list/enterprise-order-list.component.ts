import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Basereportconfig, EnterpriseCustomer} from '../../../services/base/basereportconfig';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {AnimationSettingsModel, ButtonPropsModel} from '@syncfusion/ej2-popups';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {OrderDataListComponent} from './sub/order-data-list/order-data-list.component';
import {EnterpriseOrderServiceService} from '../../../services/CustomerOrder/enterprise-order-service.service';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';

@Component({
  selector: 'app-enterprise-order-list',
  templateUrl: './enterprise-order-list.component.html',
  styleUrls: ['./enterprise-order-list.component.css']
})
export class EnterpriseOrderListComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;

  private selectindex = 0;

  public outernosend = new EventEmitter<any>();
  public alldata = new EventEmitter<any>();


  @ViewChild('outdatagrid', {static: false})
  public outdatagrid: OrderDataListComponent;

  constructor(  private emitService: EmitService, private fb: FormBuilder, private service: Basereportservice, private enterpriseOrderServiceService: EnterpriseOrderServiceService) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { CustomerOrderId: ''});
    this.gridheight = Commonsetting.GridHeight4();
  }

  searching() {
    const searchable = this.searchp.getRawValue ();


    searchable.searchindex = this.selectindex;
    if (this.selectindex === 0) {
      searchable.OrderStatued = 10;
      this.outernosend.emit(searchable);
    } else if (this.selectindex === 1) {
      this.alldata.emit(searchable);
    }

  }
  tabchanged($event: MatTabChangeEvent) {

   this.selectindex = $event.index;
  }

  getorder($event: boolean) {


    if ($event === false) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error,
          '系统信息', '没有可以操作的订单！', MessageShowType.Toast));
      return; }

    const selectrows = this.outdatagrid.grid.getSelectedRecords();

    selectrows.forEach((a, index) => {
      this.enterpriseOrderServiceService.AcceptOrder({
        OrderPreparedLogisticId: a['OrderPreparedLogisticId'],
        BeginLogisticStoreId: ''

      }).subscribe(result => {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info,
            '系统信息', result.Info, MessageShowType.Toast));

        if (index === selectrows.length - 1) {
          this.searching();
        }
      });
    });
   // OrderSystemOrderId
    console.log(selectrows);
  }
}
