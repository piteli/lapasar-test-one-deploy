import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatListModule} from '@angular/material/list'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';
import { ProductsComponent } from '../pages/products/products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from '../pages/cart/cart.component'; 
import { CartService } from 'src/shared/services/cart/cart.service';
import { ProductsService } from 'src/shared/services/products/products.service';
import { ApiService } from 'src/shared/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from 'src/shared/services/toast/toast.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConvertToPricePipe } from '../shared/pipes/convert-to-price/convert-to-price.pipe'; 
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list'; 

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    ConvertToPricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatGridListModule
  ],
  exports : [ConvertToPricePipe],
  providers: [CartService, ProductsService, ApiService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
