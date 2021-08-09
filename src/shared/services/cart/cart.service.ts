import { Injectable } from '@angular/core';
import { productsInterface } from 'src/shared/models/products.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart_number : number = 0;
  cart_data : productsInterface[] = [];
  cartDataChanges = new Subject<any>();
  cartNumberChanges = new Subject<any>();

  constructor() { }

  addItem(item : productsInterface){
    if(localStorage.hasOwnProperty('cart') && localStorage.getItem('cart') !== null){
      let cart_object = JSON.parse(localStorage.getItem('cart') as any);
      const index = cart_object.findIndex((c : any) => c._id === item._id);
      if(index >= 0){
        cart_object[index]['quantity'] = item.quantity;
      }else{
        cart_object.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(cart_object));
      this.checkQuantity();
    }else{
      localStorage.setItem('cart', JSON.stringify([item]));
      this.checkQuantity();
    }
  }

  checkQuantity(){
    const cart = JSON.parse(localStorage.getItem('cart') as any);
    let fresh_cart : productsInterface[] = [];
    for(let item of cart) if(item.quantity != 0) fresh_cart.push(item);
    this.cart_number = fresh_cart.length;
    this.cartNumberChanges.next(fresh_cart.length);
  }
  
  checkQuantityInCart(){
    this.checkQuantity();
  }

  checkCartData(){
    const cart = JSON.parse(localStorage.getItem('cart') as any);
    this.cartDataChanges.next(cart);
  }
}
