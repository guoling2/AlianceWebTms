import {LogisticMathItemModel} from './logistic-math-item';
import {LogisticMathCaclTip} from './logistic-math-cacl-tip';

export class LogisticMathCaclOrderItem {
  /**
   * 关联的请求数据
   */
  public LogisticMathItem: LogisticMathItemModel;

  /**
   * 订单标识
   */
  public  OrderId: string;
  /**
   * 按重量统计的单价
   */
  public  SingelWeightprice: number;
  /**
   * 按体积统计的单价
   */
  public  SingelVolprice: number;
  /**
   *  按数量统计的单价
   */
  public  SingelCountPrice: number;

  /**
   * 实际值 一般不需要考虑 这个 系统使用
   */
  public  RealPrice: number;

  /**
   * 计算值 一般不需要考虑 这个 系统使用
   */
  public  CaclPrice: number;
  /**
   * 总数均摊完的值   用户使用这个值
   */
  public  AvgPrice: number;
  /**
   * 是否执行限价
   */
  public  RunPriceLimite: boolean;
  /**
   * 最低价
   */
  public  MinPrice: number;
  /**
   * 错误描述
   */
  public  ErropTips: LogisticMathCaclTip[];

  /**
   * 是否有错误
   */
  public  HasError: boolean;

}
