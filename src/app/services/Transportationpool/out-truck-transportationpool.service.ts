import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {
  CarriersTransportationpoolDetailModel,
  CarriersTransportationpoolRequestModel
} from '../../models/Transportationpool/carriers-transportationpool-request-model';
import {
  OutTruckTransportationpoolDetail,
  OutTruckTransportationpoolRequestModel
} from '../../models/Transportationpool/out-truck-transportationpool-request-model';

@Injectable({
  providedIn: 'root'
})
export class OutTruckTransportationpoolService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 删除
   */
  public Delete(data: string): Observable<TmsResponseModle> {
    // tslint:disable-next-line:max-line-length
    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/TransportationpoolForOutTruck/' + data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 新增
   */
  public  Insert(data: OutTruckTransportationpoolRequestModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // tslint:disable-next-line:max-line-length
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/TransportationpoolForOutTruck/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: OutTruckTransportationpoolRequestModel): Observable<TmsResponseModle> {

    // tslint:disable-next-line:max-line-length
    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/TransportationpoolForOutTruck/' + data.ResourceId, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<OutTruckTransportationpoolDetail> {

    // tslint:disable-next-line:max-line-length
    return this.httpclient.get<OutTruckTransportationpoolDetail>(this.appConfiguration.Server + '/api/TransportationpoolForOutTruck/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
