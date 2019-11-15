import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {AdminModule} from './admin/admin.module';
import {TmsAuthModule} from './auth/tmsauth.module';
import {SharedModule} from './shared/shared.module';
import {EmitService} from './help/emit-service';
import { AlertDirective } from './directive/alert.directive';
import { AlerthiddenDirective } from './directive/alerthidden.directive';
import {DialogservicesService} from './help/dialogservices.service';
import {RouteReuseStrategy} from '@angular/router';
import {CustomerModuleModule} from './pages/customer/customer.module';
import {OidcSecurityService, AuthWellKnownEndpoints, OidcConfigService, ConfigResult, OpenIdConfiguration} from 'angular-auth-oidc-client';

import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';
import {AppConfiguration} from './auth/config/app-configuration';
import {CommonbizmoduleModule} from './pages/common/commonbizmodule.module';
import {AppbuinessModule} from './appbuiness.module';
import {MulipageReuseStrategy} from './mulipage-reuse-strategy';
import {IndexedDBService} from './services/indexed-db.service';
import {PageshipmentordersService} from './pageservices/pageshipmentorder.service';
import {ModalPageDirective} from './directive/modal-page.directive';



export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];


export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');

  console.log(environment.production);


    return () => oidcConfigService.load(`https://aliance.trandawl.cn/api/OidcSecurity/config`);

  if (environment.production) {


    console.log('产品版本');

    return () => oidcConfigService.load(`${window.location.origin}/api/OidcSecurity/config`);

  } else {

    console.log('开发版本');

    return () => oidcConfigService.load(`http://localhost:52631/api/OidcSecurity/config`);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    AlertDirective,
    AlerthiddenDirective,

  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    CustomerModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    TmsAuthModule,
    AdminModule,
    AppbuinessModule,


  ],
  providers: [
    IndexedDBService,
    EmitService,
    DialogservicesService,
    OidcConfigService,
    OidcSecurityService,

  {
    provide: 'DbName',
    useValue: 'AlianceWebTmsDB'
  },

    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
    HttpInterceptorProviders,
  ],
  exports: [
    AlertDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService,
    private appconfiguration: AppConfiguration
  ) {

    this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult)  => {



      console.log( '加载授权配置数据');

      console.log(configResult);

      const  baseurl = `${window.location.origin}`;


      const openIDImplicitFlowConfiguration: OpenIdConfiguration = {
        stsServer: configResult.customConfig.stsServer,
        redirect_url: baseurl + configResult.customConfig.redirect_url,
        client_id: configResult.customConfig.client_id,
        response_type: configResult.customConfig.response_type,
        scope: configResult.customConfig.scope,
        post_logout_redirect_uri: configResult.customConfig.post_logout_redirect_uri,
        start_checksession: true,
        silent_renew: true,
        silent_renew_url: baseurl + '/assets/silent-renew.html',
        post_login_route: configResult.customConfig.startup_route,
        forbidden_route: '/forbidden',
        unauthorized_route: configResult.customConfig.unauthorized_route,
        log_console_warning_active: true,
        log_console_debug_active: true,
        max_id_token_iat_offset_allowed_in_seconds: 10,
        history_cleanup_off: true

      };

      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, configResult.authWellknownEndpoints);

      this.appconfiguration.Server = configResult.customConfig.apiServer;

      console.log(openIDImplicitFlowConfiguration);

    });

    console.log('认证配置加载结束');
  }
}
