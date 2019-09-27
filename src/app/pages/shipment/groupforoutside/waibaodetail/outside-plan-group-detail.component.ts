import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShipplanGroupInsideService} from '../../../../services/shiipplangroup/shipplan-group-inside.service';
import {ShipplanGroupOutsideService} from '../../../../services/shiipplangroup/shipplan-group-outside.service';
import {OutsideShipmentGroupModel} from '../../../../models/shipplangroup/outside-shipment-group-model';

@Component({
  selector: 'app-outside-plan-group-detail',
  templateUrl: './outside-plan-group-detail.component.html',
  styleUrls: ['./outside-plan-group-detail.component.css']
})
export class OutsidePlanGroupDetailComponent implements OnInit {

  outsideShipmentGroup: OutsideShipmentGroupModel;
  constructor(private route: ActivatedRoute, private shipplanGroupOutsideService: ShipplanGroupOutsideService,) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.shipplanGroupOutsideService.Detail(id).subscribe(a => {
      this.outsideShipmentGroup = a;
    });
  }

  Del(ShipmentGroupId: string) {

  }

  Send(ShipmentGroupId: string) {

  }
}
