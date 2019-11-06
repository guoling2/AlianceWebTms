import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {OrganizationInfominationModel} from '../../models/base/organizationInfominationModel';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DriverProfile} from '../../models/User/driver-profile';
import {ShipPlanItemModel} from '../../models/shipment/ship-plan-item-model';
import {TmsResponseModle} from '../../models/tms-response.module';
import {TmshttpclientService} from '../tmshttpclient.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentPlanItemService {

  constructor(  private tmshttpclientService: TmshttpclientService, private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  public QueryItemsByPlanIdAndShipidAndItemId( systemOrderId: string,  shipmentId: string,  shipmentPlanId: string)
    : Observable<ShipPlanItemModel[]> {

    return this.httpclient.get<ShipPlanItemModel[]>(this.appConfiguration.Server +
      '/api/ShipmentPlanItem/query-shipplanid-combine-store?' +
      'systemOrderId=' + systemOrderId +
      '&shipmentId=' + shipmentId +
      '&shipmentPlanId=' + shipmentPlanId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  public TrimSendCount(shipPlanItemModel: ShipPlanItemModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(shipPlanItemModel, '/api/ShipmentPlanItem/TrimSendCount');
  }
}
