import {Component, OnInit, ViewChild} from '@angular/core';
import {PricestrategyService} from '../../../services/pricestrategy/pricestrategy.service';
import {PriceStrategyEntity} from '../../../models/pricestrategy/price-strategy-entity';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserPriceTemplateSettingService} from '../../../services/pricestrategy/user-price-template-setting.service';
import {Formextension} from '../../../help/formextension';
import {UserPriceTemplateSettingEntity} from '../../../models/pricestrategy/user-price-template-setting-entity';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';

@Component({
  selector: 'app-pricetemplateinsert',
  templateUrl: './pricetemplateinsert.component.html',
  styleUrls: ['./pricetemplateinsert.component.css']
})
export class PricetemplateinsertComponent implements OnInit {


  public pricestategyfields: Object = { text: 'Mark', value: 'StrategyId' };
  public pricestategyData: PriceStrategyEntity[];
  public saveform: FormGroup;
  public errormsg: string;
  constructor(private userPriceTemplateSettingService: UserPriceTemplateSettingService, private fb: FormBuilder, private pricestrategyService: PricestrategyService, public dialogRef: MatDialogRef<PricetemplateinsertComponent>) { }

  ngOnInit() {
    this.saveform = this.fb.group({
      TemplateName: ['', Validators.required],
      UseStrategyId: ['', Validators.required],
    });
    this.pricestrategyService.Search('').subscribe(a => {

      this.pricestategyData = a;
      // console.log(a);
    });
  }

  closepage() {

    this.dialogRef.close();
  }

  save() {
    if (this.saveform.valid === false) {

      Formextension.validateAllFormFields(this.saveform);
      return;
    } else {
        const data = <UserPriceTemplateSettingEntity>this.saveform.getRawValue();

        this.userPriceTemplateSettingService.Insert(data).subscribe(a => {


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
}
