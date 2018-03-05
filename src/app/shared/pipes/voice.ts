import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'voice'})
export class VoicePipe implements PipeTransform {
  transform(value) {

    let callDuration = value/1000000000;
    let callDurationText = '';

    let hour = 0, min = 0, sec = 0;

    if (callDuration < 60) {
      sec = callDuration;
    } else if (callDuration < 3600) {
      min = callDuration / 60;
      sec = callDuration % 60;
    } else {
      hour = callDuration / 3600;
      min = callDuration % 3600;
      if (min % 60 !== 0) {
        sec = min % 60;
        min = min / 60;
      } else {
        min = min / 60;
      }
    }

    if (hour > 0) {
      callDurationText += hour.toString().match(/\d*/)[0] + 'h';
    }
    if (min > 0) {
      callDurationText += min.toString().match(/\d*/)[0] + 'm';
    }
    if (sec > 0) {
      callDurationText += sec + 's';
    }

    return callDurationText;

  }
}
