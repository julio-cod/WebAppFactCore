import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-modificarproducto',
  templateUrl: './modificarproducto.component.html',
  styleUrls: ['./modificarproducto.component.css']
})
export class ModificarproductoComponent implements OnInit {
  title = 'modificarProducto';
  public form!: FormGroup;
  public respuesta:any = [];
  public archivos: any = [];
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  public loading: boolean = false;
  public ListaCategoria:any = [];
  
  @ViewChild('inputImagen') inputImagen?: ElementRef;

  IdProducto= '';
  Descripcion= '';
  Categoria= '';
  Stock= '';
  Costo= '';
  Precio= '';
  Imagen= '';
  //selectedOption = '';

  constructor(private route:ActivatedRoute, private RestService:ProductoService,private categoriaService:CategoriaService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paraMap:any) => {
      const {params} = paraMap
      this.cargarData(params.variable);
    })

        this.form = this.formBuilder.group({
          txtIdProducto: ['',[Validators.required, Validators.maxLength(100)]],
          txtDescripcion: ['',[Validators.required]],
          txtCategoria: ['',[Validators.required]],
          txtStock: ['',[Validators.required]],
          txtCosto: ['',[Validators.required]],
          txtPrecio: ['',[Validators.required]],
          txtImagen: ['']
        });

        this.CargaCategorias();
        //this.form.value.txtDescripcion = "this.Categoria test";
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
      //this.selectedOption = this.Categoria;
      
    });
    
  }



  public enviarData(){
    if(this.inputImagen!.nativeElement.value == ''){
      this.Imagen = "misma img";
    }
    this.RestService.put('/api/Productos/EditarProducto',
    {
      idProducto: this.IdProducto,
      descripcion: ""+this.Descripcion+"",
      categoria: ""+this.Categoria+"",
       stock: Number(this.Stock),
       costo: Number(this.Costo),
       precio: Number(this.Precio),
       imagen: ""+this.Imagen+""
      
    }).subscribe(respuesta => {
      this.loading = false;
      console.log('Respuesta del servidor', respuesta);
      this.respuesta = respuesta;
      console.log('this.respuesta.Success: ', this.respuesta.success);

      this.Imagen = this.respuesta.message;
      if(this.respuesta.success == 1){
        if(this.inputImagen!.nativeElement.value != ''){
          this.subirArchivo();
          
        }
        //this.cargarData(this.IdProducto);
        //this.form.reset();
        //this.previsualizacion = this.Imagen;
        this.inputImagen!.nativeElement.value = '';
        console.log('Producto modificado!');
      }
      else{
        console.log('Error al modificar producto');
      }
    })
  }

  capturarFile(event: any): any{
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      //console.log(imagen);
      this.Imagen = archivoCapturado.name;
    })
    this.archivos.push(archivoCapturado)
    //alert(event.target.files);
    //console.log("event.target.files")
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      //return null;
      resolve({
        base: null
      });
    }
  })

  clearImage(): any {
    this.previsualizacion = "./assets/sin_imagen.jpg";
    this.inputImagen!.nativeElement.value = '';
    this.archivos = [];
  }

  subirArchivo(): any {
    try {
      //var archivo = "";
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        formularioDeDatos.append('files', archivo, this.Imagen)
        //console.log("este es el formularioDeDatos: "+formularioDeDatos);
      })
      // formularioDeDatos.append('_id', 'MY_ID_123')
      
      this.RestService.postFile('/api/Productos/SubirArchivo', formularioDeDatos)
        .subscribe(respuesta => {
          this.loading = false;
          console.log('Respuesta del servidor', respuesta);
          this.respuesta = respuesta;
          console.log('this.respuesta.message: ', this.respuesta.message);

        }/*, () => {
          this.loading = false;
          alert('Error');
        }*/)
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }

  public CargaCategorias(){
    this.categoriaService.ListadoCategorias('/api/categorias/listadocategorias')
    .subscribe(respuesta => {
      this.ListaCategoria = respuesta
    })

  }

  onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}


}
