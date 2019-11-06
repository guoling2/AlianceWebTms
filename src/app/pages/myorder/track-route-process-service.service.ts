import {Injectable} from '@angular/core';
import {OrderrouteplanComponent} from './_sub/orderrouteplan/orderrouteplan.component';
import {MatDialog} from '@angular/material/dialog';
import {EmitService} from '../../help/emit-service';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackRouteProcessServiceService {

  constructor() { }

  caclorderroute( height: string, width: string, dialog: MatDialog,
                  emitService: EmitService, BeginLogisticStoreId: string, EndLogisticStoreId: string, RoutePlanId: string):
    Observable<TmsResponseModle> {

    let s1 = BeginLogisticStoreId;
    let s2 = EndLogisticStoreId;

    if (s1 == null) {
      s1 = '';
    }
    if (s2 == null) {
      s2 = '';
    }

    if (s1.length === 0 || s2.length === 0) {


      return new Observable(subscriber => {
        subscriber.next(new TmsResponseModle(408, '网点参数错误！'));

        subscriber.complete();
      });
    }

    const dialogRef = dialog.open(OrderrouteplanComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: new Array<string>(s1, s2, RoutePlanId)
    });

     return  dialogRef.afterClosed().pipe(map(ev => new TmsResponseModle(200, '数据获取成功', ev)));


  }
}
