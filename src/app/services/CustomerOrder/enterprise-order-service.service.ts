import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {CustomerProfileModle} from '../../models/customers/customer-profile-modle';
import {tap} from 'rxjs/operators';
import {EnterpriseOrderDetailModel} from '../../models/CustomerOrder/enterprise-order-detail-model';
import {TmsResponseModle} from '../../models/tms-response.module';
import {AcceptEnterpriseOrderRequest} from '../../models/CustomerOrder/accept-enterprise-order-request';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseOrderServiceService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient, private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 明细
   */
  public Detail(Id: string): Observable<EnterpriseOrderDetailModel> {

    return this.httpclient.get<EnterpriseOrderDetailModel>(this.appConfiguration.Server + '/api/EnterpriseOrder/Detail/' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 取消接单
   */
  public CancelOrder(id: string): Observable<TmsResponseModle> {
    return this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/EnterpriseOrder/CancelOrder/' + id)
      .pipe(
        tap(heroes => console.log(heroes)));

  }

  /**
   * 接单
   */
  public AcceptOrder(enterpriseOrderRequest: AcceptEnterpriseOrderRequest): Observable<TmsResponseModle> {

    return this.tmshttpclientService.PostAsJson(enterpriseOrderRequest,
       '/api/EnterpriseOrder/AcceptOrder');

  }
  /**
   * 修改车号
   */
  public MotifyCarNumber(enterpriseOrderRequest: any): Observable<TmsResponseModle> {

    return this.tmshttpclientService.PostAsJson(enterpriseOrderRequest,
      '/api/EnterpriseOrder/MotifyCarNumber');

  }
  /**
   * 退单
   */
  public UnAcceptOrder(orderPreparedLogisticId: string, orderBackReason: string): Observable<TmsResponseModle> {

  //  const jsonhead = new HttpHeaders({'Content-Type': 'text'});

  //  const jsonhead = new HttpHeaders({'Content-Type': 'text'});
  //   return  this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/EnterpriseOrder/UnAcceptOrder/' + orderPreparedLogisticId
  //     , orderBackReason, {headers: jsonhead} )
  //     .pipe(
  //       tap(heroes => console.log(heroes)));

    return this.httpclient.put<TmsResponseModle>(this.appConfiguration.Server + '/api/EnterpriseOrder/UnAcceptOrder/' + orderPreparedLogisticId,
      orderBackReason);

  }
}
