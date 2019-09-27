import {TmsDataEntity} from '../tms-data-entity';

export class LogisticItemModel extends TmsDataEntity {

  ShipmentId: string;

  ShipmentPlanId: string;

  SquenceId: number;

  TrackServerId: string;

  Origincustomname: string;

  OrigincustomLinkman: string;

    DesctcustomName: string;

    DestLinkman: string;

  BeginLogisticStoreName: string;

  StartArea: string;

  ActionStoreName: string;

  NextArea: string;

  NextStoreName: string;

  PlanOrderItemCount: number;

  PlanOrderItemWeight: number;

  PlanOrderItemVol: number;

  LogisticFee: number;

  // 完成时间
  FinishDatetime ?: Date;
  OrderLogisticDetailId: string;
}
