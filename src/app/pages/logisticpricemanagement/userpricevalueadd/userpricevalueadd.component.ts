import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserPriceContractService} from '../../../services/userpricecontract/user-price-contract.service';
import {UserPriceContractModel} from '../../../models/UserPriceContract/user-price-contract-model';
import {UserPriceTemplateDataService} from '../../../services/pricestrategy/user-price-template-data.service';
import {UserPriceTemplateDataEntity} from '../../../models/pricestrategy/user-price-template-data-entity';
import {UserTrincRoutePriceModel} from '../../../models/UserPriceContract/user-trinc-route-price-model';
import {UserTrincRoutePriceValueService} from '../../../services/userpricecontract/user-trinc-route-price-value.service';
import {UserTrincRoutePriceService} from '../../../services/userpricecontract/user-trinc-route-price.service';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';

@Component({
  selector: 'app-userpricevalueadd',
  templateUrl: './userpricevalueadd.component.html',
  styleUrls: ['./userpricevalueadd.component.css']
})
export class UserpricevalueaddComponent implements OnInit {

  public userPriceContractModel: UserPriceContractModel;

  public userPriceTemplateDatas: UserPriceTemplateDataEntity[];

  private routePriceModel: UserTrincRoutePriceModel;

  public headsaveform: FormGroup;

  constructor(private router: Router,
                private emitService: EmitService,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private  userPriceContractService: UserPriceContractService,
                private userPriceTemplateDataService: UserPriceTemplateDataService,
                private userTrincRoutePriceService: UserTrincRoutePriceService,
                private userTrincRoutePriceValueService: UserTrincRoutePriceValueService) { }

  ngOnInit() {

    const userid = this.route.snapshot.paramMap.get('id');
    this.userPriceContractService.Detail(userid).subscribe(a => {
      this.userPriceContractModel = a;
      this.buildheadforms(a);
      this.builditems(a.UsePriceTemplateSettingId);
    });
  }

  // 构建提价表单
  buildheadforms(userPriceContractModel: UserPriceContractModel): void {
    this.headsaveform = this.fb.group({
      ContractId: [userPriceContractModel.ContractId, Validators.required],
      StartAreaId: ['', Validators.required],
      ToAreaId: ['', Validators.required],
      TimeLimite: ['0', Validators.required],
      RunPriceLimite: [false, Validators.required],
      MinPrice: ['0', Validators.required],
      PriceValues: new FormArray([]),
    });

  }

  public get PriceValuesFormArray(): FormArray {
    return this.headsaveform.get('PriceValues') as FormArray;
  }


  builditems(templateId: string): void {

    this.userPriceTemplateDataService.Search(templateId).subscribe(a => {

      this.userPriceTemplateDatas = a;

     const itemformarray =  this.PriceValuesFormArray;

      a.forEach(item => {
        itemformarray.push(  this.fb.group({
          PriceValueId: '',
          TemplateDataId: item.TemplateDataId,
          PriceId: '',
          Price: '0',
          TemplateDataName: item.ColumnDesc
        }));
      });

    });

  }

  savedata(reload: boolean) {

    if (this.headsaveform.valid === false) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '保存验证失败', MessageShowType.Toast));
      return;
    }
    const savemodel = <UserTrincRoutePriceModel>this.headsaveform.getRawValue();

    this.userTrincRoutePriceService.Insert(savemodel).subscribe(a => {

      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {

        // 把保存成功的数据编号ID 给下面的Item数据
        savemodel.PriceValues.forEach(valuemodel => {
          valuemodel.PriceId = a.Data;
        });
        this.userTrincRoutePriceValueService.Insert(savemodel.PriceValues).subscribe(valueresult => {

          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', valueresult.Info, MessageShowType.Toast));
          if (reload) {
             location.reload();
          }
        });
      } else {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Error, '系统信息', a.Info, MessageShowType.Toast));
        return;
      }

    });
    console.log('savemodel');
    console.log(savemodel);
  }
}
