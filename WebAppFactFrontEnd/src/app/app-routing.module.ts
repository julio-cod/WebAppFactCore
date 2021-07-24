import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EliminarproductoComponent } from './producto/eliminarproducto/eliminarproducto.component';
import { ListaproductosComponent } from './producto/listaproductos/listaproductos.component';
import { ModificarproductoComponent } from './producto/modificarproducto/modificarproducto.component';
import { RegistrarproductoComponent } from './producto/registrarproducto/registrarproducto.component';
import { VisualizarproductoComponent } from './producto/visualizarproducto/visualizarproducto.component';
import { FacturacionComponent } from './facturacion/facturacion.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'listaproductos',
    component:ListaproductosComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path:'registroproducto',
    component:RegistrarproductoComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path:'modificarproducto/:variable',
    component:ModificarproductoComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path:'eliminarproducto/:variable',
    component:EliminarproductoComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path:'visualizarproducto/:variable',
    component:VisualizarproductoComponent,
    //canActivate:[VigilanteGuard]
  },
  {
    path:'facturacion',
    component:FacturacionComponent,
    //canActivate:[VigilanteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
