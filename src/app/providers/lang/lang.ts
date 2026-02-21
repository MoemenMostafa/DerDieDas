import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable()
export class LangProvider {

    langStorageKey = "lang";

    constructor(private storage: Storage){

    }

    storeLang(langCode){
       this.storage.set(this.langStorageKey, langCode);
    }

    async getLang(){
        const lang = await this.storage.get(this.langStorageKey)
        if(lang)
            return this.storage.get(this.langStorageKey)
        else
            return environment.defaultLang
    }

}
