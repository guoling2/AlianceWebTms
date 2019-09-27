import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {ShipmentOrderModelEntity} from '../../../models/shipment/ShipmentOrderModelEntity';
import {tap} from 'rxjs/operators';
import {ShipmentOrderSimpleModel} from '../../../models/shipment/shipment-order-simple-model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentOrderService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  public  CreateShipmentMyOrder(shiporder: any): Observable<TmsResponseModle> {
    // const options = new HttpParams({ fromObject: shiporder});
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/ShipmentMyOrder/CreateOrder',  shiporder, {headers})
      .pipe(
        tap(response => console.log(response.Info)));
  }
  /**
   *  订单简易查询明细
   *   orderLogisticDetailId
   */
  public  simpledetail(orderLogisticDetailId: string): Observable<ShipmentOrderSimpleModel> {
    return this.httpclient.get<ShipmentOrderSimpleModel>(
      this.appConfiguration.Server + '/api/ShipmentMyOrder/detail/v1/' + orderLogisticDetailId)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
