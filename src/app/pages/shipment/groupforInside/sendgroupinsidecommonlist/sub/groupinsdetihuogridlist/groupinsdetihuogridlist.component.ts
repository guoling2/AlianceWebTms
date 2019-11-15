import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  DataStateChangeEventArgs,
  EditSettingsModel,
  GridComponent,
  PageSettingsModel,
  SelectionSettingsModel
} from '@syncfusion/ej2-angular-grids';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../../../group-order-ation-model';
import {LogisticItemService} from '../../../../../../services/shiipplangroup/logistic-item.service';
import {LogisticItemComponentService} from '../../../../../../services/shiipplangroup/shipplan-item-service.service';
import {Router} from '@angular/router';
import {ShipplanGroupInsideService} from '../../../../../../services/shiipplangroup/shipplan-group-inside.service';
import {ShipplanService} from '../../../../../../services/logistic/shipment/shipplan.service';
import {DialogservicesService} from '../../../../../../help/dialogservices.service';
import {MyShpipmentOrderService} from '../../../../../../services/logistic/shipment/myshpipmentorderService';
import {EmitService} from '../../../../../../help/emit-service';
import {MatDialog} from '@angular/material/dialog';
import {Basereportservice} from '../../../../../../services/base/basereportservice';
import {Commonsetting} from '../../../../../../help/commonsetting';
import {Basereportconfig} from '../../../../../../services/base/basereportconfig';
import {InnerLogisticServicesService} from '../inner-logistic-services.service';

@Component({
  selector: 'app-biz-groupinsdetihuogridlist',
  templateUrl: './groupinsdetihuogridlist.component.html',
  styleUrls: ['./groupinsdetihuogridlist.component.css']
})
export class GroupinsdetihuogridlistComponent implements OnInit {

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
              private innerLogisticServicesService: InnerLogisticServicesService,
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
      { OrderTrackServerId: '', PlanStatuedId: '', OrderGoWay: '', BeginLogisticStoreId: ''});
    this.gridheight = Commonsetting.GridHeight2();

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' };
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

  opentihuo2(localtihuo: string) {

    this.innerLogisticServicesService.OpenLogistciOrder(localtihuo, this.grid.getSelectedRecords());
  }
}
