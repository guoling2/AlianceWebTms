import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {XiechetransferView} from '../../models/xieche/xiechetransfer-view';
import {TmshttpclientService} from '../tmshttpclient.service';
import {TmsResponseModle} from '../../models/tms-response.module';

@Injectable({
  providedIn: 'root'
})
export class XiechetransferService {

  constructor(private tmshttpclientService: TmshttpclientService, private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 查询
   */
  public CollectionTransferOrder(actionStoreId: string): Observable<XiechetransferView[]> {

    return this.httpclient.get<XiechetransferView[]>(
      this.appConfiguration.Server + '/api/ShipmentXieche/CollectionTransferOrder?selectactionId=' + actionStoreId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * SettingXieCheCode
   */

  public SettingXieCheCode(xiechetransferView: XiechetransferView): Observable<TmsResponseModle> {

    return  this.tmshttpclientService.PostAsJson(xiechetransferView, '/api/ShipmentXieche/SettingXieCheCode');

  }
}
