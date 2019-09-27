import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserPriceTemplateSettingEntity} from '../../models/pricestrategy/user-price-template-setting-entity';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {UserPriceTemplateDataEntity} from '../../models/pricestrategy/user-price-template-data-entity';

@Injectable({
  providedIn: 'root'
})
export class UserPriceTemplateDataService {

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

    // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
   // const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/UserPriceTemplateData/' + dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: UserPriceTemplateDataEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/UserPriceTemplateData/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: UserPriceTemplateDataEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/UserPriceTemplateData/Update', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<UserPriceTemplateDataEntity> {

    return this.httpclient.get<UserPriceTemplateDataEntity>(this.appConfiguration.Server + '/api/UserPriceTemplateData/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(templateId: string): Observable<UserPriceTemplateDataEntity[]> {

   // const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<UserPriceTemplateDataEntity[]>(this.appConfiguration.Server + '/api/UserPriceTemplateData/Search?templateId=' + templateId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
