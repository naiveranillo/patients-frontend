import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor(private datePipe: DatePipe) { }

  format(date: Date | string | null, format: string = 'yyyy-MM-dd'): string | null {
    return this.datePipe.transform(date, format);
  }
}
