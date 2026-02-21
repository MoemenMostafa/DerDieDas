import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import data from '../../../assets/json/words.json';
import { LoggerService } from '../logger/logger.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private storage: Storage) {

  }

  words: iWords = data;


  static getImgPath() {
    return '/assets/words/';
  }

  getWord(index) {
    return this.words[index];
  }

  async saveWordProgress(index, isCorrect) {
    try {
      let wordProgressJson = await this.storage.get('wordProgress');
      if (wordProgressJson && wordProgressJson[index]) {
        if (isCorrect) {
          if (wordProgressJson[index].score < environment.wordScoreLimit) {
            wordProgressJson[index].score += 1;
          }
        } else if (wordProgressJson[index].score > 0) {
          wordProgressJson[index].score -= 1;
        }
      } else if (isCorrect) {
        if (!wordProgressJson) { wordProgressJson = {}; }
        wordProgressJson[index] = { score: 1 };
      }
      await this.storage.set('wordProgress', wordProgressJson);
    } catch (ex) {
      LoggerService.error('WordsService -> saveWordProgress', ex);
    }
  }

  async getTotalWordsProgress() {
    try {
      const wordProgressJson = await this.storage.get('wordProgress');
      let score = 0;
      for (const [key, value] of Object.entries(wordProgressJson)) {
        score += value['score'];
      }
      return Math.round((score / this.getTotalWordScoreLimit()) * 100);
    } catch (ex) {
      LoggerService.error('WordsService -> getTotalWordsProgress', ex);
    }
  }

  getTotalWordScoreLimit() {
    return environment.wordScoreLimit * this.words.length;
  }

  getRandomIndexArray(size = this.words.length, from = 0, to = this.words.length - 1) {
    const array = [];
    for (let i = from; i <= to; ++i) { array.push(i); }

    return this.randomizeArray(array, size);
  }

  randomizeArray(array, size) {

    let tmp = array.length;
    let current = array.length;
    let top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }
    return array.slice(0, size);
  }

  getRandomIndexArrayForGames(from, size) {
    const articles = ['der', 'die', 'das'];
    const array = { der: [], die: [], das: [], all: [] };
    for (let x = from; array.all.length < size; x++) {
      if (!this.getWord(x)) { x = 0; }
      if (array[this.getWord(x).article].length < (size / articles.length)) {
        array[this.getWord(x).article].push(x);
        array.all.push(x);
        console.log(array);
      }
    }
    return array.all;
  }

}



export interface iWord {
  'article': string;
  'de': string;
  'dep': string;
  'en': string;
  'ar': string;
  'img': string;
  'level': number;
  'category': string;
  'ending'?: string;
}

export interface iLang {
  de?: string;
  en?: string;
}

export interface iWords extends Array<iWord> {
  [index: number]: iWord;
}

