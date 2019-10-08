// 运费计算请求
import {LogisticMathItemModel} from './logistic-math-item';

export class LogisticMathRequest {

  public  TrincId: string;

  public  RunTincName: string;

  public  UseVehicelContainerId: number;

  public  LogisticContractId: string;

  public LogisticMathItem: LogisticMathItemModel[];
  public UseVehicelId: string;
}

