import { TranslateService } from '@ngx-translate/core';
import { LangProvider } from 'app/providers/lang/lang';
import { environment } from '../environments/environment';

/* 
  safely use translate.instant()
  https://github.com/ngx-translate/core/issues/517#issuecomment-299637956 

  Also load default lang
*/

export function AppInitializerFactory(translate: TranslateService, langProvider: LangProvider) {
    return async () => {
      translate.setDefaultLang(environment.defaultLang);
      return translate.use(await langProvider.getLang()).toPromise();
    };
  }