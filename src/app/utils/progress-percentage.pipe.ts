import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration } from 'date-fns';

@Pipe({ name: 'progressPercentage' })
export class ProgressPercentagePipe implements PipeTransform {
  transform(progress: number, duration: number): number {
    const percentage = Math.round((progress / duration) * 100);
    return percentage;
  }
}
