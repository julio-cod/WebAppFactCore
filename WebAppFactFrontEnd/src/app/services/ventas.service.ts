import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookieService.get('token_access') });

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public AgregarVenta(url:string, body: 
    { 
      Fecha: any,
      Total: any,
      TotalGanancia: any
    })
    {
       return this.http.post(url,body,{ headers: this.headers });
    }
  //Array<any>
  public AgregarDetalleVenta(url:string, body:any = [])
    {
      //alert(JSON.stringify(body));
       return this.http.post(url,body,{ headers: this.headers });
    }
    public XAgregarDetalleVenta(url:string, body: 
      { 
        IdVenta: any,
        IdProducto: any, 
        Descripcion: any,
        Cantidad: any,
        Fecha: any,
        Precio: any,
        Ganancia: any
      })
      {
         return this.http.post(url,body,{ headers: this.headers });
      }

}
