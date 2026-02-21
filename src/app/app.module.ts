import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './components/menu/menu.module';
import { IonicStorageModule } from '@ionic/storage';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics/ngx';

import { TranslateModule, TranslateLoader, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory, TranslationFallbackHandler, AppInitializerFactory } from '../translations';
import { LangProvider } from './providers/lang/lang';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FirebaseAnalytics } from '@awesome-cordova-plugins/firebase-analytics/ngx';
import { FirebaseCrashlytics } from '@awesome-cordova-plugins/firebase-crashlytics/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: TranslationFallbackHandler },
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: 'ddd',
      driverOrder: ['indexeddb', 'websql']
    }),
    AppRoutingModule,
    MenuModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppCenterAnalytics,
    LangProvider,
    OneSignal,
    FirebaseAnalytics,
    FirebaseCrashlytics,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      /*
        APP_INITIALIZER
        https://angular.io/api/core/APP_INITIALIZER
      */
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [TranslateService, LangProvider],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
