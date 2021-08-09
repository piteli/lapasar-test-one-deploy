import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { productsInterface } from 'src/shared/models/products.interface';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData : productsInterface[] = [];
  subscribe_cart? : Subscription;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartData = this.cartService.cart_data;
    this.subscribe_cart = this.cartService.cartDataChanges.subscribe(items => {
      this.cartData = items;
    })
    this.cartService.checkCartData();
  }

  getFullImageURL(id : string, imageName : string){
    return `${environment.baseURL}/products/${id}/${imageName}`;
  }

  ngOnDestroy(){
    if(this.subscribe_cart !== undefined) this.subscribe_cart?.unsubscribe();
  }

}
