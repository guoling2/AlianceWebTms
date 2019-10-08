import {AbstractShipmentGroupModel} from './abstract-shipment-group-model';
import {FormControl, Validators} from '@angular/forms';

export class OutsideShipmentGroupModel extends AbstractShipmentGroupModel {


  public TrincId: string;
  public TrincName: string;
  public TrincLinkMan: string;
  public TrincLinkTel: string;
  public DriverName: string;
  public CarryingToolName: string;
  public SendShipmentIds: string[];

  public VehicelWeight: number;


}




