import {FormArray, Validators} from '@angular/forms';
import {ShipmentOrderItemModelEntity} from './ShipmentOrderItemModelEntity';

export class ShipmentOrderComplexModel {

  public SystemOrderId: string;
 public CustomerOrderId: string;
  public TrackOrderNumber: string;
  public IfCargoFromOrigin: boolean; // 是否上门提货
   public IfDesctPickUpMySelf: boolean;
  public FreeTihuo: boolean; // 是否免费提货
  public TihuoReturn: string;
  public OrderItemCaclProperty: string;
  public BuinessManCode: string;
  public AskTihuoTime: string;
  public BuinessMancommission: string; // { value: '', disabled: true }, // 佣金
  public BuinessMancommissionIsReturn: string; // { value: false, disabled: true }, // 佣金已返

  public OrigincustomId: string; // 客户编码
  public Origincustomname: string;
  public OrigincustomLinkman: string;
  public Origintel: string;
  public OriginCity: string;
  public OriginArea: string;
  public OriginAddress: string;

  public DestcustomId: string; // 到货客户编码
  public Destcustomname: string;
  public DestcustomLinkman: string;
  public Desttel: string;
  public DestCity: string;
  public DestArea: string;
  public DestAddress: string;
  public InnerMark: string;
  // ShipmentOrderItems: new FormArray([]),

  public Destservice: string; // 交货方式，
  public TransportMethod: string; // 运输方式
  public BeginLogisticStoreId: string; // 始发网点
  public EndLogisticStoreId: string; // 末端配送网点
  public BeginLogisticStoreName: string; //始发网点名称
  public EndLogisticStoreName : string; //末端配送网点名称


  public OrderAskLimiteDateTime ?: Date ;
  public RoutePlanId: string; // 运输计划
  public TransportMark: string; // 运输备注
  // 增值业务
  public DeclaredValue:  number; // 声明货物价值
  public CollectionOnDeliveryAmount ?: number; // 声明代收货款
  public CollectionOnDeliveryAmountFee ?: number; // 声明代收货款

  public CollectionOnDeliveryBankPeopleName: string; // 代收货款人姓名
  public CollectionOnDeliveryBankNumber: string; // 代收货款银行账号
  public InvoiceTitle: string; // 发票抬头
  public IsOpenInvoice: boolean; // 是否开票

  public Needreturntrackingno: boolean; // 是否回单
  public CargoReceiptPaperCount: number;
  public CargoReceiptPaperShowType: string; // 回单返回方式
  public ConpunCode: string; // 优惠折扣代码
  public PaymentMethod: number; // 付款方式
  public PaymentMethodDesc: string; // 付款方式描述

  // 费用信息
  public TihuoFee: number;
  public BaseTransportFee: number; // 基本运费
  public SonhuoFee: number; // 送货费
  public AddValueFee:  number; // 增值费用
  public ExtendOtherFee:  number; // 额外费用
  public RealInputLogisticFee:  number; // 实际费用



  public PayNow:  number;   // 现付
  public PayArrived:  number;   // 到付
  public PayReceipt:  number;  // 回付
  public PayByCollectionOnDelivery:  number; // 货款扣
  public PayOnMonthly:  number; // 月 付
  public Tifu:  number; // 提付


  public TotalCount: number;
  public TotalVolume: number;
 public TotalWeight: number;
  public OrderZhWeight: number;
  public OrderZhVol: number;
  public OrderPhWeight: number;
  public OrderPhVol: number;

  public OrderDestserviceDesc: string;

  public ShipmentOrderItems: ShipmentOrderItemModelEntity[];
  public DeliveryFee: number;
  public  AcceptUser: string;
  public  AcceptDateTime: Date;


}
