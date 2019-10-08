import {Injectable} from '@angular/core';
import {LogisticItemModel} from '../../models/shipment/logistic-item-model';
import {BehaviorSubject} from 'rxjs';
import {UpdateModelType} from '../../models/tms-data-entity';
import {Error} from 'tslint/lib/error';
import {IndexedDBService} from '../indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class LogisticItemComponentService {



  public LogisticItemSource: LogisticItemModel[];


  public SendOrderCount = 0;
  public SendOrderWeight = 0;
  public SendOrderVol = 0;

  public LogisiticItemAddBehavior: BehaviorSubject<LogisticItemModel>;
  constructor( private  indexedDBService: IndexedDBService) {




    this.LogisticItemSource = [];

    this.LogisiticItemAddBehavior = new BehaviorSubject<LogisticItemModel>(null);

    this.indexedDBService.open();
   // this.LogisticItemModelObservble=new Observable<LogisticItemModel[]>();
  }


  public  ClearData(): void {

    this.SendOrderCount = 0;
    this.SendOrderWeight = 0;
    this.SendOrderVol = 0;

    this.LogisticItemSource = [];
  }
   public  AttchItem(item: LogisticItemModel): void {

   // 读取的数据的单位是克和立方厘米  需要转换为吨和方

    item.UpdateModelType = UpdateModelType.Insert;

    if (this.LogisticItemSource.findIndex(t => t.ShipmentId === item.ShipmentId) === -1) {

      this.LogisticItemSource.push(item);



      item.SquenceId += this.LogisticItemSource.length + 1;

      this.SendOrderCount = this.SendOrderCount + item.PlanOrderItemCount;
      this.SendOrderVol = this.SendOrderVol + (item.PlanOrderItemVol / 1000 / 1000);
      this.SendOrderWeight = this.SendOrderWeight + (item.PlanOrderItemWeight / 1000 / 1000);

      this.LogisiticItemAddBehavior.next(item);

      console.log('读取SendOrderCount' +  this.SendOrderCount);
      console.log('读取SendOrderVol' +  this.SendOrderCount);
      console.log('读取SendOrderCount' +  this.SendOrderCount);
      // this.indexedDBService.insert('ShipPlanItem', item).then(a => {
      //   console.log(a);
      // });
      console.log('添加了' + item);
    }

   // this.LogisticItemModelObservble
  }

   public  RemoveAttchItem(ShipmentId: string): void {

     const index = this.LogisticItemSource.findIndex(t => t.ShipmentId == ShipmentId);

     this.LogisticItemSource.splice(index, 1);

   }
}

