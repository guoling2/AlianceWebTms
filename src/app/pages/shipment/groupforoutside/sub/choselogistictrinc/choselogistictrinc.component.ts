import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Vehicelmodel} from '../../../../../models/vehiclemanagement/vehicelmodel';
import {CarriersTransportationpoolDetailModel} from '../../../../../models/Transportationpool/carriers-transportationpool-request-model';
import {BaseVehicelServiceService} from '../../../../../services/vehiclemanagement/base-vehicel-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransportationpoolForCarriersService} from '../../../../../services/Transportationpool/transportationpool-for-carriers.service';
import {PageEvent} from '@angular/material/paginator';
import {PageQueryResult} from '../../../../../models/page-query-result';
import {Basereportconfig} from '../../../../../services/base/basereportconfig';
import {Basereportservice} from '../../../../../services/base/basereportservice';

@Component({
  selector: 'app-choselogistictrinc',
  templateUrl: './choselogistictrinc.component.html',
  styleUrls: ['./choselogistictrinc.component.css']
})
export class ChoselogistictrincComponent implements OnInit {

  public form: FormGroup;

  displayedColumns: string[] = ['ResourceId', 'RName', 'RType', 'LinkMan', 'LinkTel'];

  public displaytithle = '';
  public pageindex = 0;
  public  pagelength = 0;

  customeraddressdatasource: CarriersTransportationpoolDetailModel[] = [];

  constructor(private transportationpoolForCarriersService: TransportationpoolForCarriersService,
              private basereportservice: Basereportservice,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<ChoselogistictrincComponent>,
              @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
    this.form = this.fb.group({
      RName: '' ,
      pageindex: this.pageindex,
      pagesize: 50
    });
  }
  search(pageindex: number) {

    this.form.patchValue({pageindex: pageindex + 1});


    this.basereportservice.SearchReport(Basereportconfig.Report_carrierslist, this.form.getRawValue()).subscribe(searchresult => {

      this.customeraddressdatasource = <CarriersTransportationpoolDetailModel[]>searchresult.result;
      this.pagelength = searchresult.count;
      this.pageindex = pageindex - 1;
      console.log(searchresult);

    });

  }

  chosevehicel(element: CarriersTransportationpoolDetailModel) {

    this.dialogRef.close(element);
  }

  close() {
    this.dialogRef.close();
  }

  changepage($event: PageEvent) {
    this.search( $event.pageIndex);
  }

}
