import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  CheckBoxChangeEventArgs,
  DataStateChangeEventArgs, EditSettingsModel,
  GridComponent,
  PageSettingsModel, RowDeselectEventArgs,
  RowSelectEventArgs,
  SelectionSettingsModel
} from '@syncfusion/ej2-angular-grids';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../../../group-order-ation-model';
import {ShipplanService} from '../../../../../../services/logistic/shipment/shipplan.service';
import {DialogservicesService} from '../../../../../../help/dialogservices.service';
import {MyShpipmentOrderService} from '../../../../../../services/logistic/shipment/myshpipmentorderService';
import {EmitService} from '../../../../../../help/emit-service';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../../../../services/base/basereportservice';
import {Commonsetting} from '../../../../../../help/commonsetting';
import {Basereportconfig} from '../../../../../../services/base/basereportconfig';
import {UpdateModelType} from '../../../../../../models/tms-data-entity';
import {ActivatedRoute, Router} from '@angular/router';
import {ShipplanGroupInsideService} from '../../../../../../services/shiipplangroup/shipplan-group-inside.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../../help/emit-alert-message';
import {ShipplangroudattchlistComponent} from '../shipplangroudattchlist/shipplangroudattchlist.component';
import {ShimentNoSendGroupView} from '../../../../../../models/shipplangroup/shiment-no-send-group-view';
import {LogisticItemService} from '../../../../../../services/shiipplangroup/logistic-item.service';
import {LogisticItemComponentService} from '../../../../../../services/shiipplangroup/shipplan-item-service.service';

