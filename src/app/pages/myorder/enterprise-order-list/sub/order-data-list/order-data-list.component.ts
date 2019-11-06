import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs, PageSettingsModel, SortDescriptorModel, Sorts, SortSettingsModel} from '@syncfusion/ej2-grids';
import {GridComponent, SortService} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EnterpriseCustomer} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {DataGridHelp} from '../../../../../SyncfusionHelp/data-grid-help';

@Component({
  selector: 'app-order-data-list',
  templateUrl: './order-data-list.component.html',
  styleUrls: ['./order-data-list.component.css'],
  providers: [SortService]
})
export class OrderDataListComponent implements OnInit {

  @Input()
  gridheight: number;


  @Input()  outer: EventEmitter<any>;

  @Input() searchindex: number;

  @Output()
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  public pageSettings = {currentPage: 1, pageSize: 200};

  initialSort: SortSettingsModel = new class implements SortSettingsModel {
    columns: SortDescriptorModel[];
  };
  public  inputfromgroup: any;

  constructor(private fb: FormBuilder, private service: Basereportservice) { }


  ngOnInit() {

    this.outer.subscribe(a => {

      this.inputfromgroup = a;

      this.searching(this.inputfromgroup);

    });

  }

  searching(a: any) {
    const  pagesetting = this.grid.pageSettings;
    a.pageindex = pagesetting.currentPage;
    a.pagesize = pagesetting.pageSize;

    console.log(a);
    this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseOrderList, a).subscribe(result => {

      this.grid.dataSource = result;

    });
  }
  dataStateChange($event: DataStateChangeEventArgs) {


    console.log(DataGridHelp.GetSortColumn($event));

    this.inputfromgroup = DataGridHelp.GetSortObject($event, this.inputfromgroup);

    // tslint:disable-next-line:no-unused-expression

    this.searching( this.inputfromgroup);
  }
}
