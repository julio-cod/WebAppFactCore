import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-eliminarproducto',
  templateUrl: './eliminarproducto.component.html',
  styleUrls: ['./eliminarproducto.component.css']
})
export class EliminarproductoComponent implements OnInit {
  title = 'eliminarProducto';
  public form!: FormGroup;
  public previsualizacion: string = "./assets/sin_imagen.jpg";

  IdProducto= '';
  Descripcion= '';
  Categoria= '';
  Stock= '';
  Costo= '';
  Precio= '';
  Imagen= '';

  constructor(private route:ActivatedRoute,private router: Router, private RestService:ProductoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paraMap:any) => {
      const {params} = paraMap
      this.cargarData(params.variable);
    })

        this.form = this.formBuilder.group({
          txtIdProducto: [''],
          txtDescripcion: [''],
          txtCategoria: [''],
          txtStock: [''],
          txtCosto: [''],
          txtPrecio: [''],
          txtImagen: ['']
        });
  }

  cargarData(id:string){
    this.RestService.get('/api/Productos/BuscarProductoId/'+id).subscribe(data => {
      this.IdProducto= (data as any).idProducto;
      this.Descripcion= (data as any).descripcion;
      this.Categoria= (data as any).categoria;
      this.Stock= (data as any).stock;
      this.Costo= (data as any).costo;
      this.Precio= (data as any).precio;
      this.Imagen= (data as any).imagen;
      this.previsualizacion = this.Imagen;
    });
    
  }

  public enviarData(){
    this.RestService.delete('/api/Productos/EliminarProducto/'+this.IdProducto).subscribe(respuesta => {
      this.router.navigate(['/listaproductos'])
      //this.form.reset();
      //this.cargarComentarios();
    })
  }

}
