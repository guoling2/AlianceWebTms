import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserPriceContractModel} from '../../models/UserPriceContract/user-price-contract-model';

@Injectable({
  providedIn: 'root'
})
export class UserPriceContractService {

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

   // api/ApiWithActions/5

    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/UserPriceContract/' + dataid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }


  /**
   * 新增
   */
  public  Insert(data: UserPriceContractModel): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/UserPriceContract/insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: UserPriceContractModel): Observable<TmsResponseModle> {



    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/查询地址1/Update'+ data.ContractId, data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<UserPriceContractModel> {

    return this.httpclient.get<UserPriceContractModel>(this.appConfiguration.Server + '/api/UserPriceContract/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<UserPriceContractModel[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<UserPriceContractModel[]>(this.appConfiguration.Server + '/api/UserPriceContract/Search', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }

}
