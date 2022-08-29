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
    data: { breadcrumb: 'Главная' },
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
            data: { breadcrumb: (data: any) => `${data.productGroup.name}` },
            resolve: { productGroup: ProductGroupResolverService },
            children: [
              {
                path: '',
                component: CatalogPageComponent,
              },
              {
                path: 'product/:id',
                component: ProductPageComponent,
                data: { breadcrumb: (data: any) => `${data.product.name}` },
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
        data: { breadcrumb: 'Корзина' },
        component: CartPageComponent,
      },
      {
        path: 'verification',
        data: { breadcrumb: 'Оформление заказа' },
        component: VerificationPageComponent,
      },
      {
        path: 'contacts',
        data: { breadcrumb: 'Контакты' },
        component: ContactsPageComponent,
      },
      {
        path: 'additional-information',
        children: [
          {
            path: ':category',
            component: AdditionalInformationPageComponent,
            data: { breadcrumb: 'Дополнительная информация' },
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
