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
import {OrderAcceptComponent} from './sub/order-accept/order-accept.component';
import {MatDialog} from '@angular/material/dialog';
import {DefaultdepotsettingComponent} from './sub/defaultdepotsetting/defaultdepotsetting.component';

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

  constructor( public dialog: MatDialog, private emitService: EmitService, private fb: FormBuilder, private service: Basereportservice, private enterpriseOrderServiceService: EnterpriseOrderServiceService) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { CustomerOrderId: '', OrigincustomPhysicalDeotName: '', DestCity: ''});
    this.gridheight = Commonsetting.GridHeight4();
  }

  searching() {
    const searchable = this.searchp.getRawValue ();


    searchable.searchindex = this.selectindex;
    if (this.selectindex === 0) {
      searchable.ConfirmOrder = 0;
      this.outernosend.emit(searchable);
    } else if (this.selectindex === 1) {
      searchable.ConfirmOrder = 1;
      this.alldata.emit(searchable);
    }

  }
  tabchanged($event: MatTabChangeEvent) {

   this.selectindex = $event.index;
  }

  getorder(height: string, width: string) {


    const selectrows = this.outdatagrid.grid.getSelectedRecords();


    if (selectrows.length < 1) {
      return;
    }

      const dialogRef = this.dialog.open(OrderAcceptComponent, {
        height: height,
        width: width,
        disableClose: false,
        data: selectrows
      });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', '接单成功！', MessageShowType.Toast));
        this.searching();
      }

    });
   // OrderSystemOrderId
    console.log(selectrows);
  }

  opensettingdepot(s: number, s2: number) {

    const dialogRef = this.dialog.open(DefaultdepotsettingComponent, {
      minHeight: Commonsetting.GetScrollHeight() - s,//160
      minWidth: Commonsetting.GetScrollWidth() - s2, //500
      disableClose: false
    });
  }
}
