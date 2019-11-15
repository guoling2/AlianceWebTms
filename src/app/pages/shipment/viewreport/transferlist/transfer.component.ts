import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../../services/base/basereportservice';
import {Commonsetting} from '../../../../help/commonsetting';
import {Basereportconfig} from '../../../../services/base/basereportconfig';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false })
  public grid: GridComponent;
  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: '10', ActionStoreId: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;
    console.log(searchable);
    this.service.SearchReport(Basereportconfig.Report_logistictransferlist, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });

  }

  dataStateChange($event: DataStateChangeEventArgs) {

    this.searching();
  }

}
