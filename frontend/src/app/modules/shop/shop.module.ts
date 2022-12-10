import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import localeUa from '@angular/common/locales/ru-UA';
import { CookieService } from 'ngx-cookie-service';
import { TranslocoModule } from '@ngneat/transloco';
import { ShopLayoutComponent } from './components/shop-layout/shop-layout.component';
import { ShopRoutingModule } from './shop-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SubNavigationComponent } from './components/sub-navigation/sub-navigation.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { MainSwiperComponent } from './components/pages/main-page/main-swiper/main-swiper.component';
import { SwiperSlideComponent } from './components/pages/main-page/swiper-slide/swiper-slide.component';
import { BasicButtonComponent } from './components/basic-button/basic-button.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { BasketBarCardComponent } from './components/basket-bar-card/basket-bar-card.component';
import { SaleListComponent } from './components/pages/main-page/sale-list/sale-list.component';
import { TimerComponent } from './components/timer/timer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallButtonComponent } from './components/call-button/call-button.component';
import { CatalogPageComponent } from './components/pages/catalog-page/catalog-page.component';
import { CatalogCardComponent } from './components/pages/catalog-page/catalog-card/catalog-card.component';
import { SortingBarComponent } from './components/pages/catalog-page/sorting-bar/sorting-bar.component';
import { FilteringBarComponent } from './components/pages/catalog-page/filtering-bar/filtering-bar.component';
import { PriceFilterComponent } from './components/pages/catalog-page/price-filter/price-filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InstagramFeedComponent } from './components/instagram-feed/instagram-feed.component';
import { ViewedProductsListComponent } from './components/viewed-products-list/viewed-products-list.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { BreadcrumbsService } from './services/breadcrumbs.service';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ProductGroupResolverService } from './services/product-group-resolver.service';
import { ProductResolverService } from './services/product-resolver.service';
import { FaqComponent } from './components/faq/faq.component';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CartItemComponent } from './components/pages/cart-page/cart-item/cart-item.component';
import { VerificationPageComponent } from './components/pages/verification-page/verification-page.component';
import { OrderFormComponent } from './components/pages/verification-page/order-form/order-form.component';
import { FormCardComponent } from './components/pages/verification-page/form-card/form-card.component';
import { InputComponent } from './components/input/input.component';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { PaymentSelectorComponent } from './components/pages/verification-page/payment-selector/payment-selector.component';
import { DeliverySelectorComponent } from './components/pages/verification-page/delivery-selector/delivery-selector.component';
import { OrderItemsListComponent } from './components/pages/verification-page/order-items-list/order-items-list.component';
import { OrderConfirmCardComponent } from './components/pages/verification-page/order-confirm-card/order-confirm-card.component';
import { ContactsPageComponent } from './components/pages/contacts-page/contacts-page.component';
import { AdditionalInformationPageComponent } from './components/pages/additional-information-page/additional-information-page.component';
import { PaginationService } from './services/pagination.service';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { MainResolverService } from './services/main-resolver.service';
import { MobileService } from './services/mobile.service';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { StockNameResolverService } from './services/stock-name-resolver.service';

registerLocaleData(localeUa, 'ua');

@NgModule({
  declarations: [
    ShopLayoutComponent,
    HeaderComponent,
    SubNavigationComponent,
    MainPageComponent,
    MainSwiperComponent,
    SwiperSlideComponent,
    BasicButtonComponent,
    SearchInputComponent,
    BasketBarCardComponent,
    SaleListComponent,
    TimerComponent,
    ProductCardComponent,
    FooterComponent,
    CallButtonComponent,
    CatalogPageComponent,
    CatalogCardComponent,
    SortingBarComponent,
    FilteringBarComponent,
    PriceFilterComponent,
    PaginationComponent,
    InstagramFeedComponent,
    ViewedProductsListComponent,
    ProductPageComponent,
    BreadcrumbsComponent,
    FaqComponent,
    ModalComponent,
    CartPageComponent,
    CartItemComponent,
    VerificationPageComponent,
    OrderFormComponent,
    FormCardComponent,
    InputComponent,
    InputErrorComponent,
    CheckboxComponent,
    PaymentSelectorComponent,
    DeliverySelectorComponent,
    OrderItemsListComponent,
    OrderConfirmCardComponent,
    ContactsPageComponent,
    AdditionalInformationPageComponent,
    LoaderComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopRoutingModule,
    SwiperModule,
    NgxSliderModule,
    AngularSvgIconModule.forRoot(),
    SharedModule,
    MaterialModule,
    TranslocoModule,
  ],
  providers: [
    BreadcrumbsService,
    ProductGroupResolverService,
    ProductResolverService,
    StockNameResolverService,
    ModalService,
    PaginationService,
    CookieService,
    MainResolverService,
    MobileService,
  ],
})
export class ShopModule { }
