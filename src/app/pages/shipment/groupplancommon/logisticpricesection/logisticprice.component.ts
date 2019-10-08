import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserPriceContractService} from '../../../../services/userpricecontract/user-price-contract.service';
import {UserPriceContractModel} from '../../../../models/UserPriceContract/user-price-contract-model';
import {VehicleContainerModel} from '../../../../models/vehiclemanagement/container-model';
import {VehicleContainerService} from '../../../../services/vehiclemanagement/vehicle-container.service';
import {ChoselogistictrincComponent} from '../../groupforoutside/sub/choselogistictrinc/choselogistictrinc.component';
import {CarriersTransportationpoolDetailModel} from '../../../../models/Transportationpool/carriers-transportationpool-request-model';
import {MatDialog} from '@angular/material/dialog';
import {LogisticpricecaclComponent} from '../logisticpricecacl/logisticpricecacl.component';
import {LogisticMathRequest} from '../../../../models/shipplangroup/logistic-math-request';
import {OutsideShipmentGroupModel} from '../../../../models/shipplangroup/outside-shipment-group-model';
import {EmitService} from '../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {LogisticItemComponentService} from '../../../../services/shiipplangroup/shipplan-item-service.service';
import {LogisticMathResponse} from '../../../../models/shipplangroup/logistic-math-response';
import {AbstractShipmentGroupModel} from '../../../../models/shipplangroup/abstract-shipment-group-model';

@Component({
  selector: 'app-shipment-logisticprice',
  templateUrl: './logisticprice.component.html',
  styleUrls: ['./logisticprice.component.css']
})
export class LogisticpriceComponent implements OnInit {

  @Input()
  public saveform: FormGroup;
  @Input()
  public usercheckId: string;
  @Input()
  public  UseVehicelContainerId = true;


  public  userPriceContractModel: UserPriceContractModel[];


  constructor( private itemServiceService: LogisticItemComponentService,  public emitService: EmitService,  private dialog: MatDialog, private  vehicleContainerService: VehicleContainerService, private userPriceContractService: UserPriceContractService) { }

  ngOnInit() {



    this.saveform.addControl('CaclId', new FormControl());

    this.saveform.addControl('TransportHandlerFee', new FormControl({value: 0, disabled: false}));

    this.saveform.addControl('TransportContractFee', new FormControl({value: 0, disabled: true}));

    this.saveform.addControl('LogisticContractId', new FormControl());

    this.saveform.addControl('LogisticFeeBlanceMethod', new FormControl({value: '10', disabled: false}));

    this.saveform.addControl('UseVehicelContainerId', new FormControl());

    this.saveform.addControl('UseVehicelWeight', new FormControl());

    this.saveform.addControl('SubClassFee', new FormGroup({
      Prepaidamt: new FormControl(0),
      Cardamt: new FormControl(0),
      Depositamt: new FormControl(0),
      Arrivalamt: new FormControl(0),
      Returnamt: new FormControl(0),
      Monthlyamt: new FormControl(0),
        }));

    this.saveform.get(this.usercheckId).valueChanges.subscribe(($event: string) => {
             this.SettingContract($event);
    });

  }

  private   SettingContract(id): void {

    this.userPriceContractService.Search({transportationpoolId: id}).subscribe(a => {

      this.userPriceContractModel = a;
    });

  }

  savedata($event: MouseEvent) {

    if ($event.clientX === 0) {
      return;
    }

    const inputvalue =  <AbstractShipmentGroupModel>this.saveform.getRawValue();

    if (inputvalue.SendTrincId === null) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择要计费的运输代表', MessageShowType.Toast));
      return;
    }


      if (inputvalue.LogisticContractId === null) {
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择一个运输协议', MessageShowType.Toast));
        return;
      }

  if (this.UseVehicelContainerId) {
    if (inputvalue.UseVehicelContainerId === null) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择一个运输车型', MessageShowType.Toast));
      return;
    }
     } else {
     inputvalue.UseVehicelContainerId = 0;
  }
    console.log(inputvalue);

    const x = new LogisticMathRequest();
    x.LogisticContractId = inputvalue.LogisticContractId;
    x.RunTincName = inputvalue.SendTrincName;
    x.TrincId = inputvalue.SendTrincId;
    x.UseVehicelContainerId = inputvalue.UseVehicelContainerId;
    x.LogisticMathItem = [];
    this.itemServiceService.LogisticItemSource.forEach(a => {

      x.LogisticMathItem.push(
        {
          OrderId: a.ShipmentId,
          SendArea: a.StartArea ,
          EndArea: a.NextArea,
          TotalTon: a.PlanOrderItemWeight,
          TotalVol: a.PlanOrderItemVol,
          TotalCount: a.PlanOrderItemCount });

    });

    console.log(x);

    const dialogRef = this.dialog.open(LogisticpricecaclComponent, {
      minWidth: 50,
      minHeight: 50,
      disableClose: true,
      data: x
    });
    // (value: LogisticStore[])
    dialogRef.afterClosed().subscribe((result: LogisticMathResponse) => {

      if (result != null) {


        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', '计算完毕', MessageShowType.Toast));

        this.saveform.patchValue({'CaclId':  result.CaclId});
        this.saveform.patchValue({'TransportContractFee': result.TotalPrice});
      }



    });

  }
}
