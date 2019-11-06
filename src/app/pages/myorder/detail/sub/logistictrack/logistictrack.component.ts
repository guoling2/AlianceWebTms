import {Component, Input, OnInit} from '@angular/core';
import {OrderFlowMessageServices} from '../../../../../services/base/orderflowmessageservices';
import {OrderFlowMessageEntity} from '../../../../../models/order-flow-message';

@Component({
  selector: 'app-biz-orderdetail-logistictrack',
  templateUrl: './logistictrack.component.html',
  styleUrls: ['./logistictrack.component.css']
})
export class LogistictrackComponent implements OnInit {


  @Input()
  OrderTrackServerId: string;

  messresult: OrderFlowMessageEntity[];

  constructor(private orderFlowMessageServices: OrderFlowMessageServices) { }

  ngOnInit() {
    this.orderFlowMessageServices.Search(this.OrderTrackServerId).subscribe((a) => {

      this.messresult = a;
    });
  }

}
