import {ShipmentGroupFinaceStatued} from './shipment-group-finace-statued';
import {ShipmentSubClassFee} from './shipment-sub-class-fee';
import {ShipmentPriceContract} from './shipment-price-contract';

export class ShipmentGroupStatuedModel {

  public  ShipmentGroupId: string;

  public  TransportContractFee: number;

  public  TransportHandlerFee: number;

  public  TransportAmount: number;

  public  FinaceStatued: ShipmentGroupFinaceStatued;

  public SubClassFee: ShipmentSubClassFee;

  public AutomaticContract: ShipmentPriceContract;
}
