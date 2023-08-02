import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { ProductsingleComponent } from './components/productsingle/productsingle.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProductsComponent } from './components/products/products.component';
import { SortDirective } from './directive/sort.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardInventoryComponent } from './components/dashboard/admin-dashboard-inventory/admin-dashboard-inventory.component';
import { AdminDashboardCustomersComponent } from './components/dashboard/admin-dashboard-customers/admin-dashboard-customers.component';
import { AdminDashboardVendorsComponent } from './components/dashboard/admin-dashboard-vendors/admin-dashboard-vendors.component';
import { AdminDashboardSalesComponent } from './components/dashboard/admin-dashboard-sales/admin-dashboard-sales.component';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';


import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ProductsingleComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,

    OrdersComponent,
    DashboardComponent,
    InventoryComponent,
    ProfileDetailsComponent,
    ProductsComponent,
    SortDirective,

    AdminDashboardInventoryComponent,
    AdminDashboardCustomersComponent,
    AdminDashboardVendorsComponent,
    AdminDashboardSalesComponent,

    LogoutComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
