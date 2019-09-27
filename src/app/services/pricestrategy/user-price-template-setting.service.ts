import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserPriceTemplateSettingEntity} from '../../models/pricestrategy/user-price-template-setting-entity';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPriceTemplateSettingService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 删除
   */
  public Delete(data: UserPriceTemplateSettingEntity): Observable<TmsResponseModle> {

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
  public  Insert(data: UserPriceTemplateSettingEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/UserPriceTemplateSetting/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: UserPriceTemplateSettingEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Update', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<UserPriceTemplateSettingEntity> {

    return this.httpclient.get<UserPriceTemplateSettingEntity>(this.appConfiguration.Server + '/api/UserPriceTemplateSetting/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<UserPriceTemplateSettingEntity[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<UserPriceTemplateSettingEntity[]>(this.appConfiguration.Server + '/api/UserPriceTemplateSetting/Search')
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
