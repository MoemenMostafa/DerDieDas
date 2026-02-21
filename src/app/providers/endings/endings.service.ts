import { Injectable } from '@angular/core';
import { iWord } from '../words/words.service';

@Injectable({
  providedIn: 'root'
})
export class EndingsService {

  constructor() { }

  checkEnding(word: iWord){
    if (typeof word.ending !== 'undefined') {
      return true;
    }
  }
}
