import { Injectable, ViewChild } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  static log(message: any, details: any){
      console.log(message, details);
  }

  static info(message: any, details: any){
      console.info(message, details);
  }

  static debug(message: any, details: any){
      console.debug(message, details);
  }

  static trace(message: any, details: any){
      console.trace(message, details);
  }

  static warn(message: any, details: any){
      console.warn(message, details);
  }

  static error(message: any, details: any){
      console.error(message, details);
  }

  static fatal(message: any, details: any){
      console.exception(message, details);
  }

}
