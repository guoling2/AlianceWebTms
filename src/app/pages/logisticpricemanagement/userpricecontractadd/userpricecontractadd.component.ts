import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserPriceTemplateSettingEntity} from '../../../models/pricestrategy/user-price-template-setting-entity';
import {UserPriceTemplateSettingService} from '../../../services/pricestrategy/user-price-template-setting.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Formextension} from '../../../help/formextension';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {UserPriceContractService} from '../../../services/userpricecontract/user-price-contract.service';
import {UserPriceContractModel} from '../../../models/UserPriceContract/user-price-contract-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-userpricecontractadd',
  templateUrl: './userpricecontractadd.component.html',
  styleUrls: ['./userpricecontractadd.component.css']
}) //添加计费协议
export class UserpricecontractaddComponent implements OnInit {

  public saveform: FormGroup;

  public pricetemplatesettings: UserPriceTemplateSettingEntity[];

  public pricetemplatesettingsfields: Object = { text: 'Name', value: 'SettingId' };
  public  commonfileds: Object = {text: 'text', value: 'value'};

  public caclmethoddatasource = [{ text: '自开票结算', value: '1'}];

  public payMethodDataSource = [{ text: '月结', value: '1'}];

  public PriceResultProcessMethodDataSource = [{ text: '保持不变', value: '1'}, { text: '抹零', value: '2'}];
  errormsg: string;

  constructor( private route: ActivatedRoute,
    private userPriceContractService: UserPriceContractService,
               public dialogRef: MatDialogRef<UserpricecontractaddComponent>,
               private fb: FormBuilder,
               private userPriceTemplateSettingService: UserPriceTemplateSettingService,
               @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {




    const today = new Date ();
    this.saveform = this.fb.group({
      ContractName: ['', Validators.required],
      UsePriceTemplateSettingId: ['', Validators.required],
      CaclMethod: ['', Validators.required],
      PayMethod: ['', Validators.required],
      AutoGenerateBill: true,
      PriceResultProcessMethod: ['', Validators.required],
      TaskBeginTime: [today],
      TaskEndTime: [''],
      TransportationpoolId: this.data
    });


    this.userPriceTemplateSettingService.Search(null).subscribe(a => {

      this.pricetemplatesettings = a;
    });

  }

  save() {


    if (this.saveform.valid === false) {
      console.log(this.saveform.getRawValue());

      Formextension.validateAllFormFields(this.saveform);
    } else {

      console.log(this.saveform.getRawValue());

     const data = <UserPriceContractModel>this.saveform.getRawValue();

      this.userPriceContractService.Insert(data).subscribe(a => {


        if ( a.StatusCode !== TmsresponseStatusCode.Succeed() ) {

          this.errormsg = a.Info;
          //  alert(a.Info);
          //  biz/customer-management/edit/BC100004000005
        } else {
          this.dialogRef.close(a);
        }
      });
    }
  }

  closepage() {

    this.dialogRef.close();

  }
}
