import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs, GridComponent, SortDescriptorModel, SortService, SortSettingsModel} from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../../../help/commonsetting';
import {Basereportconfig} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {$e} from 'codelyzer/angular/styles/chars';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';

@Component({
  selector: 'app-logistic-order-data-list',
  templateUrl: './order-data-list.component.html',
  styleUrls: ['./order-data-list.component.css'],
  providers: [SortService]
})
export class LogisticOrderDataListComponent implements OnInit, LogistciOrderInterface  {

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  gridheight: number;

  @Input('inputfromgroup')
  public  inputfromgroup: any;

  initialSort: SortSettingsModel = new class implements SortSettingsModel {
    columns: SortDescriptorModel[];
  };
  public pageSettings = {currentPage: 1, pageSize: 200};

  constructor(private service: Basereportservice) {

  }

  ngOnInit() {
    this.gridheight = Commonsetting.GridHeight3s();
  }

  public get CurrentDataGrid() {
    return this.grid;
  }

 public  Alert() {

    alert('sssss');
 }
  public SearchData(a: any) {

    // alert('组件测试');
    this.inputfromgroup = a;

    const  pagesetting = this.grid.pageSettings;
    a.pageindex = pagesetting.currentPage - 1;
    a.pagesize = pagesetting.pageSize;

    //this.grid.sortModule.onActionComplete();
    this.service.SearchReport(Basereportconfig.Report_logisticmyorderlist, a).subscribe(result => {

      console.log(result);
      this.grid.dataSource = result;

    });
  }
  dataStateChange($event: DataStateChangeEventArgs) {

    console.log($event.action);

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    this.SearchData( this.inputfromgroup);
  }

}
