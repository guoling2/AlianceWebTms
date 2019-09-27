import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {XiechetransfercodeComponent} from '../pages/shipment/xiechetransfersetting/xiechetransfercode.component';
import {MatDialog} from '@angular/material/dialog';
import {SimpleorderdetailComponent} from '../pages/myorder/simpleorderdetail/simpleorderdetail.component';
import {PricetemplateinsertComponent} from '../pages/logisticpricemanagement/pricetemplateinsert/pricetemplateinsert.component';

@Injectable({
  providedIn: 'root'
})
export class PageshipmentordersService {

  private componentRef: ComponentRef<any>;
  private stage: any;
  private element: any;

  constructor(private dialog: MatDialog,

              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }


  private createFormModal(component: any): Element {

    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

    this.componentRef.instance.modal = this;

    // this.componentRef.instance.parameter = "Data here";

    this.appRef.attachView(this.componentRef.hostView);

    return (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

  }

  public OpenDialog(component: string, modaldata: string): void {


    const  comx = EntryComponentsMap.Data.find(t => t['Id'] === component);
    console.log(comx);
   // this.element = this.createFormModal(component);
   // const refx = this.componentFactoryResolver.resolveComponentFactory(component);

   // console.log(refx);

    const dialogRef = this.dialog.open( comx['Component'], {
      minWidth: 500,
      minHeight: 500,
      disableClose: false,
      data: modaldata
    });

  }
}


export class EntryComponentsMap {

  public static Data: Object[] = [
    { Id: 'SimpleorderdetailComponent', Component: SimpleorderdetailComponent}
  ];


}
