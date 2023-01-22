import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { child, get, getDatabase, onValue, ref, set } from "@angular/fire/database";
// import { getDatabase, ref, set } from "firebase/database";
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { User } from '../models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router,) {

  }

  save(user: firebase.User) {
    // const db = getDatabase();
    // set(ref(db, 'users/' + user.uid), {
    //   name: user.displayName,
    //   email: user.email
    // });
    this.db.object('users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  getUser(uid: string): AngularFireObject<User> {
    return this.db.object('users/' + uid)

    // return this.db.list('users/').valueChanges() as Observable<User[]>

  }
}
