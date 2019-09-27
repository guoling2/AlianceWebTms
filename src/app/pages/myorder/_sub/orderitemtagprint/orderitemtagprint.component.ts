import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-orderitemtagprint',
  templateUrl: './orderitemtagprint.component.html',
  styleUrls: ['./orderitemtagprint.component.css']
})
export class OrderitemtagprintComponent implements OnInit {


  iframe: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<OrderitemtagprintComponent>,
               @Inject(MAT_DIALOG_DATA) public data: string) {

  }

  ngOnInit() {

    const urldata = 'https://print.trandawl.cn/OrderPrint/TagPrint?logisticorderId=' + this.data;
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(
      urldata);
  }

}
