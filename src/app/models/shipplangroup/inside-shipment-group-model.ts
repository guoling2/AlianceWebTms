import {AbstractShipmentGroupModel} from './abstract-shipment-group-model';

export class InsideShipmentGroupModel  extends AbstractShipmentGroupModel {

  public  CarringToolId: string;

  public  CarryingToolName: string;
  /**
   * 司机的系统代号
   */
  public  ShipmentUserId: string;

  public ShipmentUserDesc: string;

  public SendShipmentIds: string[];
}
