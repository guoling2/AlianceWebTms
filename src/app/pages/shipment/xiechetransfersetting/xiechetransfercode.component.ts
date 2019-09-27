import {Component, OnInit} from '@angular/core';
import {XiechetransferService} from '../../../services/xieche/xiechetransfer.service';
import {XiechetransferView} from '../../../models/xieche/xiechetransfer-view';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {EmitService} from '../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';

@Component({
  selector: 'app-xiechetransfercode',
  templateUrl: './xiechetransfercode.component.html',
  styleUrls: ['./xiechetransfercode.component.css']
})
export class XiechetransfercodeComponent implements OnInit {

  displayedColumns: string[] = ['select', 'ShipmentGroupId', 'CarryingToolName', 'ShipmentUserDesc', 'TotalCount', 'TotalWeight', 'TotalVol', 'XieCheCode'];
  dataSource = new MatTableDataSource<XiechetransferView>();
  selection = new SelectionModel<XiechetransferView>(true, []);

  constructor(public emitService: EmitService, private xiechetransferService: XiechetransferService) { }

  ngOnInit() {

    this.xiechetransferService.CollectionTransferOrder('').subscribe(a => {

      this.dataSource.data = a;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: XiechetransferView): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  setting() {

    this.selection.selected.forEach((a, index) => {

      this.xiechetransferService.SettingXieCheCode(a).subscribe(result => {
        a.XieCheCode = '设置完成';
        this.emitService.eventEmit.emit(
          new EmitAlertMessage(AlertMessageType.Info,
            '系统信息', result.Data.toString(), MessageShowType.Toast));
      });

    });

  }
}
