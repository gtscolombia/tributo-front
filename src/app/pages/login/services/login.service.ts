import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuarios';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private endPoint : string;

  constructor(
    public http: HttpClient
  ) {
    this.endPoint = 'http://localhost:8090';

   }

   get_usuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.endPoint}/rest/frusuarios/list`);
    
}

  get_usuario_email(email:string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.endPoint}/rest/frusuarios/email/${email}`);
  }

  add_usuario(usuario: Usuario): Observable<any>{
		let json = JSON.stringify(usuario);
                
		let params = json;
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this.http.post(this.endPoint+'/rest/frusuarios/save', params, {headers: headers});
	}



  


}
