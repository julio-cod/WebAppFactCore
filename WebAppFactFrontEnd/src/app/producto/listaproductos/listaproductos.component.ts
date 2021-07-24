import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements OnInit {

  displayedColumns: string[] = ['idProducto', 'descripcion', 'categoria', 'imagen', 'ver', 'modificar', 'eliminar'];
  public dataSource:any = [];

  constructor(private RestService:ProductoService) { }

  ngOnInit(): void {
    this.cargaData();
  }

  public cargaData(){
    this.RestService.get('/api/productos/listadoproductos')
    .subscribe(respuesta => {
      this.dataSource = respuesta
    })

  }

}
