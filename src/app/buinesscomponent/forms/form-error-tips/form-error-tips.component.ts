import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-error-tips',
  templateUrl: './form-error-tips.component.html',
  styleUrls: ['./form-error-tips.component.css']
})
export class FormErrorTipsComponent implements OnInit {

  @Input('errormsg') Message: string;

  @Input('webforms') reactForm: FormGroup;

  @Input('controlname') controlname: string;

  constructor() { }

  ngOnInit() {
  }

  get check() {
    return this.reactForm.get(this.controlname); }
}
