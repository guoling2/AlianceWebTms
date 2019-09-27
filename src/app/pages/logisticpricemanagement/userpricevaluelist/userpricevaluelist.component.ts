import { Component, ViewEncapsulation, Inject, ViewChild, OnInit } from '@angular/core';
import {FieldsSettingsModel, NodeClickEventArgs, SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-angular-navigations';
import {PricestrategyService} from '../../../services/pricestrategy/pricestrategy.service';
import {itemClick} from '@syncfusion/ej2-treemap';
import {DataManager, Predicate, Query} from '@syncfusion/ej2-data';
import {UserPriceTemplateSettingService} from '../../../services/pricestrategy/user-price-template-setting.service';
import {UserPriceTemplateDataService} from '../../../services/pricestrategy/user-price-template-data.service';
import set = Reflect.set;
import {Column, ColumnModel, GridComponent} from '@syncfusion/ej2-angular-grids';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TmsDictionary} from '../../../help/Dictionary';
import {UserTrincRoutePriceService} from '../../../services/userpricecontract/user-trinc-route-price.service';
@Component({
  selector: 'app-userpricevaluelist',
  templateUrl: './userpricevaluelist.component.html',
  styleUrls: ['./userpricevaluelist.component.css']
})
export class UserpricevaluelistComponent implements OnInit {



  searchp: FormGroup;

  @ViewChild('sidebarTreeviewInstance', {static: false})
  public sidebarTreeviewInstance: SidebarComponent;
  @ViewChild('priceStrategytreeview', {static: false})
  public priceStrategytreeview: TreeViewComponent;
  @ViewChild('pricedatasource', {static: false})
  public pricedatasource: GridComponent;

  mediaQuery: string = ('(min-width: 600px)');
  target = '.main-content';

  public data = new DataManager([
    {nodeId: '2', nodeText: '整车策略', iconCss: '', expanded: true},
    {nodeId: ' 1', nodeText: '吨/方策略', iconCss: '', expanded: true},
    {nodeId: '3', nodeText: '件策略', iconCss: '', expanded: true},
    {nodeId: ' 4', nodeText: '吨策略', iconCss: '', expanded: true},
    {nodeId: ' 5', nodeText: '方策略', iconCss: '', expanded: true},
    {nodeId: ' 6', nodeText: '吨/方取大策略', iconCss: ''},
  ]);
  // { [key: string]: Column[] }[]
  gridcolumndata: TmsDictionary<string, Column[]> = new TmsDictionary<string, Column[]>() ;

  defaultcolumns: Column[] = null;
  constructor(
    private fb: FormBuilder,
    private userTrincRoutePriceService: UserTrincRoutePriceService,
    private userPriceTemplateDataService: UserPriceTemplateDataService,
    private pricestrategyService: PricestrategyService,
    private userPriceTemplateSettingService: UserPriceTemplateSettingService) {
  }


  public field: FieldsSettingsModel = {dataSource: null, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'iconCss'};

  ngOnInit() {

    this.searchp = this.fb.group(
      {
        TemplateSettingName: '',
        UsePriceTemplateSettingId: ['', Validators.required],
        RName: '',
        ContractName: '',
        StartAreaDesc: '',
        ToAreaDesc: ''});

   // this.priceStrategytreeview.addNodes( {nodeId: '2', nodeText: '整车', iconCss: 'icon-microchip icon',   nodeChild: []})
    this.field.dataSource = this.data;

    this.userPriceTemplateSettingService.Search(null).subscribe(a => {

      a.forEach(value => {

       const chosedata = this.data.executeLocal(
         new Query().where( new Predicate('nodeId', 'equal', value.UseStrategyId.toString())).take(1));

       this.priceStrategytreeview.addNodes([ {nodeId: value.SettingId, nodeText: value.Name, iconCss: 'icon-circle-thin icon'}],
         value.UseStrategyId.toString());
      });
    });
  }


  // open new tab
  newTabClick(): void {
    const URL = location.href.replace(location.search, '');
    document.getElementById('newTab').setAttribute('href', URL.split('#')[0] + 'sidebar/responsive-panel');
  }

  openClick() {
    this.sidebarTreeviewInstance.toggle();
  }

  openpricedata($event: NodeClickEventArgs) {

    // HTMLLIElement
   // console.log($event.event);
   // console.log($event.node);

    const  id = $event.node.getAttribute('data-uid');

    const selectednodetext = this.priceStrategytreeview.getNode(id);

   // console.log(selectednode);

    if (id.length > 3) {
      this.builddatagridcolumn(id);
      this.searchp.patchValue({'TemplateSettingName': selectednodetext['text']});
      this.searchp.patchValue({'UsePriceTemplateSettingId': id});
    }

  }



  // 构建查询表格列
  private   builddatagridcolumn(settingid: string): void {

    // alert(settingid);

    if (this.defaultcolumns === null) {
      this.defaultcolumns = <Column[]>this.pricedatasource.columns;


      // alert('默认列');
      console.log(this.defaultcolumns );
    }

    const currentcolumn = this.gridcolumndata.ContainsKey(settingid);


    // alert(currentcolumn);

    if (currentcolumn === false) {
      const tempcolumn = [];
      this.defaultcolumns .forEach(a => {tempcolumn.push(a); });

      this.userPriceTemplateDataService.Search(settingid).subscribe(a => {


        //  const currentcolumn = <Column[] > this.pricedatasource.columns ;
        // <Column[] > this.pricedatasource.columns ;
        a.forEach(item => {
          // const column = new Column({
          //   field: item.ColumnName,
          //   headerText: item.ColumnDesc
          // });
          // column.field = item.ColumnName;
          // column.headerText = item.ColumnDesc;
          tempcolumn.push( new Column({
            field: item.ColumnName,
            headerText: item.ColumnDesc,
            width: 120,
          }));
        });
        console.log(currentcolumn);

        this.gridcolumndata.Add(settingid, tempcolumn);

        this.pricedatasource.columns = tempcolumn;

        console.log(this.pricedatasource.columns );
        //  ;
        // this.pricedatasource.columns = [
        //   { field: 'CustomerID', headerText: 'Customer ID' }];
        // console.log(a);
      });
    } else {
      this.pricedatasource.columns =  this.gridcolumndata.TryGetValue(settingid);
    }
   // const currentcolumn = [];



  }

  searching() {

    console.log(this.searchp.getRawValue());

    if (this.searchp.valid === false) {
      return;
    }
    this.userTrincRoutePriceService.SearchViewDate(this.searchp.getRawValue()).subscribe(a => {

      this.pricedatasource.dataSource = a;
    });
  }

}

export interface TreeNodeInterface {

   nodeid: string;
   nodeText: string;
   iconCss: string;
   nodeChild: object[];

}
