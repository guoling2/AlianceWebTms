import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {LogisticMathRequest} from '../../models/shipplangroup/logistic-math-request';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipplanLogisticAutoCaclService {

  constructor(private readonly appConfiguration: AppConfiguration,
              private  httpclient: HttpClient,
              private tmshttpclientService: TmshttpclientService) { }



              public  Cacl(logisticMathRequest: LogisticMathRequest): Observable<TmsResponseModle> {


                return this.tmshttpclientService.PostAsJson(logisticMathRequest, '/api/LogisticPriceCacl/CaclPrice');
              }
}
