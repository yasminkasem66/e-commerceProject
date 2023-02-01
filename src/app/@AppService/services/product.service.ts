import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product: Product) {
    return this.db.list('/products').push(product)
  }
  getProdducts(): AngularFireList<Product> {
    return this.db.list('/products')
  }

  getProdduct(prdId: string): AngularFireObject<Product> {
    return this.db.object('/products/' + prdId)
  }

  updateProdduct(prdId: string, product: Product) {
    return this.db.object('/products/' + prdId).update(product)
  }

  deleteProdduct(prdId: string) {
    return this.db.object('/products/' + prdId).remove()
  }

}
