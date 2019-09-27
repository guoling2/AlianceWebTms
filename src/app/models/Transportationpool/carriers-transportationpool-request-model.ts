/**
 * 运输商资料
 */
export class CarriersTransportationpoolRequestModel {

  public   ResourceId: string;

public   RName: string;

public   RType: string;


public   Enabel: boolean;


public   Mark: string;

public   LinkMan: string;

public   LinkTel: string;

public  LinkAddress: string;

public  AllowAddHandlerFee: boolean;

}
export  class CarriersTransportationpoolDetailModel extends  CarriersTransportationpoolRequestModel {
  public  IsplatformUser: boolean;
  public CreateDateTime: Date;
  public CreateUser: string;

}
