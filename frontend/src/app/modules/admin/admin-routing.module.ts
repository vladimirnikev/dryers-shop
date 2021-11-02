import { CreateItemPageComponent } from './components/create-item-page/create-item-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent }, // if (token) navigate(['items'])
      { path: 'items', component: ItemsPageComponent, canActivate: [AdminGuard] },
      { path: 'create', component: CreateItemPageComponent, canActivate: [AdminGuard] }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
