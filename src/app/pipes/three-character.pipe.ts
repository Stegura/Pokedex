import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'threeCharacter'
})
export class ThreeCharacterPipe implements PipeTransform {

  transform(value: Number): any {
    if (value < 10) {
      return `00${value}`
    } else if (value <100) {
      return `0${value}`
    } else {
      return value;
    }    
  }

}
