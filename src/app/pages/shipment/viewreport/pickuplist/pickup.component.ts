import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {Basereportservice} from '../../../../services/base/basereportservice';
import {Commonsetting} from '../../../../help/commonsetting';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportconfig} from '../../../../services/base/basereportconfig';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

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
    this.service.SearchReport(Basereportconfig.Report_tihuoafterlist, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });

  }

  dataStateChange($event: DataStateChangeEventArgs) {

    this.searching();
  }

}
