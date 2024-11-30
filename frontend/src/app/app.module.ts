import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UiModule } from './modules/ui-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenStorage } from './modules/services/token-storage.service';
import { TokenInterceptorService } from './modules/services/token-interceptor.service';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'blogAuthdb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'access_token',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'token', keypath: 'token', options: { unique: false } },
      ]
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
