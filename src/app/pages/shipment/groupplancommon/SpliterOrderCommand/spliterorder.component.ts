import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ShipmentPlanItemService} from '../../../../services/shipment/shipment-plan-item.service';
import {LogisticItemModel} from '../../../../models/shipment/logistic-item-model';
import {ShipPlanItemModel} from '../../../../models/shipment/ship-plan-item-model';
import {ChangeEventArgs} from '@syncfusion/ej2-inputs';
import {TmsResponseModle} from '../../../../models/tms-response.module';

@Component({
  selector: 'app-spliterorder',
  templateUrl: './spliterorder.component.html',
  styleUrls: ['./spliterorder.component.css']
})
export class SpliterorderComponent implements OnInit {

  displayedColumns: string[] = ['ShipmentStockId', 'Package',
    'PackageCount', 'SendCount', 'SendWeight', 'SendVol', 'Action'];

  senditems: ShipPlanItemModel[];


  constructor( public dialogRef: MatDialogRef<SpliterorderComponent>,
               private fb: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public parameter: LogisticItemModel, private shipmentPlanItemService: ShipmentPlanItemService) { }

  ngOnInit() {
   // systemOrderId: string,  shipmentId: string,  shipmentPlanId: string
    this.shipmentPlanItemService.QueryItemsByPlanIdAndShipidAndItemId(
      this.parameter.SystemOrderId, this.parameter.ShipmentId, this.parameter.ShipmentPlanId
    ).subscribe(a => {

      this.senditems = a;
    });

  }

  changesendcount($event: ChangeEventArgs, ShipmentStockId: number) {


   const storeitem =  this.senditems.find(t => t.ShipmentStockId === ShipmentStockId);

   if (storeitem === null) {
     return;
   }

   if (storeitem.PackageCount === 0) {
     return;
   }
    if (storeitem.PackageVol !== 0) {

      storeitem.SendVol = (storeitem.PackageVol / storeitem.PackageCount) * $event.value;
    }
    if (storeitem.PackageWeight !== 0) {
      storeitem.SendWeight = (storeitem.PackageWeight / storeitem.PackageCount) * $event.value;
    }
    storeitem.SendCount = $event.value;
    console.log($event);
  }

  close() {
    this.dialogRef.close();
  }

  savetrin(ShipmentStockId: number) {
    const storeitem =  this.senditems.find(t => t.ShipmentStockId === ShipmentStockId);

    this.shipmentPlanItemService.TrimSendCount(storeitem).subscribe(
      c => {
        this.dialogRef.close(c);
        console.log(c);
      });
  }
}
