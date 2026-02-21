import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isFirstLaunchFlag;
  isFirstLaunchKey = 'isFirstLaunch';

  constructor(private storage: Storage) { }

  async isFirstLaunch(){
    if (!this.isFirstLaunchFlag){
      const isFirstLaunch = await this.storage.get(this.isFirstLaunchKey);
      if (isFirstLaunch === null) {
        this.isFirstLaunchFlag = true;
      }
    }
    return this.isFirstLaunchFlag;
  }
  setNotFirstLaunch(){
    this.storage.set(this.isFirstLaunchKey, false);
    this.isFirstLaunchFlag = false;
  }

}
