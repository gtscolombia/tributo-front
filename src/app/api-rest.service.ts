import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
}) 
export class ApiRestService {

 //public url = 'http://impuestos.local/api/v1/';
 public url = 'http://localhost:8090/rest/';
 private token = '';

 constructor(private http: HttpClient)
 {
     this.token = sessionStorage.getItem('token');
 }

 
  get(ruta:string){
    return this.http.get<any>(this.url.concat(ruta));
  }


 post(ruta: string, body: any)
 {
     
     let httpOptions =
     {
         headers: new HttpHeaders().set('Content-Type', 'application/json')
     };

     let repos = this.http.post<any>(this.url.concat(ruta), body, httpOptions);
     return repos;
 }

 delete(ruta: string)
 {
     this.token = sessionStorage.getItem('token');
     let httpOptions =
     {
         //params: new HttpParams().set('ids', ids),
         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token })
     };

     let repos = this.http.delete<any>(this.url.concat(ruta), httpOptions);
     return repos;
 }
}
