import {ShipmentOrderItemModelEntity} from './ShipmentOrderItemModelEntity';

export class ShipmentOrderSimpleModel {


    public  SystemOrderId: string;
    public  IfCargoFromOrigin: string;
    public  OrderTrackServerId: string;
    public  IfDesctPickUpMySelf: string;
    public  SendWay: string;
    public  OrigincustomLinkman: string;
    public  Origintel: string;
    public  DestLinkman: string;
    public  Desttel: string;
    public  DestCity: string;
    public  Destarea: string;
    public  DestAddress: string;
    public  TransferRouteWay: string;
    public ShipmentOrderItems: ShipmentOrderItemModelEntity[];
}
