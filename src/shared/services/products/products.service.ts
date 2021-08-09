import { Injectable } from '@angular/core';
import { productsInterface } from 'src/shared/models/products.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsData : any = [];
  productsBackup : productsInterface[] = [];
  productsDataChanges = new Subject<any>();
  mode : string = 'list';
  modeViewChanges = new Subject<any>();

  constructor() { }

  add(productsData : productsInterface[]){
    this.productsData = productsData;
    this.productsBackup = productsData;
    this.productsDataChanges.next(productsData);
  }

  changeLayout(mode : string){
    this.mode = mode;
    this.modeViewChanges.next(mode);
  }

  search(keyword : string){
    const value = keyword;
    let collection = [];
    const data = this.productsData;

    if(value === ''){
        this.productsData = this.productsBackup;
        this.productsDataChanges.next(this.productsBackup);
        return;
    }
    for(let item of data){
        for(let key in item){
            if(typeof key !== 'string') continue;
            if((((item[key]).toString())).indexOf(value) > -1) collection.push(item); continue;
        }
    }
    this.productsData = collection;
    this.productsDataChanges.next(collection);
  }
}
