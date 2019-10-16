import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EnterpriseCustomer} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';

@Component({
  selector: 'app-order-data-list',
  templateUrl: './order-data-list.component.html',
  styleUrls: ['./order-data-list.component.css']
})
export class OrderDataListComponent implements OnInit {

  @Input()
  gridheight: number;


  @Input()  outer: EventEmitter<any>;

  @Input() searchindex: number;

  @Output()
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  private  inputfromgroup: any;

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
    this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseOrderList, a).subscribe(result => {

      this.grid.dataSource = result;

    });
  }
  dataStateChange($event: DataStateChangeEventArgs) {
    this.searching( this.inputfromgroup);
  }
}
