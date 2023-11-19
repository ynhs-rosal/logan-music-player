import { Pipe, PipeTransform } from '@angular/core';
import { intervalToDuration } from 'date-fns';

@Pipe({ name: 'formatMs' })
export class FormatMilisecondsPipe implements PipeTransform {
  transform(value: number): string {
    const duration = intervalToDuration({ start: 0, end: value });
    return `${duration.minutes}:${String(duration.seconds).padStart(2, '0')}`;
  }
}
