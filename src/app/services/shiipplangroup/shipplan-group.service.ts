import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {InsideShipmentGroupModel} from '../../models/shipplangroup/inside-shipment-group-model';
import {ShipmentGroupStatuedModel} from '../../models/shipplangroup/shipment-group-model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipplanGroupService {

  constructor( private readonly appConfiguration: AppConfiguration,
               private  httpclient: HttpClient,
               private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
    //  this.appConfiguration.Server = 'http://localhost:59471';
  }

  /**
   * 查询派车单汇总状态信息
   */
  public Detail(shipmenggroupId: string): Observable<ShipmentGroupStatuedModel> {

    // this.httpclient.get(this.appConfiguration.Server + '/api/ShipmentPlanGroup/Detail/' + shipmenggroupId, {responseType: 'text'})
    //   .pipe(
    //     tap(
    //       data => console.log(data),
    //       error => console.log(error)
    //     )
    //   ).toPromise().then(a => {console.log(a); });

    return  this.httpclient.get<ShipmentGroupStatuedModel>(
      this.appConfiguration.Server + '/api/ShipmentPlanGroup/Detail/' + shipmenggroupId) .pipe(
      tap(heroes => console.log(heroes)));
  }
}
