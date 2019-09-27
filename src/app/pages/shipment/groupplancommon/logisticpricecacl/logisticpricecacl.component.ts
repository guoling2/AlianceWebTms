import {Component, Inject, OnInit} from '@angular/core';
import {ShipplanLogisticAutoCaclService} from '../../../../services/shiipplangroup/shipplan-logistic-atuocacl.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LogisticMathRequest} from '../../../../models/shipplangroup/logistic-math-request';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {LogisticMathResponse} from '../../../../models/shipplangroup/logistic-math-response';
import {LogisticMathCaclTip} from '../../../../models/shipplangroup/logistic-math-cacl-tip';
import {timer} from 'rxjs';

@Component({
  selector: 'app-logisticpricecacl',
  templateUrl: './logisticpricecacl.component.html',
  styleUrls: ['./logisticpricecacl.component.css']
})
export class LogisticpricecaclComponent implements OnInit {
  ErrorMsg: string;

  ErrorTips: LogisticMathCaclTip[] = [];

  hidden = false;
  constructor(private shipplanLogisticAutoCaclService: ShipplanLogisticAutoCaclService, public dialogRef: MatDialogRef<LogisticpricecaclComponent>,
              @Inject(MAT_DIALOG_DATA) public parameter: LogisticMathRequest) { }

  ngOnInit() {

   // console.log(new Date ());

    timer(2000).subscribe(x => this.cacl());

  }

  cacl() {

    this.shipplanLogisticAutoCaclService.Cacl(this.parameter).subscribe(a => {

      this.hidden = true;

      if (a.StatusCode !== TmsresponseStatusCode.Succeed()) {

        this.ErrorMsg = a.Info;

      } else {

           const caclresult =  <LogisticMathResponse>a.Data;

           if (caclresult.ItemError) {
             caclresult.LogisticMathCaclOrderItems.forEach(a => {

               a.ErropTips.forEach(b => {

                 this.ErrorTips.push(b);
               });
             });
           } else {
            this.dialogRef.close(caclresult);
           }
      }
      console.log(a);
    });
  }
}
