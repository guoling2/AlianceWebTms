import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {
  CarriersTransportationpoolDetailModel,
  CarriersTransportationpoolRequestModel
} from '../../models/Transportationpool/carriers-transportationpool-request-model';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {PageQueryResult} from '../../models/page-query-result';

@Injectable({
  providedIn: 'root'
})
export class TransportationpoolForCarriersService {

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

    // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // tslint:disable-next-line:max-line-length
    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/TransportationpoolForCarriers/' + data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 新增
   */
  public  Insert(data: CarriersTransportationpoolRequestModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // tslint:disable-next-line:max-line-length
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/TransportationpoolForCarriers/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: CarriersTransportationpoolRequestModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    const body = data;

    // tslint:disable-next-line:max-line-length
    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/TransportationpoolForCarriers/' + data.ResourceId, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<CarriersTransportationpoolDetailModel> {

    // tslint:disable-next-line:max-line-length
    return this.httpclient.get<CarriersTransportationpoolDetailModel>(this.appConfiguration.Server + '/api/TransportationpoolForCarriers/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<PageQueryResult<CarriersTransportationpoolDetailModel[]>> {

    const options = new HttpParams({ fromObject: data});

    // tslint:disable-next-line:max-line-length
    return this.httpclient.get<PageQueryResult<CarriersTransportationpoolDetailModel[]>>(this.appConfiguration.Server + '/api/TransportationpoolForCarriers/Search', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
