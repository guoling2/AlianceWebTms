import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs, PageSettingsModel, SortDescriptorModel, Sorts, SortSettingsModel} from '@syncfusion/ej2-grids';
import {GridComponent, SortService} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Basereportconfig, EnterpriseCustomer} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';
import {LogistciOrderInterface} from '../../../../../pageservices/logistci-order-interface';
import {Commonsetting} from '../../../../../help/commonsetting';

@Component({
  selector: 'app-order-data-list',
  templateUrl: './order-data-list.component.html',
  styleUrls: ['./order-data-list.component.css'],
  providers: [SortService]
})
export class OrderDataListComponent implements OnInit , LogistciOrderInterface {


  @Input()
  gridheight: number;

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public pageSettings = {currentPage: 1, pageSize: 200};

  initialSort: SortSettingsModel = new class implements SortSettingsModel {
    columns: SortDescriptorModel[];
  };
  public  inputfromgroup: any;

  constructor(private fb: FormBuilder, private service: Basereportservice) { }


  ngOnInit() {
    this.gridheight = Commonsetting.GridHeight3s();
  }


  public get CurrentDataGrid() {
    return this.grid;
  }

  public SearchData(a: any) {
    this.inputfromgroup = a;

    const  pagesetting = this.grid.pageSettings;
    a.pageindex = pagesetting.currentPage - 1;
    a.pagesize = pagesetting.pageSize;


    console.log(a);
    this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseOrderList, a).subscribe(result => {

      console.log(result);
      this.grid.dataSource = result;

    });
  }
  public Alert() {
    throw new Error("Method not implemented.");
  }


  dataStateChange($event: DataStateChangeEventArgs) {


    console.log($event.action);

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    this.SearchData( this.inputfromgroup);
  }

}
