import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat',
  standalone: true,
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: any): string {
    // Check if the value is not empty and its length is equal to 16 (credit card number length)
    if (value && value.length === 16) {
      // Split the string into groups of four digits
      const formattedValue = value.match(/.{1,4}/g).join(' - ');
      return formattedValue;
    } else {
      // If the value is empty or not valid, return it as is
      return value;
    }
  }
}
