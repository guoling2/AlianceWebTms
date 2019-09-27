import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmitService} from '../../../help/emit-service';
import {UserPriceTemplateSettingService} from '../../../services/pricestrategy/user-price-template-setting.service';
import {UserPriceTemplateSettingEntity} from '../../../models/pricestrategy/user-price-template-setting-entity';
import {UserPriceTemplateDataService} from '../../../services/pricestrategy/user-price-template-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Formextension} from '../../../help/formextension';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {UserPriceTemplateDataEntity} from '../../../models/pricestrategy/user-price-template-data-entity';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {TmssaveconfirmEvent} from '../../../directive/tmssaveconfirm.directive';

@Component({
  selector: 'app-pricetemplatedetail',
  templateUrl: './pricetemplatedetail.component.html',
  styleUrls: ['./pricetemplatedetail.component.css']
})
export class PricetemplatedetailComponent implements OnInit {

  public dropdownfields: Object = { text: 'Desc', value: 'SymboleName' };
  public userPriceTemplateSetting: UserPriceTemplateSettingEntity;
  public saveform: FormGroup;
  public toolbar: string[];
  public  settingdatas: UserPriceTemplateDataEntity[];

  // @ViewChild('datadrid', {static: false})
  // public grid: GridComponent;

  constructor(private router: Router,
              private emitService: EmitService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private userPriceTemplateSettingService: UserPriceTemplateSettingService,
              private userPriceTemplateDataService: UserPriceTemplateDataService) { }

  ngOnInit() {

    this.toolbar = ['Search'];

    const userid = this.route.snapshot.paramMap.get('id');

    this.userPriceTemplateSettingService.Detail(userid).subscribe(a => {
      this.userPriceTemplateSetting = a;
    });

    this.settingdata(userid);

    this.saveform = this.fb.group({
      ColumnDesc: ['', Validators.required],
      DownInterval: ['0', Validators.required],
      UpInterval: ['', Validators.required],
      InervalModel: ['', Validators.required]
    });

  }

   settingdata(settingid: string) {

    this.userPriceTemplateDataService.Search(settingid).subscribe(a => {
         this.settingdatas = a;

      });

  }
  save() {
    if (this.saveform.valid === false) {

     // alert('保存失败');
      console.log(this.saveform.getRawValue());

      Formextension.validateAllFormFields(this.saveform);
      return;
    } else {
      const data = <UserPriceTemplateDataEntity>this.saveform.getRawValue();

      data.SettingId = this.userPriceTemplateSetting.SettingId;

      this.userPriceTemplateDataService.Insert(data).subscribe(a => {

        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info,
            '系统信息', a.Info, MessageShowType.Toast));

        if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

          this.saveform.reset();
                this.settingdata(this.userPriceTemplateSetting.SettingId);

        }
      });
    }
  }

  delcol(confirmdata: TmssaveconfirmEvent) {

    if (confirmdata.ActionFlag === false) {
      return;
    }

    this.userPriceTemplateDataService.Delete(confirmdata.ExtendData.toString()).subscribe(a => {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info,
          '系统信息', a.Info, MessageShowType.Toast));

      if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

        this.settingdata(this.userPriceTemplateSetting.SettingId);

      }

    });
    // console.log(confirmdata);
   // alert(confirmdata.ExtendData.toString());
  }
}
