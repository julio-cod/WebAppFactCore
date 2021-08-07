import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ProductoService } from '../services/producto.service';
import { VentasService } from './../../app/services/ventas.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ConsultalistaproductosComponent } from '../producto/consultalistaproductos/consultalistaproductos.component';
import { DatatransitoService } from '../services/datatransito.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  title = 'FacturacionProducto';
  public respuesta:any = [];
  public form!: FormGroup;
  public loading: boolean = false;
  fechaActual?:Date;
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  
  
  displayedColumns: string[] = ['IdProducto', 'Descripcion', 'Cantidad', 'Precio','eliminar'];
  //DetalleVenta: Array<any> = [{IdVenta:0,IdProducto: 1,Descripcion: "laptop",Cantidad:10,Fecha:'2021-01-22',Precio:100,Ganancia:0}]; 

  DetalleVenta: any =[]; 

  @ViewChild(MatTable,{static:true}) table?: MatTable<any>;

  //campos ventas
  Fecha:any;
  Total =0;
  TotalGanancia= 50;

  //Campos detalle venta
  IdVenta= 0;
  IdProducto: any;
  Descripcion= '';
  Cantidad= 1;
  Precio: any;
  Ganancia= 0;

  //campos consulta producto
  Stock= '';
  Imagen= '';
  Costo= '';

  constructor(private RestService:VentasService,private RestProductService:ProductoService, private formBuilder: FormBuilder,public dialog: MatDialog,public datatransitoService:DatatransitoService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      txtFecha: [''],
      txtTotal: [''],
      txtIdProducto: ['',[Validators.required]],
      txtDescripcion: ['',[Validators.required]],
      txtCantidad: ['',[Validators.required, Validators.maxLength(8)]],
      txtPrecio: ['',[Validators.required]]
});
this.FechaActual();

  }

  public AgregarDetalleVenta(){
    this.DetalleVenta.push({IdVenta:this.IdVenta,IdProducto: this.IdProducto, Descripcion: this.Descripcion,Cantidad:this.Cantidad,Fecha:this.Fecha,Precio:this.Precio,Ganancia:this.Ganancia});
    this.CalculosSum();
    this.table?.renderRows();
    this.LimpiarCampos();
    
  }
/*
  public ActualizarArrayDetalleVenta(IdVenta: any){
    //alert(this.DetalleVenta.length);
    //alert(this.DetalleVenta[1].IdVenta);
    //console.log(this.DetalleVenta);

    for (let i = 0; i < this.DetalleVenta.length; i++) {
      //console.log ("Block statement execution no." + i);
      this.DetalleVenta[i].IdVenta = IdVenta;
    }

    //alert(this.DetalleVenta[0].IdVenta);
    //this.DetalleVenta[1].IdVenta = IdVenta;
    //this.table?.renderRows();
    this.GuardarDetalleVenta();
  }
*/
  public GuardarVenta(){
    
    try{
      if(this.DetalleVenta.length === 0){
        alert("No hay productos agregados");
      }
      else{
        this.loading = true;
        this.RestService.AgregarVenta('/api/ventas/agregarventa',
        {
          Fecha: ""+this.Fecha+"",
          Total: this.Total,
          TotalGanancia: this.TotalGanancia
          
        })
        .subscribe(respuesta => {
          this.loading = false;
          console.log('Respuesta del servidor', respuesta);
          this.respuesta = respuesta;
          console.log('this.respuesta.Success: ', this.respuesta.success);
    
          if(this.respuesta.success == 1){
            //this.ActualizarArrayDetalleVenta(this.respuesta.idVenta);
            this.GuardarDetalleVenta(this.respuesta.idVenta);
            
            //this.form.reset();
            console.log('Producto guardado!');
          }
          else{
            console.log('Error al guardar producto');
          }
          
        })
      }
      
    }
    catch(e){
      this.loading = false;
      console.log('Error ', e);
    }
    
  }

  public GuardarDetalleVenta(IdVenta: any){
  //alert(this.DetalleVenta[0].IdVenta);
  //alert(this.DetalleVenta);
   
    try{
      for (let i = 0; i < this.DetalleVenta.length; i++) {
        //console.log ("Block statement execution no." + i);
        this.DetalleVenta[i].IdVenta = IdVenta;
      }

      this.loading = true;
    this.RestService.AgregarDetalleVenta('/api/ventas/agregardetalleventa',this.DetalleVenta)
    .subscribe(respuesta => {
      this.loading = false;
      console.log('Respuesta del servidor', respuesta);
      this.respuesta = respuesta;
      console.log('this.respuesta.Success: ', this.respuesta.success);

      //this.Imagen = this.respuesta.message;
      if(this.respuesta.success == 1){
        this.LimpiarTodo();
        //this.form.reset();
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

  BuscarProductoId(id=this.IdProducto){
    this.RestProductService.get('/api/Productos/BuscarProductoId/'+id).subscribe(data => {
      this.IdProducto= (data as any).idProducto;
      this.Descripcion= (data as any).descripcion;
      //this.Categoria= (data as any).categoria;
      this.Stock= (data as any).stock;
      this.Costo= (data as any).costo;
      this.Precio= (data as any).precio;
      this.Imagen= (data as any).imagen;
      this.previsualizacion = this.Imagen;
    });
    
  }

  onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  public LimpiarTodo(){
    //this.form.reset();
    this.Total= 0;
    this.DetalleVenta= [];
    this.table?.renderRows();
    this.FechaActual();
    this.LimpiarCampos();

  }

  public LimpiarCampos(){
    this.IdProducto= "";
    this.Descripcion= "";
    this.Cantidad= 1;
    this.Precio= "";
    this.previsualizacion = "./assets/sin_imagen.jpg";

    this.datatransitoService.IdProducto = "";
    this.datatransitoService.Descripcion = "";
    this.datatransitoService.Precio = "";
    this.datatransitoService.Imagen = "";
    
  }
  
 
  

  public EliminarProducto(index:any,cant:any,prec:any){
   this.DetalleVenta.splice(index,1);
   this.CalculosRes(cant,prec);
  this.table?.renderRows();
  
}
  
  public FechaActual()
  {
    this.fechaActual=new Date();
    this.Fecha = this.fechaActual.getFullYear() +"-"+ this.fechaActual.getMonth() +"-"+ this.fechaActual.getDay();
  }
  public CalculosSum(){
    this.Total = this.Total + (this.Cantidad * this.Precio);
  }

  public CalculosRes(cant:any,prec:any){
    this.Total = this.Total - (cant * prec);
  }
  
  ConsultarProductos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(ConsultalistaproductosComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.IdProducto = this.datatransitoService.IdProducto;
      this.Descripcion = this.datatransitoService.Descripcion;
      this.Precio = this.datatransitoService.Precio;
      this.Imagen = this.datatransitoService.Imagen;
      this.previsualizacion = this.Imagen;
      //console.log('Dialog result: ${result}');
    });
    
  }

}
