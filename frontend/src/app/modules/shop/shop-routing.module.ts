import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShopLayoutComponent } from './components/shop-layout/shop-layout.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { CatalogPageComponent } from './components/pages/catalog-page/catalog-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { ProductGroupResolverService } from './services/product-group-resolver.service';
import { ProductResolverService } from './services/product-resolver.service';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { VerificationPageComponent } from './components/pages/verification-page/verification-page.component';
import { ContactsPageComponent } from './components/pages/contacts-page/contacts-page.component';
import { AdditionalInformationPageComponent } from './components/pages/additional-information-page/additional-information-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    data: { breadcrumb: { uk_UA: 'Головна', ru: 'Главная' } },
    children: [
      {
        path: '',
        component: MainPageComponent,
      },
      {
        path: 'catalog',
        children: [
          {
            path: ':product-group',
            data: {
              breadcrumb: (data: any) => ({
                ru: `${data.productGroup.name}`,
                uk_UA: `${data.productGroup.nameUa}`,
              }),
            },
            resolve: { productGroup: ProductGroupResolverService },
            children: [
              {
                path: '',
                component: CatalogPageComponent,
              },
              {
                path: 'product/:id',
                component: ProductPageComponent,
                resolve: { product: ProductResolverService },
              },
            ],
          },
          {
            path: 'search/:searchText',
            children: [
              {
                path: '',
                component: CatalogPageComponent,
              },
              {
                path: 'product/:id',
                component: ProductPageComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'cart',
        data: { breadcrumb: { uk_UA: 'Кошик', ru: 'Корзина' } },
        component: CartPageComponent,
      },
      {
        path: 'verification',
        data: { breadcrumb: { uk_UA: 'Оформлення замовлення', ru: 'Оформление заказа' } },
        component: VerificationPageComponent,
      },
      {
        path: 'contacts',
        data: { breadcrumb: { uk_UA: 'Контакти', ru: 'Контакты' } },
        component: ContactsPageComponent,
      },
      {
        path: 'additional-information',
        children: [
          {
            path: ':category',
            component: AdditionalInformationPageComponent,
            data: {
              breadcrumb: { uk_UA: 'Додаткова інформація', ru: 'Дополнительная информация' },
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
