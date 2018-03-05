import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'data'})
export class DataPipe implements PipeTransform {
  transform(value) {
    // dataVolume is in octets
    // 1073741824 = 1G
    let dataVolume = value;
    let dataVolumeText = '';
    let gb = 0, mb = 0, kb = 0;

    // split by kB ,
    if (dataVolume < 1048576) {
      kb = dataVolume / 1024;

    } else if (dataVolume < 1073741824) {
      mb = (dataVolume / 1048576);
      kb = ((dataVolume % 1048576) / 1024);
    } else {
      gb = (dataVolume / 1073741824);
      mb = (dataVolume % 1073741824);
      if (mb % 1049000 !== 0) {
        kb = ((mb % 1048576) / 1024);
        mb = (mb / 1048576);
      } else {
        mb = (mb / 1048576);
      }
    }

    if (gb > 0) {
      dataVolumeText += gb.toFixed(0) + 'GB ';
    }
    if (mb > 0) {
      dataVolumeText += mb.toFixed(0) + 'MB ';
    }
    if (kb > 0) {
      dataVolumeText += kb.toFixed(0) + 'KB ';
    }

    return dataVolumeText;
  }
}
/*
 export class DataPipe implements PipeTransform {
  transform(value) {
    let si = false;
    let bytes = value;
    let unit = si ? 1000 : 1024;
    if (bytes < unit) {
      return bytes + ' B';
    }
    let exp = Math.log(bytes) / Math.log(unit);
    let pre = (si ? 'kMGTPE' : 'KMGTPE').charAt(exp - 1) + (si ? '' : 'i');
    let res = bytes / Math.pow(unit, exp);
    return res.toFixed(2) + pre;
  }
} 
 
public static String humanReadableByteCount(long bytes, boolean si) {
    int unit = si ? 1000 : 1024;
    if (bytes < unit) return bytes + " B";
    int exp = (int) (Math.log(bytes) / Math.log(unit));
    String pre = (si ? "kMGTPE" : "KMGTPE").charAt(exp-1) + (si ? "" : "i");
    return String.format("%.1f %sB", bytes / Math.pow(unit, exp), pre);
}
*/
