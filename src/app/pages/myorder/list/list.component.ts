import {Component, ComponentFactoryResolver, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Commonsetting} from '../../../help/commonsetting';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../services/base/basereportservice';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';
import {TmsResponseModle, TmsresponseStatusCode} from '../../../models/tms-response.module';
import {MyShpipmentOrderService} from '../../../services/logistic/shipment/myshpipmentorderService';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {OrderitemtagprintComponent} from '../_sub/orderitemtagprint/orderitemtagprint.component';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {LogisticOrderDataListComponent} from './sub/order-data-list/order-data-list.component';
import {LogistciOrderInterface} from '../../../pageservices/logistci-order-interface';
import {TemplatePortal} from '@angular/cdk/portal';
import {OrderchangerouteComponent} from '../_sub/orderchangeroute/orderchangeroute.component';
import {OrderChangeRequestModel} from '../_sub/order-change-request-model';
import {ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-myorderlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyOrderListComponent implements OnInit {
  constructor(private factoryResolver: ComponentFactoryResolver,
              private renderer2: Renderer2 ,
              private  dialogx: DialogservicesService,
              private  myShpipmentOrderService: MyShpipmentOrderService,
              public emitService: EmitService,
              private fb: FormBuilder,
              public dialog: MatDialog, private service: Basereportservice ) {

  }
  gridheight: number;
  searchp: FormGroup;

  @ViewChild('gdi1', {static: false})
  public gdi1: LogisticOrderDataListComponent;
  @ViewChild('gdi2', {static: false})
  public gdi2: LogisticOrderDataListComponent;

  @ViewChild('tabgroup', {static: false})
  public currenttab: MatTabGroup;

  public currentLogisticOrderDataListComponent: LogisticOrderDataListComponent;

  ngOnInit() {
    this.searchp = this.fb.group(
      {BeginLogisticStoreId: '', DestCity: '', OrderTrackServerId: '', LosigticTrackStatued: '1', PrimaryDestservicedType: ''});
    this.gridheight = Commonsetting.GridHeight2();

  //  this.currenttab.selectedIndex = 1;

  }

  // public  dataStateChange(datastate: DataStateChangeEventArgs): void {
  //
  //   this.searching();
  // }

  searching () {




    // alert('aaaa');
    //
    // const tabcontent = this.currenttab._tabs.find(t => t.isActive === true).content;
    //
    // try {
    //   console.log('tabcontenting');
    //   const userSettingsPortal = new ComponentPortal(LogisticOrderDataListComponent, tabcontent.viewContainerRef);
    //
    //   console.log(tabcontent.templateRef);
    //
    //   console.log('userSettingsPortal.component');
    //
    //   userSettingsPortal.component.call(this, 'Alert');
    //  // console.log((userSettingsPortal.component.prototype as Function[][0]));
    //   console.log('tabcontentend');
    // } catch (e) {
    //   console.log(e);
    // }

    // LogistciOrderInterface searx = null;

    const letgrid = this.GetCurrentDataGrid();

    switch (this.currenttab.selectedIndex) {
      case  0:
        this.searchp.patchValue({'PrimaryDestservicedType': '1'});
        break;
      case 1:
        this.searchp.patchValue({'PrimaryDestservicedType': '2'});
        break;
    }
    const searchable = this.searchp.getRawValue ();
    console.log(searchable);

    letgrid.SearchData(searchable);
  //  let factory=this.factoryResolver.resolveComponentFactory(LogisticOrderDataListComponent);//factory是一个如何创建组件的实例
    // this.conRef.createComponent(factory)
    // this.renderer2.



    // this.componentFactoryResolver.resolveComponentFactory()

    // const sp = <LogistciOrderInterface>this.currentLogisticOrderDataListComponent;
    //
    // console.log(sp);
  // ().SearchData(searchable);
    // this.service.SearchReport(Basereportconfig.Report_logisticmyorderlist, searchable).subscribe(result => {
    //
    //   this.grid.dataSource = result;
    //
    // });
  }

  /**
   * 获取当前使用的表格
   */
  private  GetCurrentDataGrid(): LogistciOrderInterface {

    let interfacex = null;
    switch (  this.currenttab.selectedIndex ) {
      case 0:
        interfacex = <LogistciOrderInterface>this.gdi1;

        break;
      case 1:
        interfacex = <LogistciOrderInterface>this.gdi2;
        break;
    }
    return  interfacex;
  }
  /**
   * 创建自有订单后续操作
   */
  createmyshipmentorder () {

    const grid = this.GetCurrentDataGrid().CurrentDataGrid;
    const selectedrows =  grid.getSelectedRecords();
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
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
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


    const grid = this.GetCurrentDataGrid().CurrentDataGrid;

    const selectedrows = grid.selectedRowIndex;

    if (selectedrows === -1) {
      return;
    }

    if ( grid.getSelectedRecords().length !== 1) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择一条数据进行操作！', MessageShowType.Alert));
      return;
    }
    console.log(grid.getSelectedRecords()[0]['OrderLogisticDetailId']);

    const dialogRef = this.dialog.open(OrderitemtagprintComponent, {
      minHeight: minHeight,
      minWidth: minWidth,
      disableClose: false,
      data: grid.getSelectedRecords()[0]['OrderLogisticDetailId']
    });
  }
  tabchanged($event: MatTabChangeEvent) {

    const currentdatalist = <TemplatePortal<LogisticOrderDataListComponent>>$event.tab.content;

    console.log(currentdatalist);

  }

  // 送货调整
  motifychangeroute(minHeight: number, minWidth: number) {

    const grid = this.GetCurrentDataGrid().CurrentDataGrid;

    const selectedrows = grid.getSelectedRecords();

    if (selectedrows.length === 0) {
      return;
    }

    const mapresult = selectedrows.map((a: object) => {
      return {
        OrderLogisticDetailId: a['OrderLogisticDetailId']
      };
    }).reverse();

    const dialogRef = this.dialog.open(OrderchangerouteComponent, {
      minHeight: minHeight,
      minWidth: minWidth,
      disableClose: true,
      data: mapresult
    });

    dialogRef.afterClosed().subscribe(c => {
       if (c !== undefined) {
         const result =  <TmsResponseModle>c;
         this.emitService.eventEmit.emit(
           new EmitAlertMessage(AlertMessageType.Info, '系统信息', result.Info, MessageShowType.Alert));
         return;
       }
    });
  }
}
