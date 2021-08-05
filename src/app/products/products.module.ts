import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add/add-product.component';
import { ListProductsComponent } from './list/list-products.component';

@NgModule({
  declarations: [
    AddProductComponent,
    ListProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
        { path: 'products', component: ListProductsComponent },
        { path: 'products/new', component: AddProductComponent },
    ]),
  ],
})
export class ProductsModule { }
