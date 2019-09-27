import { Component, OnInit } from '@angular/core';
import {TransportationpoolForCarriersService} from '../../../services/Transportationpool/transportationpool-for-carriers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CarriersTransportationpoolDetailModel} from '../../../models/Transportationpool/carriers-transportationpool-request-model';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';

@Component({
  selector: 'app-carriersdetail',
  templateUrl: './carriersdetail.component.html',
  styleUrls: ['./carriersdetail.component.css']
})
export class CarriersdetailComponent implements OnInit {

  CarriersTransportationpoolDetail: CarriersTransportationpoolDetailModel;
  constructor(
    private router: Router,
    private emitService: EmitService,
    private route: ActivatedRoute,
    private transportationpoolForCarriersService: TransportationpoolForCarriersService) { }

  ngOnInit() {
    const userid = this.route.snapshot.paramMap.get('id');

    this.transportationpoolForCarriersService.Detail(userid).subscribe(a => {
      this.CarriersTransportationpoolDetail = a;
    });
  }

  update(result: boolean) {
    if (result === true) {

      this.transportationpoolForCarriersService.Update(this.CarriersTransportationpoolDetail)
        .subscribe(a => {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

             location.reload();
          }

          console.log(a);
        });
    }
  }

  del(result: boolean) {

    if (result === true) {

      this.transportationpoolForCarriersService.Delete(this.CarriersTransportationpoolDetail.ResourceId)
        .subscribe(a => {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

            this.router.navigate(['/biz/carriers-management/carriers']);
          }

          console.log(a);
        });
    }
  }

}
