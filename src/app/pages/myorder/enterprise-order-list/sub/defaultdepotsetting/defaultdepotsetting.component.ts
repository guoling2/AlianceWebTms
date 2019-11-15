import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Basereportservice} from '../../../../../services/base/basereportservice';
import {EnterpriseCustomer} from '../../../../../services/base/basereportconfig';
import {DataStateChangeEventArgs, GridComponent, SortDescriptorModel, SortSettingsModel} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {PhysicalDepotAuthorizedServiceService} from '../../../../../services/base/physical-depot-authorized-service.service';
import {EmitService} from '../../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../help/emit-alert-message';
import {TextBoxComponent} from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-biz-defaultdepotsetting',
  templateUrl: './defaultdepotsetting.component.html',
  styleUrls: ['./defaultdepotsetting.component.css']
})
export class DefaultdepotsettingComponent implements OnInit {

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  logistticstores: LogisticStore[];
  public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };

  public pageSettings = {currentPage: 0, pageSize: 20};

  savemodel: FormGroup;

  @ViewChild('sample', {static: false})  public listObj: DropDownListComponent;

  public searchcontent: string; // 查询参数

  initialSort: SortSettingsModel = new class implements SortSettingsModel {
    columns: SortDescriptorModel[];
  };

  constructor(private emitService: EmitService, private physicalDepotAuthorizedServiceService: PhysicalDepotAuthorizedServiceService,  private logisticStoreServiceService: LogisticStoreServiceService, private fb: FormBuilder, private service: Basereportservice, public dialogRef: MatDialogRef<DefaultdepotsettingComponent>) { }

  ngOnInit() {

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {
      this.logistticstores = value;
    });

    this.savemodel = this.fb.group(
      { AcceptStoreId: ''});



    this.search('');
  }

  private search(contenxt: string) {

    console.log(this.searchcontent);
    this.service.SearchReport(EnterpriseCustomer.Report_EnterpriseAcceptDepotList, {
      pageindex: 0, pagesize: 200, DepotName: contenxt
    }).subscribe(result => {

      this.grid.dataSource = result;

    });
  }
  dataStateChange($event: DataStateChangeEventArgs) {

  }

  settingdepotId() {

    alert(this.listObj.value);
    console.log(this.listObj.value);

    if ( this.grid.getSelectedRows().length === 0) {
      return;
    }

    const depitIds = this.grid.getSelectedRecords().map((a) => {
      console.log(a);
      return a['DepotAuthorizeId'];
    }).reverse();

    this.physicalDepotAuthorizedServiceService.SetDefaultAcceptOrderStore(this.listObj.value.toString(), depitIds)
      .subscribe(a => {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
          this.search('');
      }
      );

  }

  searchdepot() {

    this.search(this.searchcontent);

  }
}
