
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * Will display the message below when referencing a key not found in the language culture file. 
 * Seems like this does not work when using the pipe.
 */
export class TranslationFallbackHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return `${params.key} NOT FOUND`;
  }
}