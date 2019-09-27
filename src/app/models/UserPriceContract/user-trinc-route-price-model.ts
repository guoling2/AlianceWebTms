import {UserTrincRoutePriceValueModel} from './user-trinc-route-price-value-model';

export class UserTrincRoutePriceModel {

  public  PriceId: string;

  public  ContractId: string;
  public ContractName: string;
  public OwnTrincName: string;
  public  StartAreaId: string;
  public  ToAreaId: string;
  public  TimeLimite: number;
  public  RunPriceLimite: boolean;
  public  MinPrice: number;
  public  StartAreaDesc: string;
  public  ToAreaDesc: string;
  public  ToAreaLeave: number;
  public  ToAreaProvince: string;
  public UserName: string;
  public DateTime: Date;
  public  PriceValues: UserTrincRoutePriceValueModel[];
}
