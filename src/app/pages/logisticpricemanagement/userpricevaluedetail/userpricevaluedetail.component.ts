import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {FormBuilder} from '@angular/forms';
import {UserTrincRoutePriceService} from '../../../services/userpricecontract/user-trinc-route-price.service';
import {UserTrincRoutePriceValueService} from '../../../services/userpricecontract/user-trinc-route-price-value.service';
import {UserTrincRoutePriceModel} from '../../../models/UserPriceContract/user-trinc-route-price-model';
import {UserTrincRoutePriceValueModel} from '../../../models/UserPriceContract/user-trinc-route-price-value-model';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';

@Component({
  selector: 'app-userpricevaluedetail',
  templateUrl: './userpricevaluedetail.component.html',
  styleUrls: ['./userpricevaluedetail.component.css']
})
export class UserpricevaluedetailComponent implements OnInit {

  public userTrincRoutePrice: UserTrincRoutePriceModel;
  constructor(private router: Router,
              private emitService: EmitService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userTrincRoutePriceService: UserTrincRoutePriceService,
              private userTrincRoutePriceValueService: UserTrincRoutePriceValueService) { }

  ngOnInit() {
    const userid = this.route.snapshot.paramMap.get('id');

    this.userTrincRoutePriceService.Detail(userid).subscribe(a => {


      this.userTrincRoutePrice = a;
    });
  }

  del() {

  }

  motifypricevalye(e: UserTrincRoutePriceValueModel) {


    this.userTrincRoutePriceValueService.Update(e).subscribe(a => {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info,
          '系统信息', a.Info, MessageShowType.Toast));
    });
  }
}
