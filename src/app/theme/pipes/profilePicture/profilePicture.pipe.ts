import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'profilePicture'})
export class ProfilePicturePipe implements PipeTransform {
  transform(input:string, ext = 'jpg'):string {
    return 'https://i.stack.imgur.com/34AD2' + input + '.' + ext;
  }
}
