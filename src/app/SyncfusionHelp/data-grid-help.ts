import {DataStateChangeEventArgs, Sorts} from '@syncfusion/ej2-grids';

export  class DataGridHelp {

  /**
   *  返回正在使用的排序列
   */
  public static GetSortColumn($event: DataStateChangeEventArgs): string {

    let sortQuery = '';

    if (($event.sorted || []).length) {
      sortQuery = $event.sorted.map((obj: Sorts) => {
        return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
      }).reverse().join(',');
    }

    return sortQuery;
  }
  /**
   *  返回正在使用的排序列
   */
  public static GetSortObject($event: DataStateChangeEventArgs, searchdata: any): any {

    searchdata.Sort = this.GetSortColumn($event);
    return searchdata;
  }
}
