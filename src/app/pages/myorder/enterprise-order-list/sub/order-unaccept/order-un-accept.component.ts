import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Unacceptorderrequest} from './unacceptorderrequest';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';
@Component({
  selector: 'app-order-un-accept',
  templateUrl: './order-un-accept.component.html',
  styleUrls: ['./order-un-accept.component.css']
})
export class OrderUnAcceptComponent implements OnInit {


  public closedReason: string;

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService, public dialogRef: MatDialogRef<OrderUnAcceptComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Unacceptorderrequest) { }

  ngOnInit() {
  }

  save() {

    console.log(this.data);
    this.enterpriseOrderServiceService.UnAcceptOrder(this.data.OrderPreparedLogisticId, this.data.ClosedReason).subscribe(a => {

      this.dialogRef.close(a);

    });

  }
}
