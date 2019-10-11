import {Component, Input, OnInit} from '@angular/core';
import {ShipmentGroupStatuedModel} from '../../../../models/shipplangroup/shipment-group-model';
import {ShipplanGroupService} from '../../../../services/shiipplangroup/shipplan-group.service';

@Component({
  selector: 'app-biz-logisticfinance',
  templateUrl: './logisticfinance.component.html',
  styleUrls: ['./logisticfinance.component.css']
})
export class LogisticfinanceComponent implements OnInit {
  model: ShipmentGroupStatuedModel;

  @Input()
  ShipmentGroupId: string;
  constructor(private  shipplanGroupService: ShipplanGroupService) { }

  ngOnInit() {

     // alert(this.ShipmentGroupId);
      this.shipplanGroupService.Detail(this.ShipmentGroupId).subscribe(a => {this.model = a; });
  }

}
