import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsContainer } from './containers/products/products.container';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';

import * as Sentry from '@sentry/browser';
import { environment } from 'src/environments/environment';


// if (environment.production) { //Para produccion:

//   Sentry.init({
//     dsn: 'https://0deb759532cf44ab9e19eaf611b322b1@sentry.io/1869878'
//   });
// }
Sentry.init({
  dsn: 'https://0deb759532cf44ab9e19eaf611b322b1@sentry.io/1869878'
});

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, ProductsContainer],
  imports: [CommonModule, SharedModule, ProductRoutingModule, MaterialModule]
})
export class ProductModule { }
