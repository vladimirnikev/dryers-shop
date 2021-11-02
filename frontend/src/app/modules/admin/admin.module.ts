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
import { UpdateItemModalComponent } from './components/update-item-modal/update-item-modal.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    ItemsPageComponent,
    CreateItemPageComponent,
    UpdateItemModalComponent
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
