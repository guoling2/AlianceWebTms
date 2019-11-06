import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {LogisticItemComponentService} from '../../../../../services/shiipplangroup/shipplan-item-service.service';
import {EmitService} from '../../../../../help/emit-service';
import {DialogservicesService} from '../../../../../help/dialogservices.service';
import {SelectvehicelComponent} from '../../../groupplancommon/selectvehicel/selectvehicel.component';
import {Vehicelmodel} from '../../../../../models/vehiclemanagement/vehicelmodel';
import {SelectdriverComponent} from '../../../groupplancommon/selectdriver/selectdriver.component';
import {ChoselogistictrincComponent} from '../choselogistictrinc/choselogistictrinc.component';
import {CarriersTransportationpoolDetailModel} from '../../../../../models/Transportationpool/carriers-transportationpool-request-model';
import {VehicleContainerService} from '../../../../../services/vehiclemanagement/vehicle-container.service';
import {VehicleContainerModel} from '../../../../../models/vehiclemanagement/container-model';
@Component({
  selector: 'app-shipmentplan-out-insert-headitem',
  templateUrl: './headitem.component.html',
  styleUrls: ['./headitem.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ShipOutHeaditemComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: ShipOutHeaditemComponent}
  ],
})
export class ShipOutHeaditemComponent implements OnInit  {

  private  logsiticinserthead: FormGroup;

  @Input()
  public saveform: FormGroup;

  @Input()
  public tasktype: string;


  public vehicleContainerfields: Object = { text: 'Name', value: 'Id' };
  public vehicleContainerData: VehicleContainerModel[];

  constructor(
               private  vehicleContainerService: VehicleContainerService,
               private itemServiceService: LogisticItemComponentService,
               private fb: FormBuilder,
               private dialog: MatDialog,
               public emitService: EmitService,
               private  dialogx: DialogservicesService) { }

  ngOnInit() {

    // this.logsiticinserthead =  this.fb.group({
    //   ShipmentGroupId: { value: '', disabled: true },
    //   ShipmentUserLinkTel: ''
    // });
    // first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),


    this.vehicleContainerService.Search({
      pageindex: 1,
      pagesize: 100,
      Name: ''}).subscribe(result => {

      this.vehicleContainerData = result.QueryResult;
    });


    switch (this.tasktype) {

      case 'out-tihuo':
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '外包提货', disabled: false}));
        break;
      case 'out-send':
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '外包转运', disabled: false}));
        break;
      default:
        this.saveform.addControl('TaskTypeDesc' , new FormControl({value: '未知', disabled: false}));
        break;
    }

    this.saveform.addControl('ShipmentGroupId', new FormControl({value: '', disabled: false}));

    this.saveform.addControl('SendCarTime', new FormControl({value: new Date(), disabled: false}));

    this.saveform.addControl('CarryingToolName', new FormControl({value: '', disabled: false}, Validators.required));


    this.saveform.addControl('TrincId', new FormControl({value: ''}, Validators.required));
    this.saveform.addControl('TrincName', new FormControl({value: '请选择', readonly: true}, Validators.required));

    this.saveform.addControl('SendTrincId', new FormControl({value: ''}, Validators.required));
    this.saveform.addControl('SendTrincName', new FormControl({value: '请选择', readonly: true}, Validators.required));

    this.saveform.addControl('TrincLinkMan', new FormControl({value: '', disabled: false}, Validators.required));

    this.saveform.addControl('TrincLinkTel', new FormControl());
    this.saveform.addControl('DriverName', new FormControl());

    this.saveform.addControl('SendOrderCount', new FormControl({value: 0, disabled: false}));
    this.saveform.addControl('SendOrderWeight', new FormControl({value: 0, disabled: false}));
    this.saveform.addControl('SendOrderVol', new FormControl({value: 0, disabled: false}));

    this.saveform.addControl('Mark', new FormControl());


    this.itemServiceService.LogisiticItemAddBehavior.subscribe(next => {

      if (next == null) {
        return;
      }

      this.saveform.patchValue({SendOrderCount:  this.itemServiceService.SendOrderCount});
      this.saveform.patchValue({SendOrderWeight:  this.itemServiceService.SendOrderWeight});
      this.saveform.patchValue({SendOrderVol: this.itemServiceService.SendOrderVol});


    });
  }

  /**
   * 车辆选择
   */
  selectvehicel($event: MouseEvent, height: string, width: string) {

    if ($event.clientX === 0) {
      return;
    }
    const dialogRef = this.dialog.open(ChoselogistictrincComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: ''
    });
   // (value: LogisticStore[])
    dialogRef.afterClosed().subscribe((result: CarriersTransportationpoolDetailModel) => {

      if (result != null) {



        this.saveform.patchValue({TrincId: result.ResourceId});
        this.saveform.patchValue({TrincName: result.RName});
        this.saveform.patchValue({TrincLinkMan: result.LinkMan});
        this.saveform.patchValue({TrincLinkTel: result.LinkTel});

        this.saveform.patchValue({SendTrincId: result.ResourceId});
        this.saveform.patchValue({SendTrincName: result.RName});

        console.log('CarriersTransportationpoolDetailModel');
        console.log(result);
       // this.saveform.patchValue('CarringToolId', result);
      }



    });


  }

}
