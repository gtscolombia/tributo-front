import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TributoSearchPipe', pure: false })
export class TributoSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(tributo => {
        if (tributo.identtributo.idtributo.nombre || tributo.identtributo.identidad.nombre) {
          return tributo.identtributo.idtributo.nombre.search(searchText) !== -1 || tributo.identtributo.identidad.nombre.search(searchText) !== -1;
        }
        else{
          return tributo.identtributo.idtributo.nombre.search(searchText) !== -1 || tributo.identtributo.identidad.nombre.search(searchText) !== -1;
        }
      });
    }
  }
}