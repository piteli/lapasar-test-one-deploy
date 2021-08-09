import { Component, OnInit } from '@angular/core';
import { productsData } from 'src/shared/data/products.data';
import { AuthorizationType } from 'src/shared/constants/authorization-type';
import { ApiService } from 'src/shared/services/api/api.service';
import { productsInterface } from 'src/shared/models/products.interface';
import { CartService } from 'src/shared/services/cart/cart.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/shared/services/products/products.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/shared/services/toast/toast.service';
import { messageColor } from 'src/shared/constants/message-color';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsData : productsInterface[] = [];
  subscribe_body? : Subscription;
  subscribe_mode? : Subscription;
  subscribe_api? : Subscription;
  mode? : string;

  constructor(
    private apiService : ApiService,
    private cartService : CartService,
    private productsService : ProductsService,
    private toastService : ToastService
    ) { }

  ngOnInit(): void {
    this.productsData = this.productsService.productsData;
    this.mode = this.productsService.mode;
    this.subscribe_body = this.productsService.productsDataChanges.subscribe((body) => {
      this.productsData = body;
    })
    this.subscribe_mode = this.productsService.modeViewChanges.subscribe((layout) => {
      this.mode = layout;
    })
    this.fetchProducts(false);
  }

  fetchProducts(dummyData : boolean){
    if(dummyData){
      this.productsData = productsData;
      this.productsService.add(productsData);
      return;
    }

    this.apiService.get('/products', AuthorizationType.BASIC)
    .subscribe(res => {
      // console.log(res);
      const data = res.map((data : any) => {
        let new_data = data;
        new_data['quantity'] = 1;
        return new_data;
      });
      this.productsData = data;
      this.productsService.add(data);
    }, err => {
      //handle error network here
      console.log(err);
      this.reRunThisMethod(this.fetchProducts);
    })
  }

  reRunThisMethod = (functionName : any) => {
    setTimeout(() => functionName(), 5000);
  }

  addToCart(item : productsInterface){
    this.cartService.addItem(item);
    this.toastService.openSnckaBar('Product added!', messageColor.success);
  }

  getFullImageURL(id : string, imageName : string){
    return `${environment.baseURL}/products/${id}/${imageName}`;
  }

  addQuantity(id : string){
    if(this.productsData === undefined) return;
    const index = this.findIndexInData(id);
    let total_quantity = this.productsData[index]['quantity'];
    total_quantity++;
    this.productsData[index]['quantity'] = total_quantity;
  }

  removeQuantity(id : string){
    if(this.productsData === undefined) return;
    const index = this.findIndexInData(id);
    let total_quantity = this.productsData[index]['quantity'];
    if(total_quantity <= 0) return;
    total_quantity--;
    this.productsData[index]['quantity'] = total_quantity;
  }

  findIndexInData(id : string){
    return this.productsData.findIndex(c => c._id === id);
  }

  ngOnDestroy(){
    if(this.subscribe_api !== undefined) this.subscribe_api.unsubscribe();
    if(this.subscribe_body !== undefined) this.subscribe_body.unsubscribe();
    if(this.subscribe_mode !== undefined) this.subscribe_mode.unsubscribe();
  }

}
