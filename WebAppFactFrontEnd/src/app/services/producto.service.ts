import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookieService.get('token_access') });
        
  constructor(private http: HttpClient, private cookieService: CookieService) {
    
  }

  public get(url:string){
    return this.http.get(url, { headers: this.headers } );
  }

  public post(url:string, body: 
 { 
   descripcion: any,
  categoria: any,
  stock: any,
  costo: any,
  precio: any,
  imagen: any}){
    return this.http.post(url,body,{ headers: this.headers });
  }

  public put(url:string, body: 
  { 
     idProducto: any,
     descripcion: any,
     categoria: any,
     stock: any,
     costo: any,
     precio: any,
     imagen: any}){
       return this.http.put(url,body, { headers: this.headers });
     }

  public delete(url:string )
  {
    return this.http.delete(url, { headers: this.headers });
  }


  public postFile(url:string, body: any){
    return this.http.post(url,body); 
  }
}
