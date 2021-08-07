import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatatransitoService } from 'src/app/services/datatransito.service';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-consultalistaproductos',
  templateUrl: './consultalistaproductos.component.html',
  styleUrls: ['./consultalistaproductos.component.css']
})
export class ConsultalistaproductosComponent implements OnInit {

  displayedColumns: string[] = ['idProducto', 'descripcion', 'categoria', 'precio','imagen'];
  public dataSource:any = [];

  constructor(private RestService:ProductoService,public datatransitoService:DatatransitoService,public dialogRef: MatDialogRef<ConsultalistaproductosComponent>) { }

  ngOnInit(): void {
    this.cargaData();
  }

  public cargaData(){
    this.RestService.get('/api/productos/listadoproductos')
    .subscribe(respuesta => {
      this.dataSource = respuesta
    })

  }

  public EnviarData(idProducto?:any,descripcion?:any,precio?:any,imagen?:any){
   //alert("idProducto: " + idProducto + " descripcion: "+descripcion+" precio: "+precio)

   this.datatransitoService.IdProducto =idProducto;
   this.datatransitoService.Descripcion =descripcion;
   this.datatransitoService.Precio =precio;
   this.datatransitoService.Imagen =imagen;
   this.dialogRef.close();

  }

}
