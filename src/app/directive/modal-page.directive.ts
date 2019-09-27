import {ComponentFactoryResolver, Directive, HostListener, Input, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import {PageshipmentordersService} from '../pageservices/pageshipmentorder.service';
import {SimpleorderdetailComponent} from '../pages/myorder/simpleorderdetail/simpleorderdetail.component';

@Directive({
  selector: '[appModalPage]'
})
export class ModalPageDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('modal') identifier: string;
  @Input('modal-data') modaldata: string;

  constructor(private modalService: PageshipmentordersService,
              public viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  @HostListener('click', ['$event'])
  clickEvent(event) {

    event.preventDefault();
    event.stopPropagation();



     this.modalService.OpenDialog(this.identifier, this.modaldata);


  }

}
