import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { ProductsService } from 'src/shared/services/products/products.service';
import { Subscription } from 'rxjs';
import { CartService } from 'src/shared/services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  header : string = 'Products';
  current_route = '';
  input : string = '';
  cart_number : number = 0;
  subscribe_cart? : Subscription;

  constructor(
    private router : Router,
    private location : Location,
    private productsService : ProductsService,
    private cartService : CartService
  ){}

  ngOnInit(){
    this.pageChangesListener();
    this.cartChangesListener();
  }

  cartChangesListener(){
    this.cart_number = this.cartService.cart_number;
    this.subscribe_cart = this.cartService.cartNumberChanges.subscribe(quantity => {
      this.cart_number = quantity;
    })
    this.cartService.checkQuantityInCart();
  }

  pageChangesListener(){
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.current_route = event.url;
        this.header = event.url === '/cart' ? 'Cart' : 'Products';
      }
    });
  }

  goToCartPage(){
    this.router.navigate(['/cart']);
  }

  goBack(){
    this.location.back();
  }

  setViewTo(layout : string){
    if(layout === 'GRID'){
      this.productsService.changeLayout('grid');
    }else{
      this.productsService.changeLayout('list');
    }
  }

  searchProduct(){
    this.productsService.search(this.input);
  }

  ngOnDestroy(){
    if(this?.subscribe_cart) this.subscribe_cart.unsubscribe();
  }
}
