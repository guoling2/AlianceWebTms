import {FormControl} from '@angular/forms';
import {ShipmentGroupFinaceStatued} from './shipment-group-finace-statued';
import {ShipmentSubClassFee} from './shipment-sub-class-fee';

export class AbstractShipmentGroupModel {

  public VehicelTypeDesc: string; // 车辆类型
  public ShipmentGroupId: string;  // 派车单号
  public  VehicelVolume: number;   // 使用车辆的体积
  public  VehicelWeight: number;  // 使用车辆的重量

  public LogisticContractId: string; // 使用的合同
  public LogisticFeeBlanceMethod: number; // 使用的订单运费均摊方式
  public UseVehicelContainerId: number; // 使用的运输车型


  public TaskTypeDesc: string; // 任务类型

  public CreateDateTime: Date; // 创建日期
  public CreateUserName: string; // 创建人
  // 是否发运了
  public IsSend: boolean; // 是否发运

  public CaclId: string; // 运费计算标识

  public SendCarTime?: Date; // 发运日期

  public  TransportHandlerFee: number; // 手写运费

  public  TransportContractFee: number; // 合同运费

  public TotalLogisticFee: number;// inside部分添加 Out部分未确认

  public Mark: string; // 运输备注


  public  FinaceStatued: ShipmentGroupFinaceStatued;

  public SubClassFee: ShipmentSubClassFee;

  public SendTrincName: string;

  public SendTrincId: string;

  public  SendOrderCount: number;
public  SendOrderWeight: number;
public  SendOrderVol: number;
  /**
   * 总费用合计
   */

  public get TotalFee() {

    const result = this.TransportHandlerFee + this.TransportContractFee;
    console.log(result);
    return result;
  }
}
