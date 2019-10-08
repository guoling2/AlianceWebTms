import { Component, OnInit } from '@angular/core';
import {UserPriceTemplateSettingService} from '../../../services/pricestrategy/user-price-template-setting.service';
import {PricetemplateinsertComponent} from '../pricetemplateinsert/pricetemplateinsert.component';
import {UserpricecontractaddComponent} from '../userpricecontractadd/userpricecontractadd.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {UserPriceContractService} from '../../../services/userpricecontract/user-price-contract.service';
import {UserPriceContractModel} from '../../../models/UserPriceContract/user-price-contract-model';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';

@Component({
  selector: 'app-biz-userpricecontractlist',
  templateUrl: './userpricecontractlist.component.html',
  styleUrls: ['./userpricecontractlist.component.css']
})
export class UserpricecontractlistComponent implements OnInit {

   private resourceId: string;

   usercontractdatasource: UserPriceContractModel[];

  constructor(private emitService: EmitService,private route: ActivatedRoute, private dialog: MatDialog, private userPriceContractService: UserPriceContractService) { }

  ngOnInit() {

    this.resourceId = this.route.snapshot.paramMap.get('id');

   // alert(this.resourceId);

    this.search();
  }

  search() {

   this.userPriceContractService.Search({transportationpoolId: this.resourceId}).subscribe(a => {

     this.usercontractdatasource = a;

   });
  }
  open() {
    const dialogRef = this.dialog.open(UserpricecontractaddComponent, {
      minWidth: 500,
      minHeight: 500,
      disableClose: true,
      data: this.resourceId
    });
    dialogRef.afterClosed().subscribe(a => {
      this.search();
    });
  }

  routeto(ContractId: string) {

  }

  Del(event: TmssaveconfirmEvent) {

    if (event.ActionFlag) {
      this.userPriceContractService.Delete(event.ExtendData.toString()).subscribe(a => {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
        this.search();
      });
    }

  }
}
