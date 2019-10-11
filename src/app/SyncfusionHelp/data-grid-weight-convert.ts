import {Column, ICellFormatter} from '@syncfusion/ej2-grids';

export class DataGridWeightConvert implements ICellFormatter {
    public getValue(column: Column, data: Object): Object {

      console.log(data);
   return '2';
  }

}


// *class ExtendedFormatter implements ICellFormatter {
//   *public getValue(column: Column, data: Object): Object {
//   *  return '<span style="color:' + (data['Verified'] ? 'green' : 'red') + '"><i>' + data['Verified'] + '</i><span>';
//   *}
// *}
