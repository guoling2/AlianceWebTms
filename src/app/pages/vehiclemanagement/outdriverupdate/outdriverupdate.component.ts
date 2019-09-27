import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {OutTruckTransportationpoolService} from '../../../services/Transportationpool/out-truck-transportationpool.service';
import {StorageService} from '../../../services/storage.service';
import {OutTruckTransportationpoolRequestModel} from '../../../models/Transportationpool/out-truck-transportationpool-request-model';

@Component({
  selector: 'app-outdriverupdate',
  templateUrl: './outdriverupdate.component.html',
  styleUrls: ['./outdriverupdate.component.css']
})
export class OutdriverupdateComponent implements OnInit {

  saverequest: OutTruckTransportationpoolRequestModel;

  constructor(
            private storageService: StorageService,
             private router: Router,
              private emitService: EmitService,
              private route: ActivatedRoute,
              private outTruckTransportationpoolService: OutTruckTransportationpoolService) { }

  ngOnInit() {

  }

}
