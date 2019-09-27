import {VehicleContainerService} from '../../services/vehiclemanagement/vehicle-container.service';

export class OutTruckTransportationpoolRequestModel {

  public   ResourceId: string;

/// <summary>
/// RName  司机的名字 应为需要和平台对接
/// 所以都是以人为主体
/// </summary>
public   RName: string;

/// <summary>
/// RType
/// </summary>
public   RType: string;

/// <summary>
/// Enabel
/// </summary>
public   Enabel: boolean;

/// <summary>
/// Mark
/// </summary>
public   Mark: string;

/// <summary>
/// 车牌号
/// </summary>
public   Trnum: string;
/// <summary>
/// GPS类型
/// </summary>
public   Gpstype: string;

/// <summary>
/// GPS号码
/// </summary>
public   Gpsno: string;
/// <summary>
/// 车类型
/// </summary>
public   Trtype: string;
/// <summary>
/// 载重
/// </summary>
public   Weight: number;
/// <summary>
/// 体积
/// </summary>
public   Volume: number;
/// <summary>
/// 长
/// </summary>
public   Length ?: number;
/// <summary>
/// 宽
/// </summary>
public   Width ?: number;
/// <summary>
/// 高
/// </summary>
public   Height ?: number;
/// <summary>
/// 司机电话
/// </summary>
public   Drtel: string;
/// <summary>
/// 司机身份证号
/// </summary>
public   Dridnum: string;
/// <summary>
/// 驾驶证号
/// </summary>
public   Drlicensenum: string;
/// <summary>
/// 司机住址
/// </summary>
public   Draddr: string;
//写反了
public  AllowAddHandlerFee: boolean;
}


export  class  OutTruckTransportationpoolDetail extends OutTruckTransportationpoolRequestModel {
  public  IsplatformUser: boolean; // 是否平台用户
public  CreateUser: string; // 创建人
public  CreateDateTime: Date; // 创建时间
public  Paymode: string; // 支付方式
public  Source: string;  // 来源
public  Drname: string;  // 司机名称
}
