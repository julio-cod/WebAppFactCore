import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from './../../services/producto.service';

@Component({
  selector: 'app-registrarproducto',
  templateUrl: './registrarproducto.component.html',
  styleUrls: ['./registrarproducto.component.css']
})
export class RegistrarproductoComponent implements OnInit {
  title = 'registrarProducto';
  public respuesta:any = [];
  public form!: FormGroup;
  public archivos: any = [];
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  public loading: boolean = false;

  @ViewChild('inputImagen') inputImagen?: ElementRef;

  Descripcion= '';
  Categoria= '';
  Stock= '';
  Costo= '';
  Precio= '';
  Imagen= '';
  selected="";
  selectedOption = '';

  public ListaCategoria:any = [];

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  constructor(private RestService:ProductoService,private categoriaService:CategoriaService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
          txtDescripcion: [''],
          txtCategoria: [''],
          txtStock: [''],
          txtCosto: [''],
          txtPrecio: [''],
          txtImagen: ['']
    });
    this.CargaCategorias();
    //this.form.value.txtDescripcion = "this.Categoria test";
    
    
  }

  public AgregarProducto(){
    
    try{
      //this.Categoria = this.form.value.txtCategoria;
      this.loading = true;
    this.RestService.post('/api/Productos/AgregarProducto',
    {
      descripcion: ""+this.Descripcion+"",
      categoria: ""+this.Categoria+"",
       stock: Number(this.Stock),
       costo: Number(this.Costo),
       precio: Number(this.Precio),
       imagen: ""+this.Imagen+""
      
    })
    .subscribe(respuesta => {
      this.loading = false;
      console.log('Respuesta del servidor', respuesta);
      this.respuesta = respuesta;
      console.log('this.respuesta.Success: ', this.respuesta.success);

      this.Imagen = this.respuesta.message;
      if(this.respuesta.success == 1){
        this.subirArchivo();
        this.form.reset();
        this.previsualizacion = "./assets/sin_imagen.jpg";
        this.inputImagen!.nativeElement.value = '';
        console.log('Producto guardado!');
      }
      else{
        console.log('Error al guardar producto');
      }
      
    })
    }
    catch(e){
      this.loading = false;
      console.log('Error ', e);
    } 
    
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
  

}


interface Food {
  value: string;
  viewValue: string;
}
