import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DetailProductComponent } from './detail/detail-product.component';
import { ListProductsComponent } from './list/list-products.component';

@NgModule({
  declarations: [
    DetailProductComponent,
    ListProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule,
    HttpClientModule,
    RouterModule.forChild([
        { path: 'products', component: ListProductsComponent },
        { path: 'products/new', component: DetailProductComponent },
        { path: 'products/:id', component: DetailProductComponent },
    ]),
  ],
})
export class ProductsModule { }
