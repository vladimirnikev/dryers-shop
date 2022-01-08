import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from './products/products.effects';
import { productReducer } from './products/products.reducer';
import { manufacturerReducer } from './manufacturers/manufacturers.reducer';
import { ManufacturersEffects } from './manufacturers/manufacturers.effects';
import { ColorsEffects } from './colors/colors.effects';
import { colorReducer } from './colors/colors.reducer';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot({
      product: productReducer,
      manufacturer: manufacturerReducer,
      color: colorReducer
    }),
    EffectsModule.forRoot([
      ProductsEffects, ManufacturersEffects, ColorsEffects
    ])
  ]
})
export class CoreStoreModule { }
