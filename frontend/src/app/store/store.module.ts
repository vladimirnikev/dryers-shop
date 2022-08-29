import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '../shared/shared.module';
import { ProductsEffects } from './products/products.effects';
import { productReducer } from './products/products.reducer';
import { manufacturerReducer } from './manufacturers/manufacturers.reducer';
import { ManufacturersEffects } from './manufacturers/manufacturers.effects';
import { ColorsEffects } from './colors/colors.effects';
import { colorReducer } from './colors/colors.reducer';
import { userReducer } from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { stockReducer } from './stocks/stocks.reducer';
import { StocksEffects } from './stocks/stocks.effects';
import { cartReducer } from './cart/cart.reducer';
import { CartEffects } from './cart/cart.effects';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forRoot({
      product: productReducer,
      manufacturer: manufacturerReducer,
      color: colorReducer,
      user: userReducer,
      stock: stockReducer,
      cart: cartReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      ProductsEffects,
      ManufacturersEffects,
      ColorsEffects,
      UsersEffects,
      StocksEffects,
      CartEffects,
    ]),
  ],
})
export class CoreStoreModule {}
