import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuarios';
import { Municipio } from '../../../models/municipio';
@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private endPoint: string

  constructor(private http: HttpClient, ) {
    this.endPoint = 'http://localhost:8090';
  }

  get_usuario_email(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.endPoint}/rest/frusuarios/email/${email}`);
  }

  actualizar_usuario(usuario: Usuario): Observable<Usuario> {
    let json = JSON.stringify(usuario);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<Usuario>(this.endPoint + '/rest/frusuarios/' + usuario.id, params, { headers: headers });
  }

  get_municipio(): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.endPoint}/rest/municipios/list`);
  }





}
