import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookieService.get('token_access') });
        
  constructor(private http: HttpClient, private cookieService: CookieService) {
    
  }

  public ListadoCategorias(url:string){
    return this.http.get(url, { headers: this.headers } );
  }
  
}
