import { CreateItemPageComponent } from './components/create-item-page/create-item-page.component';
import { MaterialModule } from './../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MatCommonModule} from "@angular/material/core";
// import {MatButtonModule} from "@angular/material/button";
// import {MatDialogModule} from "@angular/material/dialog";
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent }, // if (token) navigate(['items'])
      { path: 'items', component: ItemsPageComponent, canActivate: [AdminGuard] },
      { path: 'create', component: CreateItemPageComponent, canActivate: [AdminGuard]}
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ItemsPageComponent,
    CreateItemPageComponent
  ],
  imports: [
    CommonModule,
    // MatCommonModule,
    // MatButtonModule,
    // MatDialogModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
