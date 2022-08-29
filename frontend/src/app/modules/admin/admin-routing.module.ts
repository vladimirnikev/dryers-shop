import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { CreateStockModalComponent } from './components/create-stock-modal/create-stock-modal.component';
import { UpdateStockPageComponent } from './components/update-stock-page/update-stock-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'items', component: ItemsPageComponent, canActivate: [AdminGuard] },
      {
        path: 'stock',
        children: [
          { path: 'create', component: CreateStockModalComponent, canActivate: [AdminGuard] },
          { path: 'update/:id', component: UpdateStockPageComponent, canActivate: [AdminGuard] },
          // { path: 'list', component: StockListModalComponent, canActivate: [AdminGuard] }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
