import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../help/emit-alert-message';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {TmsresponseStatusCode} from '../../../../../models/tms-response.module';
import {TextBoxComponent} from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-order-accept',
  templateUrl: './order-accept.component.html',
  styleUrls: ['./order-accept.component.css']
})
export class OrderAcceptComponent implements OnInit {
  ErrorMsg: string;
  logistticstores: LogisticStore[];
  public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };

  @ViewChild('sample', {static: false})  public listObj: DropDownListComponent;

  @ViewChild('tihuonumbertxt', {static: false}) public tihuonumbertxt: TextBoxComponent;

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService,
              public dialogRef: MatDialogRef<OrderAcceptComponent>,
              private logisticStoreServiceService: LogisticStoreServiceService,
              @Inject(MAT_DIALOG_DATA) public selectrows: Object[]) { }

  ngOnInit() {

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {
      this.logistticstores = value;
    });
  }

  SaveData($event: MouseEvent) {



   // console.log(this.listObj.value);

    this.selectrows.forEach((a, index) => {
      this.enterpriseOrderServiceService.AcceptOrder({
        OrderPreparedLogisticId: a['OrderPreparedLogisticId'],
        BeginLogisticStoreId: this.listObj.value === null ? '' : this.listObj.value.toString(),
        NotifyCarNumber: this.tihuonumbertxt.value

      }).subscribe(result => {

        if (result.StatusCode !== TmsresponseStatusCode.Succeed()) {
            this.ErrorMsg = result.Error.ErrorMsg;
        } else {

          if (index ===  this.selectrows.length - 1) {
            this.dialogRef.close(true);
          }
        }

        //
        // if()
        // this.emitService.eventEmit.emit(
        //   new EmitAlertMessage(AlertMessageType.Info,
        //     '系统信息', result.Info, MessageShowType.Toast));


      });
    });
  }

  close() {
    this.dialogRef.close();

  }
}
