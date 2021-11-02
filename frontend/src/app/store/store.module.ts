import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ProductsEffects } from './products/products.effects';
import { productReducer } from './products/products.reducer';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot({
      product: productReducer
    }),
    EffectsModule.forRoot([
      ProductsEffects
    ]),
    // environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class CoreStoreModule { }