@Component({
  selector: 'app-biz-groupinsdecommomlist',
  templateUrl: './groupinsdecommomlist.component.html',
  styleUrls: ['./groupinsdecommomlist.component.css']
})
export class GroupinsdecommomlistComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  public pageSettings: PageSettingsModel;
  tabselected = new FormControl(0);
  public selectOptions: SelectionSettingsModel;
  editSettings: EditSettingsModel;
  toolbar: [];

  @Input()
  public orderStoreSubject: BehaviorSubject<GroupOrderAtionModel>;
  @Input()
  public GroupSubItemType: string;
  public alreadyloadshipmentdatasource: GroupOrderAtionModel[] = [];


  constructor(
    private logisticItemService: LogisticItemService,
    private itemServiceService: LogisticItemComponentService,
    private router: Router,
    private shipplanGroupInsideServiceService: ShipplanGroupInsideService,
    private  shipplanService: ShipplanService,
    private  dialogx: DialogservicesService,
    private  myShpipmentOrderService: MyShpipmentOrderService,
    public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice) { }

  ngOnInit() {

    this.selectOptions = { persistSelection: true };

    this.pageSettings = {pageSize: 100};
    // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: '', DestCity: '', BeginLogisticStoreId: ''});
    this.gridheight = Commonsetting.GridHeight2();

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' };

    // this.toolbar =  [ 'Delete'];
    // this.grid.tool
    //  toolbar: [ 'Delete']
    // this.grid.pageSettings={currentPage:1,pageSize:2};
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;


    let reportId = '';
     switch (this.GroupSubItemType) {

       case 'localtihuo':
         reportId = Basereportconfig.Report_localtihuolist; // 本地提货
         break;
       case  'transfer':
         reportId = Basereportconfig.Report_logistictransfer; // 网点转运
         break;
       case  'songhuo':
         reportId = Basereportconfig.Report_logisticbendisend; // 网点送货
         break;

       default:
         break;
     }
   //  alert(this.GroupSubItemType);
    this.service.SearchReport(reportId, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });
  }


  dataStateChange($event: DataStateChangeEventArgs) {

    console.log('dataStateChange');

    console.log($event);
    if ($event.action.requestType === 'paging') {
      this.searching();
    }


  }



  rowselected($event: RowSelectEventArgs) {



    console.log('加载了rowselected');

    console.log($event);

    if ($event.data === undefined) {
      return;
    }
    // this.orderStoreSubject.next({ShipmentId: $event.data['ShipmentId'], UpdateModelType: UpdateModelType.Attach});

    const shipmentId = $event.data['ShipmentId'];

    console.log(shipmentId);

    const storeshipment = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === shipmentId);


    console.log(storeshipment);

    if (storeshipment === -1) {
      this.alreadyloadshipmentdatasource.push({ShipmentId:  $event.data['ShipmentId'], UpdateModelType: UpdateModelType.Attach});
    } else {
      console.log('已经添加了');
    }

  }

  rowdeselection($event: RowDeselectEventArgs) {

    const shipmentOrderId = $event.data[0]['ShipmentId'];

    const index = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === shipmentOrderId);

    if (index !== -1) {
      this.alreadyloadshipmentdatasource.splice(index, 1);
    }
  }

  checkboxchanged($event: CheckBoxChangeEventArgs) {




    console.log($event);

    const selectredord = [];


    this.grid.getSelectedRecords().forEach(a => {

      selectredord.push(a['ShipmentId']);
    });


    if ($event.checked === false) {

      if ($event.selectedRowIndexes.length === 0) {
        this.alreadyloadshipmentdatasource = [];
      }
      const deleteindex = [];


      this.alreadyloadshipmentdatasource.forEach((item, index) => {

        if (selectredord.findIndex(a => a === item.ShipmentId) === -1) {
          deleteindex.push(index);
        }
      });

      if (deleteindex.length !== 0) {
        deleteindex.forEach(a => {
          this.alreadyloadshipmentdatasource.splice(a, 1);
        });
      }

    } else {

      const addindexs = [];

      selectredord.forEach(a => {

        const add = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === a);

        if (add === -1) {
          addindexs.push(a);
        }

      });

      if (addindexs.length > 0) {

        addindexs.forEach(a => {
          if ( this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === a) === -1) {
            this.alreadyloadshipmentdatasource.push({ShipmentId: a, UpdateModelType: UpdateModelType.Attach });
          }

        });

      }
    }

    console.log(this.alreadyloadshipmentdatasource);
  }

  // 添加运单服务
  attchitem(height, width) {
    const datas = this.grid.getSelectedRecords();
    if (datas.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请添加运单在继续操作', MessageShowType.Toast));

      return;
    }

    const dialogRef = this.dialog.open(ShipplangroudattchlistComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: 'inside'
    });
    // (value: LogisticStore[])
    dialogRef.afterClosed().subscribe((result: ShimentNoSendGroupView) => {

      if (result != null) {


        // shipplanGroupInsideServiceService



        let resultindex = 0;




        datas.forEach(a => {


          resultindex++;


          this.shipplanGroupInsideServiceService.AttchShipmentItem({
            TaskType: '',
            ShipmentId: a['ShipmentId'],
            ShipmentGrpupId: result.PlanGroupId,
            SquenceId: 0
          }).subscribe(resultx => {


            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Succeed, '系统信息',   resultx.Info, MessageShowType.Toast));

            if (resultindex === datas.length) {
              this.emitService.eventEmit.emit(
                new EmitAlertMessage(AlertMessageType.Info, '系统信息',   '请手动刷新数据，技术原因', MessageShowType.Alert));
            }


          });

        });


      }

    });
  }

  opentihuo() {

    this.opentihuo2(this.GroupSubItemType);
    // const selectedrows =  this.grid.getSelectedRecords();
    //
    // if (selectedrows.length === 0) {
    //   return;
    // }
    // // this.tabselected.setValue(1);
    //
    // for (let index = 0; index < selectedrows.length; index++) {
    //
    //   const element = selectedrows[index];
    //
    //   const  x = this.alreadyloadshipmentdatasource[element['ShipmentId']];
    //
    //   if (x == null) {
    //
    //     this.orderStoreSubject.next({ShipmentId: element['ShipmentId'], UpdateModelType: UpdateModelType.Attach});
    //   }
    //
    // }
    //
    // alert('添加完成');


  }
  /**
   * 提货拆出来2个进行配置
   */
  opentihuo2(subtype: string) {



    this.alreadyloadshipmentdatasource = [];

    this.GroupSubItemType = subtype;

    const selectredord = [];

    this.grid.getSelectedRecords().forEach(a => {

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

        this.router.navigateByUrl('/biz/shipment/create-inside-shipment/' + this.GroupSubItemType);

      });

    });




  }
}
