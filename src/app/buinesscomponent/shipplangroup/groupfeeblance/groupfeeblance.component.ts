import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {ShipmentPlanOrderPriceBlace} from '../../../modeldata/shipment-plan-order-price-blace';
import {ApplicationDirectionContentValue} from '../../application-direction-content-value';

@Component({
  selector: 'app-biz-groupfeeblance',
  templateUrl: './groupfeeblance.component.html',
  styleUrls: ['./groupfeeblance.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GroupfeeblanceComponent
    }
  ]
})
export class GroupfeeblanceComponent implements OnInit, ControlValueAccessor {


  datasource: ApplicationDirectionContentValue[] = ShipmentPlanOrderPriceBlace.Data;

  dropfiled: Object = ShipmentPlanOrderPriceBlace.DropDownListField;

  @Input()
  placeholder: string;
  @Input()
  FirstIsSelect = false;

  @Input()
  InputValue: string;

  @Input()
  ReadOnly: boolean;

  @ViewChild('dropname', {static: true})
  mystoredownlist: DropDownListComponent;
  onChange: (_: any) => void;

  constructor() { }

  ngOnInit() {
    if (this.FirstIsSelect) {

      this.mystoredownlist.value = this.datasource[0]['Id'];

    }

    if (this.InputValue != null) {
    //  alert(this.InputValue);
      this.mystoredownlist.value = ShipmentPlanOrderPriceBlace.FindPriceBlanceType(this.InputValue).Id;

      console.log(this.mystoredownlist.value);
      console.log(this.InputValue);
      console.log('录入值');
    }

    if(this.ReadOnly) {
      this.mystoredownlist.readonly = true;
    }
  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.mystoredownlist.setDisabledState(isDisabled);
  }

  writeValue(value: any): void {
    if (value) {

      this.mystoredownlist.value = value;
    }

  }

  selectchange(event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }
}
