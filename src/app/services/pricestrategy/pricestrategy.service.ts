import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';
import {PriceStrategyEntity} from '../../models/pricestrategy/price-strategy-entity';



@Injectable({
  providedIn: 'root'
})
export class PricestrategyService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 删除
   */
  public Delete(data: PriceStrategyEntity): Observable<TmsResponseModle> {

    // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Delete', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: PriceStrategyEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: PriceStrategyEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Update', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<PriceStrategyEntity> {

    return this.httpclient.get<PriceStrategyEntity>(this.appConfiguration.Server + '/api/查询地址1/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<PriceStrategyEntity[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<PriceStrategyEntity[]>(this.appConfiguration.Server + '/api/PriceStrategy', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
