import { MaterialModule } from './../modules/material/material.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INTERCEPTOR_PROVIDER } from './interceptors';
import { ProductsService } from './services/products.service';
import { ConfirmModalTemplateComponent } from './components/confirm-modal-template/confirm-modal-template.component';

@NgModule({
  declarations: [
    ConfirmModalTemplateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],

  providers: [
    INTERCEPTOR_PROVIDER,
    HttpService,
    AuthService,
    ProductsService
  ]
})
export class SharedModule { }
