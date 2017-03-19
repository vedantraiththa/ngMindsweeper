import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toDigitalClockTime'})
export class ToDigitalClockTimePipe implements PipeTransform{
  transform(val: number) {
      if (val === null) {
          return "--:--";
      }
      
      let seconds = val % 60;
      let minutes = Math.floor(val / 60);
      return minutes.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false}) + ":" 
                + seconds.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false});
  } 
}