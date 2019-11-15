import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogisticStoreAuthorizeServiceService} from '../../../../../services/logisticstore/logistic-store-authorize-service.service';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'app-biz-mylogistiscstore2',
  templateUrl: './mylogistiscstore2.component.html',
  styleUrls: ['./mylogistiscstore2.component.css'],
})
export class Mylogistiscstore2Component implements OnInit {

  logistticstores: LogisticStore[];

  @Input()
  placeholder: string;

  // tslint:disable-next-line: no-input-rename
  @Input('mat-form-field-class') matformclass: string;

  @Input()
  displaylabel = '物流网点';

  @ViewChild('mystorexx', { static: false}) mystoredownlist: MatSelect;

  @Input()
  public saveform: FormGroup;
  @Input()
  public SettingFormControlName: string;


  onChange;

  constructor(private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService) { }

  ngOnInit() {


    const firstNameControl = new FormControl();

    this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {

      this.logistticstores = value;

      console.log(this.mystoredownlist);


    });

    if (this.saveform != null) {
      this.saveform.addControl(this.SettingFormControlName, new FormControl());
    }

  }

}
