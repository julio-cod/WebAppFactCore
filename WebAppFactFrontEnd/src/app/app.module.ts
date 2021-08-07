import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaproductosComponent } from './producto/listaproductos/listaproductos.component';
import { EliminarproductoComponent } from './producto/eliminarproducto/eliminarproducto.component';
import { ModificarproductoComponent } from './producto/modificarproducto/modificarproducto.component';
import { RegistrarproductoComponent } from './producto/registrarproducto/registrarproducto.component';
import { VisualizarproductoComponent } from './producto/visualizarproducto/visualizarproducto.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { ConsultalistaproductosComponent } from './producto/consultalistaproductos/consultalistaproductos.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    LayoutComponent,
    ListaproductosComponent,
    EliminarproductoComponent,
    ModificarproductoComponent,
    RegistrarproductoComponent,
    VisualizarproductoComponent,
    FacturacionComponent,
    ConsultalistaproductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          minlength: ({ requiredLength, actualLength }) => 
                      `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`,
          maxlength: 'Excede la cantida maxima permitida'
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
