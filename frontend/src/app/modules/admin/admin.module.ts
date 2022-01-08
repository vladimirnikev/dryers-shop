import { CreateItemPageComponent } from './components/create-item-page/create-item-page.component';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateItemModalComponent } from './components/update-item-modal/update-item-modal.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateManufacturerModalComponent } from './components/create-manufacturer-modal/create-manufacturer-modal.component';
import { ManufacturersListModalComponent } from './components/manufacturers-list-modal/manufacturers-list-modal.component';
import { UpdateManufacturerModalComponent } from './components/update-manufacturer-modal/update-manufacturer-modal.component';
import { CreateColorModalComponent } from './components/create-color-modal/create-color-modal.component';
import { UpdateColorModalComponent } from './components/update-color-modal/update-color-modal.component';
import { ColorsListModalComponent } from './components/colors-list-modal/colors-list-modal.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ItemsPageComponent,
    CreateItemPageComponent,
    UpdateItemModalComponent,
    CreateManufacturerModalComponent,
    ManufacturersListModalComponent,
    UpdateManufacturerModalComponent,
    CreateColorModalComponent,
    UpdateColorModalComponent,
    ColorsListModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
