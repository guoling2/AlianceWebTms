import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Unacceptorderrequest} from '../order-unaccept/unacceptorderrequest';
import {EnterpriseOrderServiceService} from '../../../../../services/CustomerOrder/enterprise-order-service.service';

@Component({
  selector: 'app-updatecarnumber',
  templateUrl: './updatecarnumber.component.html',
  styleUrls: ['./updatecarnumber.component.css']
})
export class UpdatecarnumberComponent implements OnInit {
  carnumber: string;

  constructor(private enterpriseOrderServiceService: EnterpriseOrderServiceService, public dialogRef: MatDialogRef<UpdatecarnumberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  ngOnInit() {

    console.log(this.data);
  }

  save() {

    console.log(this.data);
    this.enterpriseOrderServiceService.MotifyCarNumber(
      {OrderPreparedLogisticIds: this.data, Carnumber: this.carnumber}).subscribe(a => {

      this.dialogRef.close(a);

    });

  }
}
