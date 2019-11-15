import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AuthModule } from 'angular-auth-oidc-client';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AppConfiguration} from './config/app-configuration';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';

import {LoginComponent} from './component/login/login.component';
import {CallBackComponent} from './component/callBack/call-back.component';
import {UnauthorizedComponent} from './component/unauthorized/unauthorized.component';
import {Routes} from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'callback', component: CallBackComponent},
  { path: 'unauthorized', component: UnauthorizedComponent}
];




@NgModule({
  imports: [
    AuthModule.forRoot(),
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [

    AppConfiguration
  ],
  declarations: [LoginComponent, CallBackComponent, ForbiddenComponent, UnauthorizedComponent]
})
export class TmsAuthModule {
}
