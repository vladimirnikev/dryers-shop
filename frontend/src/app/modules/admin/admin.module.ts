import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateItemPageComponent } from './components/create-item-page/create-item-page.component';
import { MaterialModule } from '../material/material.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { UpdateItemModalComponent } from './components/update-item-modal/update-item-modal.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CreateManufacturerModalComponent } from './components/create-manufacturer-modal/create-manufacturer-modal.component';
import { ManufacturersListModalComponent } from './components/manufacturers-list-modal/manufacturers-list-modal.component';
import { UpdateManufacturerModalComponent } from './components/update-manufacturer-modal/update-manufacturer-modal.component';
import { CreateColorModalComponent } from './components/create-color-modal/create-color-modal.component';
import { UpdateColorModalComponent } from './components/update-color-modal/update-color-modal.component';
import { ColorsListModalComponent } from './components/colors-list-modal/colors-list-modal.component';
import { CreateStockModalComponent } from './components/create-stock-modal/create-stock-modal.component';
import { StockListModalComponent } from './components/stock-list-modal/stock-list-modal.component';
import { AddingProductsToStockModalComponent } from './components/adding-products-to-stock-modal/adding-products-to-stock-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UpdateStockPageComponent } from './components/update-stock-page/update-stock-page.component';

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
    CreateStockModalComponent,
    StockListModalComponent,
    AddingProductsToStockModalComponent,
    LoaderComponent,
    UpdateStockPageComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
