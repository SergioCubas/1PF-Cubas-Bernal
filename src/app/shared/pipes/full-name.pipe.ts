import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(name:string, last_name:string): any {
    return name + ' ' +last_name;
  }

}
