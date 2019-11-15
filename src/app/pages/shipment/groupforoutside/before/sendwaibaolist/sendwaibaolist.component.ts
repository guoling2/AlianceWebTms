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
import {GroupOrderAtionModel} from '../../../groupforInside/group-order-ation-model';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {Commonsetting} from '../../../../../help/commonsetting';
import {Basereportconfig} from '../../../../../services/base/basereportconfig';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../help/emit-alert-message';
import {LogisticItemComponentService} from '../../../../../services/shiipplangroup/shipplan-item-service.service';
import {Router} from '@angular/router';
import {LogisticItemService} from '../../../../../services/shiipplangroup/logistic-item.service';
import {EmitService} from '../../../../../help/emit-service';

@Component({
  selector: 'app-sendwaibaolist',
  templateUrl: './sendwaibaolist.component.html',
  styleUrls: ['./sendwaibaolist.component.css']
})
export class SendwaibaolistComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private service: Basereportservice,
              private itemServiceService: LogisticItemComponentService,
              private router: Router,   private logisticItemService: LogisticItemService, public emitService: EmitService) { }

  ngOnInit() {
    this.selectOptions = { persistSelection: true };

    this.pageSettings = {pageSize: 100};
    // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: '', ActionStoreId: '', DestCity: ''});
    this.gridheight = Commonsetting.GridHeight2();

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' };
  }


  opentihuo() {

    this.alreadyloadshipmentdatasource = [];


    this.GroupSubItemType = 'out-send';

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

        this.router.navigateByUrl('/biz/shipment/create-outside-shipment/' + this.GroupSubItemType);

      });

    });
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;
    //  alert(this.GroupSubItemType);
    this.service.SearchReport(Basereportconfig.Report_logisticoutsendlist, searchable).subscribe(result => {

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

}
