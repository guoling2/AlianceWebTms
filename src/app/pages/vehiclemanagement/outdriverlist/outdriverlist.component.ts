import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Commonsetting} from '../../../help/commonsetting';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Basereportconfig} from '../../../services/base/basereportconfig';

@Component({
  selector: 'app-outdriverlist',
  templateUrl: './outdriverlist.component.html',
  styleUrls: ['./outdriverlist.component.css']
})
export class OutdriverlistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor( private fb: FormBuilder, private service: Basereportservice) { }
  ngOnInit() {
    this.searchp = this.fb.group(
      { Trnum: ''});
    this.gridheight = Commonsetting.GridHeight();
  }
  Search () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;



    //  alert(this.GroupSubItemType);
    this.service.SearchReport(Basereportconfig.Report_couttracklist, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });
  }
  dataStateChange($event: DataStateChangeEventArgs) {

    console.log('dataStateChange');

    console.log($event);
    if ($event.action.requestType === 'paging') {
      this.Search();
    }


  }

}
