import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PricetemplateinsertComponent} from '../pricetemplateinsert/pricetemplateinsert.component';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserPriceTemplateSettingService} from '../../../services/pricestrategy/user-price-template-setting.service';
import {Commonsetting} from '../../../help/commonsetting';

@Component({
  selector: 'app-pricetemplatelist',
  templateUrl: './pricetemplatelist.component.html',
  styleUrls: ['./pricetemplatelist.component.css']
})
export class PricetemplatelistComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(private fb: FormBuilder, private userPriceTemplateSettingService: UserPriceTemplateSettingService, private dialog: MatDialog) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { Name: ''});
    this.gridheight = Commonsetting.GridHeight();
  }
  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage - 1;
    searchable.pagesize = pagesetting.pageSize;

    this.userPriceTemplateSettingService.Search(searchable).subscribe(result => {
      console.log( result);
      this.grid.dataSource = result;
    }); }

  dataStateChange($event: DataStateChangeEventArgs) {

    this.searching();
  }
  openinsert() {
    const dialogRef = this.dialog.open(PricetemplateinsertComponent, {
      minWidth: 500,
      minHeight: 500,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(a => {

    });
  }
}
