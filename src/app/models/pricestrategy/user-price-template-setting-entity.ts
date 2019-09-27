import {PriceCaclSymbole} from './price-cacl-symbole';

export class UserPriceTemplateSettingEntity {
  public UseStrategyId: number;
  public  SettingId: string;
  public  Name: string;
  public  FeeType: string;
  public  UseStrategyType: string;
  public Enabel: boolean;
  public  CreateUserName: string;
  public  CreateDateTime: Date;
  public  AvailableCaclSymboles: PriceCaclSymbole[];
}
