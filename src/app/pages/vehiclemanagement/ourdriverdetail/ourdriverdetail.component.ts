import { Component, OnInit } from '@angular/core';
import {OutTruckTransportationpoolService} from '../../../services/Transportationpool/out-truck-transportationpool.service';
import {OutTruckTransportationpoolDetail} from '../../../models/Transportationpool/out-truck-transportationpool-request-model';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {StorageService} from '../../../services/storage.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';

@Component({
  selector: 'app-ourdriverdetail',
  templateUrl: './ourdriverdetail.component.html',
  styleUrls: ['./ourdriverdetail.component.css']
})
export class OurdriverdetailComponent implements OnInit {

  modeldata: OutTruckTransportationpoolDetail;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private emitService: EmitService,
    private route: ActivatedRoute,
    private outTruckTransportationpoolService: OutTruckTransportationpoolService) {


  }

  ngOnInit() {
    const vehicelId = this.route.snapshot.paramMap.get('id');

    this.outTruckTransportationpoolService.Detail(vehicelId).subscribe(a => {

      console.log(a);
      this.modeldata = a;
    });
  }

  motifydata() {


    this.storageService.store('outdriver', this.modeldata);

    this.router.navigate(['biz/vehicle-management/ourdriver-edit', this.modeldata.ResourceId]);

  }

  del(result: boolean) {

    if (result === true) {

      this.outTruckTransportationpoolService.Delete(this.modeldata.ResourceId)
        .subscribe(a => {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

            this.router.navigate(['/biz/vehicle-management/outdriver-list']);
          }

          console.log(a);
        });
    }
  }
}
