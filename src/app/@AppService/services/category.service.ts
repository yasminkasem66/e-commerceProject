import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,) { }

  getCategories(): AngularFireList<Category> {
    return this.db.list<Category>('categories/', ref => ref.orderByChild('name'));
  }
}
