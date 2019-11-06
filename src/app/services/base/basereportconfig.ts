export class Basereportconfig {

  /**
   * 用于物流公司在途时效的查询
   */
  public  static   Report_logisticroutingtrack = 'logisticroutingtrack';

  /**
   * 用于客户页面查询交货单使用
   */
  public  static   Report_customerorderlist = 'customerorderlist';
  /**
   *  自己运营的物流单列表
   */
  public  static   Report_logisticmyorderlist = 'logisticmyorderlist';
  /**
   * 同城订单
   */
  public  static   Report_logisttongchenglist = 'logistictongchengorder';
  /**
   * 物流卸车
   */
  public  static   Report_wuliuxieche = 'wuliuxieche';

  /**
   * 物流卸车 中转
   */
  public  static   Report_wuliuxiecheFortransfer = 'wuliuxiechefortransfer';
  /**
   * 异常列表
   */
  public  static   Report_orderAbnormallist = 'orderAbnormallist';

  /**
   * 异常全部列表
   */
  public  static   Report_orderAbnormallistall = 'orderAbnormallistall';
  /**
   * 网点签收
   */
  public  static  Report_logisticordersignlist = 'logisticordersignlist';
  /**
   * 路由节点
   */
  public  static  Report_transportroutenodelist = 'transportroutenodelist';
  /**
   * 物流发货客户资料
   */
  public  static  Report_customerprofilelist = 'customerprofilelist';

  /**
   * 物流小车提货
   */
  public  static  Report_localtihuolist = 'logisticlocaltihuo';
  /**
   * 物流网点转运
   */
  public  static  Report_logistictransfer = 'logistictransfer';
  /**
   * 物流网点送货
   */
  public  static  Report_logisticbendisend = 'logisticbendisend';
  /**
   * 派车运输
   */
  public  static  Report_senditemlist = 'logisticsenditem';
  /**
   * 提货安排以后的查询
   */
  public  static  Report_tihuoafterlist = 'tihuoafterlist';
  /**
   * 送货查询
   */
  public  static  Report_senditemfterlist = 'senditemlist';

  /**
   * 转运&大车直送查询
   */
  public  static  Report_logistictransferlist = 'transferafterlist';

  /**
   * 承运商资料查询
   */
  public  static  Report_carrierslist = 'carrierslist';
  /**
   * 外租车资料
   */
  public  static  Report_couttracklist = 'outtracklist';

  /**
   * 外租车提货 单纯的提货
   */
  public  static  Report_logisticouttihuolist = 'logisticouttihuo';

  /***
   * 转运外包
   */
  public  static  Report_logisticoutsendlist = 'logisticoutsend';
  /***
   * 转运外包派车之后的查询
   */
  public  static  Report_outsendlistafterlist = 'outsendlistafter';
}

/**
 * 企业客户报表
 */
export  class EnterpriseCustomer {
  /**
   * 运输商查询配分给他的订单数据
   */
  public  static  Report_EnterpriseOrderList = 'EnterpriseOrderList';

  public  static  Report_EnterpriseAcceptDepotList = 'AcceptDepotList';
}
