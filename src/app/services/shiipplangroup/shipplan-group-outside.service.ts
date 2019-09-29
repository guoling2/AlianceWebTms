import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {InsideShipmentGroupModel} from '../../models/shipplangroup/inside-shipment-group-model';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {OutsideShipmentGroupModel} from '../../models/shipplangroup/outside-shipment-group-model';

@Injectable({
  providedIn: 'root'
})
export class ShipplanGroupOutsideService {

  constructor( private readonly appConfiguration: AppConfiguration,
               private  httpclient: HttpClient,
               private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
    //  this.appConfiguration.Server = 'http://localhost:59471';
  }

  /**
   *  创建派车单头部信息
   */
  public CreateShipplanGroup(task: OutsideShipmentGroupModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(task, '/api/ShipmentPlanGroupForOutside/creategroup');
  }
  /**
   * 查询派车单
   */
  public Detail(shipmenggroupId: string): Observable<OutsideShipmentGroupModel> {
    return  this.httpclient.get<OutsideShipmentGroupModel>(
      this.appConfiguration.Server + '/api/ShipmentPlanGroupForOutside/detail?shipmenggroupId=' + shipmenggroupId);
  }

  public DelShipplanGroup(shipmenggroupId: string): Observable<TmsResponseModle> {
    return  this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/ShipmentPlanGroupForOutside/' + shipmenggroupId);
  }

}
