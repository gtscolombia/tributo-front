import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedataService {

  constructor() { }



  setUsuario(usuario : any): void{
    localStorage.setItem('usuario',usuario);
  }



  setEmail(email: any): void {
    localStorage.setItem('current_user', email);
 }


  isLogged() {
    return localStorage.getItem('current_user') != null;
  }


}
