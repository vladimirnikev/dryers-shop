import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INTERCEPTOR_PROVIDER } from './interceptors';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],

  providers: [
    INTERCEPTOR_PROVIDER,
    HttpService,
    AuthService,
    ProductsService
    ]
})
export class SharedModule { }
