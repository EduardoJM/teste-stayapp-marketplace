import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MarketPlaceDetailsComponent } from './core/market-place-details/market-place-details.component';
import { HomeComponent } from './home/home.component';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    MarketPlaceDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
