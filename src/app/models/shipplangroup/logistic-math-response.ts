import {LogisticMathCaclOrderItem} from './logistic-math-cacl-order-item';

export class LogisticMathResponse {

  /**
   * 计算编号
   */
  public  CaclId: string;
  /**
   * 运输代理名称
   */
  public  TrincName: string;
  /**
   * 运费计算
   */
  public  TotalPrice: number;
  /**
   * 是否有错误
   */
  public  ItemError: boolean;
  /**
   * 平均方案
   */
  public PriceBlanceMethod: number;


  public  PriceResultProcess: number;

  public  LogisticMathCaclOrderItems: LogisticMathCaclOrderItem[];
}

