import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { INTERCEPTOR_PROVIDER } from './interceptors';
import { ProductsService } from './services/products.service';
import { ConfirmModalTemplateComponent } from './components/confirm-modal-template/confirm-modal-template.component';
import { HelperService } from './services/helper.service';
import { ManufacturersService } from './services/manufacturers.service';
import { ColorsService } from './services/colors.service';
import { IsExistNotEmptyValuePipe } from './pipes/is-exist-not-empty-value.pipe';
import { StocksService } from './services/stocks.service';
import { ValidatorService } from './services/validator.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [ConfirmModalTemplateComponent, IsExistNotEmptyValuePipe, ImgUrlPipe],
  imports: [CommonModule, HttpClientModule, MaterialModule],

  providers: [
    INTERCEPTOR_PROVIDER,
    HttpService,
    AuthService,
    ProductsService,
    HelperService,
    ManufacturersService,
    ColorsService,
    StocksService,
    ValidatorService,
    UserService,
    CartService,
    DialogService,
  ],
  exports: [IsExistNotEmptyValuePipe, ImgUrlPipe],
})
export class SharedModule {}
