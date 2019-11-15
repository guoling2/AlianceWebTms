import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {VehicleContainerService} from '../../../../../services/vehiclemanagement/vehicle-container.service';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {Basereportconfig} from '../../../../../services/base/basereportconfig';
import {GridDataSource} from '../../../../../models/grid-data-source';
import {Commonsetting} from '../../../../../help/commonsetting';

@Component({
  selector: 'app-waibaosendlist',
  templateUrl: './waibaosendlist.component.html',
  styleUrls: ['./waibaosendlist.component.css']
})
export class WaibaosendlistComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { TrincName: '', PlanStatuedId: '', OrderTrackServerId: ''});
    this.gridheight = Commonsetting.GridHeight();
  }
  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_outsendlistafterlist, searchable).subscribe(result => {

      console.log( result);
      this.grid.dataSource = result;
      // {
      //   count: result.TotalCount,
      //   result: result.QueryResult
      // };

    }); }

  dataStateChange($event: DataStateChangeEventArgs) {

    this.searching();
  }
}
