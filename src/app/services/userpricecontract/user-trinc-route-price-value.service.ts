import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {UserTrincRoutePriceValueModel} from '../../models/UserPriceContract/user-trinc-route-price-value-model';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTrincRoutePriceValueService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 删除
   */
  public Delete(dataid: string): Observable<TmsResponseModle> {



    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Delete'+ dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: UserTrincRoutePriceValueModel[]): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/UserTrincRoutePriceValue/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: UserTrincRoutePriceValueModel): Observable<TmsResponseModle> {



    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/UserTrincRoutePriceValue/' + data.PriceValueId, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<UserTrincRoutePriceValueModel> {

    return this.httpclient.get<UserTrincRoutePriceValueModel>(this.appConfiguration.Server + '/api/查询地址1/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<UserTrincRoutePriceValueModel[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<UserTrincRoutePriceValueModel[]>(this.appConfiguration.Server + '/api/查询地址1/Search', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
