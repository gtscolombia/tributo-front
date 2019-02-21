import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'EntidadSearch'
})

export class MailSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(entidad => {
        if(entidad.nombre || entidad.direccion){
          if(entidad.nombre.search(searchText) !== -1 || entidad.direccion.search(searchText) !== -1){
            return true;
          }
        }
      });
    }
  }
}
