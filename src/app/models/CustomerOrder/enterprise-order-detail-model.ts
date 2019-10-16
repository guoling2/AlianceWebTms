
export class EnterpriseOrderDetailModel {
 public DisMark: string;
  public OrderStatued: number;
  public CreateDatetime: Date;
  public DisAmount: number;
  public TotalCount: number;
  public  TotalVolume: number;
  public  TotalWeight: number;
  public  ReceivingBillItemCollections: EnterpriseOrderItemModel[];
  public  DestAddress: string;
  public  Destarea: string;
  public Desttel: string;
  public Destlinkman: string;
  public Destcustomname: string;
  public SystemOrderId: string;
  public CustomerOrderId: string;
  public OrigincustomPhysicalDeotName: string;
  public OriginAddress: string;
  public Originarea: string;
  public Originlinktel: string;
  public Originlinkman: string;

}
export  class EnterpriseOrderItemModel {
  public PackageName: string;
  public TotalQty: number;
  public TotalWeight: number;
  public TotalVol: number;
  public PackageType: string;

}
