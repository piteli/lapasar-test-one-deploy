import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToPrice'
})
export class ConvertToPricePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const string_num = (value).toString();
    const digit_back = string_num.substring(string_num.length - 2);
    const digit_front = string_num.substring(0, string_num.length - 2);
    const full_converted = digit_front + '.' + digit_back;
    return full_converted;
  }

}
