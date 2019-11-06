import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';

@Injectable({
  providedIn: 'root'
})
export class PhysicalDepotAuthorizedServiceService {

  constructor(private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient, private tmshttpclientService: TmshttpclientService) { }


  public  SetDefaultAcceptOrderStore(storeId: string, depotIds: string[]): Observable<TmsResponseModle> {
    return this.tmshttpclientService.PostAsJson(depotIds,
      '/api/PhysicalDepotAuthorized/SetAcceptStore/' + storeId);

  }
}
