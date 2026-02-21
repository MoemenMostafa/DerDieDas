import { Pipe, PipeTransform } from '@angular/core';
import { iWord } from 'app/providers/words/words.service';

@Pipe({
  name: 'ending'
})
export class EndingPipe implements PipeTransform {

  transform(word: string, ending: string): unknown {
    if (ending){
      const replacedWord = word.replace(new RegExp(ending + '$'), '');
      return replacedWord;
    }
    return word;
  }

}
