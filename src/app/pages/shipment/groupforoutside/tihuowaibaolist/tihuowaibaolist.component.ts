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
import {GroupOrderAtionModel} from '../../groupforInside/group-order-ation-model';
import {Commonsetting} from '../../../../help/commonsetting';
import {Basereportservice} from '../../../../services/base/basereportservice';
import {Basereportconfig} from '../../../../services/base/basereportconfig';

@Component({
  selector: 'app-tihuowaibaolist',
  templateUrl: './tihuowaibaolist.component.html',
  styleUrls: ['./tihuowaibaolist.component.css']
})
export class TihuowaibaolistComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {
    this.selectOptions = { persistSelection: true };

    this.pageSettings = {pageSize: 100};
    // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: ''});
    this.gridheight = Commonsetting.GridHeight3();

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' };
  }


  opentihuo() {

  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;
    //  alert(this.GroupSubItemType);
    this.service.SearchReport(Basereportconfig.Report_logisticouttihuolist, searchable).subscribe(result => {

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
