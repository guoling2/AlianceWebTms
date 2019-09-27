import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EditSettingsModel, ToolbarItems} from '@syncfusion/ej2-grids';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {LogisticItemComponentService} from '../../../../services/shiipplangroup/shipplan-item-service.service';
import {LogisticItemModel} from '../../../../models/shipment/logistic-item-model';
import {Commonsetting} from '../../../../help/commonsetting';

@Component({
  selector: 'app-shipmentplan-insert-logisticitems',
  templateUrl: './logisticitems.component.html',
  styleUrls: ['./logisticitems.component.css']
})
export class LogisticitemsComponent implements OnInit {

  gridheight: number;
  // public newRowPosition: { [key: string]: Object }[] = [
  //   { id: 'Top', newRowPosition: 'Top' },
  //   { id: 'Bottom', newRowPosition: 'Bottom' }
  // ];
  //
  @Input()
  public showdelbtn = false;

  @Input()
  public showaddbtn = false;

  @Input()
  public showspliter = false;

  displayedColumns: string[] = ['TrackServerId', 'OrigincustomLinkman', 'DestLinkman', 'ActionStoreName'];

  DataSource: LogisticItemModel[];

  @ViewChild('logitsticitemgrid', {static: true})
  public grid: GridComponent;

  constructor(private itemServiceService: LogisticItemComponentService) { }


  public editSettings: EditSettingsModel;


  ngOnInit() {
    this.gridheight = Commonsetting.GridHeightshort2();
    this.editSettings = {  allowEditing: true, allowAdding: true, allowDeleting: true , newRowPosition: 'Top' };


    this.grid.dataSource = this.itemServiceService.LogisticItemSource;

    // this.itemServiceService.LogisiticItemAddBehavior.subscribe(next => {
    //
    //
    //   console.log('页面加载了数据');
    //   console.log(next);
    //  // this.DataSource = this.itemServiceService.LogisticItemSource;
    //   this.grid.dataSource = this.itemServiceService.LogisticItemSource;
    //   if (next != null) {
    //     this.grid.refresh();
    //   }
    //   console.log('加载数量' + this.itemServiceService.LogisticItemSource.length);
    //
    // });

  }

  reload() {



  }
}
