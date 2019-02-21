import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private endPoint : string

  constructor(private http: HttpClient, ) { 
    this.endPoint = 'http://localhost:8090';
  }

   get_usuario_email(email:string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.endPoint}/rest/frusuarios/email/${email}`);
  }


}
