import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TributoByUsuTributoSearchPipe', pure: false })
export class TributoByUsuTributoSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(tributo => {
        if (tributo.idtributo.nombre) {
          return tributo.idtributo.nombre.search(searchText) !== -1;
        }
        else{
          return tributo.idtributo.nombre.search(searchText) !== -1;
        }
      });
    }
  }
}