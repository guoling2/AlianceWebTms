import {ShipmentPayCharge} from './shipment-pay-charge';

export class ShipmentPriceContract {

  public  ContractType: string;

  public  ContractName: string;

  public  TotalPrice: number;

  public  CaclMethodDesc: string;

  public ShipmentPayListCharges: ShipmentPayCharge[];
}
