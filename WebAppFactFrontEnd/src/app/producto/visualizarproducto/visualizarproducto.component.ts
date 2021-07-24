import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-visualizarproducto',
  templateUrl: './visualizarproducto.component.html',
  styleUrls: ['./visualizarproducto.component.css']
})
export class VisualizarproductoComponent implements OnInit {

  title = 'visualizarProducto';
  public form!: FormGroup;

  IdProducto= '';
  Descripcion= '';
  Categoria= '';
  Stock= '';
  Costo= '';
  Precio= '';
  Imagen= '';

  constructor(private route:ActivatedRoute, private RestService:ProductoService, private formBuilder: FormBuilder) { }

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
    });
    
  }

}
