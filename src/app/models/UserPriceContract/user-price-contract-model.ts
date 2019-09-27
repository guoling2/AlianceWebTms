
export class UserPriceContractModel {


  public ContractId: string;
  public ContractName: string;
  public OwnTransportationpoolId: string;
  public UsePriceTemplateSettingId: string;
  public CaclMethod: number;
  public PayMethod: number;
  public  PriceResultProcessMethod: number;
  public AutoGenerateBill: boolean;
  public TaskBeginTime: Date;
  public TaskEndTime?: Date;
  public Enabel: boolean;

  public  UseTemplateName: string;

  public  UsePriceStrategyName: string;
  public  CaclMethodDesc: string;
  public  PayMethodDesc: string;
  public  PriceResultProcessMethodDesc: string;
  public  CreateDateTime; Date;
  public  CreateUserName: string;
  public  UpdateDateTme ?: Date;
  public  UpdateUser: string;
  public OwnTransportationpoolName: string;
}
