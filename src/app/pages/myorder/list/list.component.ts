import {Component, OnInit, ViewChild} from '@angular/core';
import {Commonsetting} from '../../../help/commonsetting';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {MatDialog} from '@angular/material';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {Basereportservice} from '../../../services/base/basereportservice';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {MyShpipmentOrderService} from '../../../services/logistic/shipment/myshpipmentorderService';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {OrdercustomerComponent} from '../_sub/ordercustomer/ordercustomer.component';
import {OrderitemtagprintComponent} from '../_sub/orderitemtagprint/orderitemtagprint.component';

@Component({
  selector: 'app-myorderlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MyOrderListComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor(private  dialogx: DialogservicesService, private  myShpipmentOrderService: MyShpipmentOrderService, public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice ) {

  }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', LosigticTrackStatued: '1'});
    this.gridheight = Commonsetting.GridHeight();
  }

  public  dataStateChange(datastate: DataStateChangeEventArgs): void {

    this.searching();
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_logisticmyorderlist, searchable).subscribe(result => {

      this.grid.dataSource = result;

    }); }

  /**
   * 创建自有订单后续操作
   */
  createmyshipmentorder () {
    const selectedrows =  this.grid.getSelectedRecords();
    if (selectedrows.length === 0) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！', MessageShowType.Alert));
      return;
    }
    const  ids = [];
    for (const value  of selectedrows ) {
        console.log(value['OrderLogisticDetailId']);
      ids.push(value['OrderLogisticDetailId']);
    }

    const alerter = {
      Title: '确认',
      Message: '是否下达到物流',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }


        for (let index = 0; index < ids.length; index++) {
          const element = ids[index];

          this.myShpipmentOrderService.CreateMyShipment(element).subscribe(a => {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info));
            if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {
              console.log(a.StatusCode);
              console.log(TmsresponseStatusCode.Succeed());
              if (index === ids.length - 1) {
                this.searching();
              }

            }

            console.log(a);
          });
        }

      })};
    this.dialogx.openDialog(alerter);


  }

  printordertag(minHeight: number, minWidth: number) {
    const selectedrows =  this.grid.selectedRowIndex;

    if (selectedrows === -1) {
      return;
    }

    if ( this.grid.getSelectedRecords().length !== 1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择一条数据进行操作！', MessageShowType.Alert));
      return;
    }
    console.log( this.grid.getSelectedRecords()[0]['OrderLogisticDetailId']);

    const dialogRef = this.dialog.open(OrderitemtagprintComponent, {
      minHeight: minHeight,
      minWidth: minWidth,
      disableClose: false,
      data:  this.grid.getSelectedRecords()[0]['OrderLogisticDetailId']
    });
  }
}
