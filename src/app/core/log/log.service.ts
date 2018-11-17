import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

enum LogLevels {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  private logLevelOfSetting = LogLevels[environment.logLevel];

  private log(logObject: string, logLevel: LogLevels): void {

    if (!window.console || !window.console.log) {
      return;
    }

    if (logLevel !== undefined &&  logLevel < this.logLevelOfSetting) {
      return;
    }

    console.log(logObject);
  }

  debug(logObject?: any): void {
    this.log(logObject, LogLevels.DEBUG);
  }

  info(logObject?: any): void {
    this.log(logObject, LogLevels.INFO);
  }

  warn(logObject?: any): void {
    this.log(logObject, LogLevels.WARN);
  }

  error(logObject?: any): void {
    this.log(logObject, LogLevels.ERROR);
  }

  fatal(logObject?: any): void {
    this.log(logObject, LogLevels.FATAL);
  }

}


