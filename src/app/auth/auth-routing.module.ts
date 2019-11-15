import {APP_INITIALIZER, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  exports: [RouterModule],
})

export class AuthRoutingModule {}
