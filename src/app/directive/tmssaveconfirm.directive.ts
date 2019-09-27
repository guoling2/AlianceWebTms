import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {DialogservicesService} from '../help/dialogservices.service';

@Directive({
  selector: 'button[appTmssaveconfirm]'
})
export class TmssaveconfirmDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('comfirmMessage') message: string;

  @Input('extendata') extendata: any;

  @Output('onSuggest') onSuggest: EventEmitter<any> = new EventEmitter();

  suggestionWasClicked(result): void {
    this.onSuggest.emit(result);
  }

  constructor( private  dialogx: DialogservicesService) { }

  @HostListener('click', ['$event'])
     onClick(event) {

    event.preventDefault();
    event.stopPropagation();


    const alerter = {
      Title: '确认',
      Message: this.message,
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if (this.extendata == null) {
          this.suggestionWasClicked(result);
        } else {
          const  tmssaveconfirmEvent = new TmssaveconfirmEvent();

          tmssaveconfirmEvent.ActionFlag = result;
          tmssaveconfirmEvent.ExtendData = this.extendata;

          this.suggestionWasClicked(tmssaveconfirmEvent);
        }

      })};
    this.dialogx.openDialog(alerter);

   }

}


export class  TmssaveconfirmEvent {
  public  ActionFlag: boolean;
  public ExtendData: any;
}
