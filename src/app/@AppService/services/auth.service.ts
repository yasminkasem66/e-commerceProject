import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;


  constructor(private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;

  }


  login() {
    let redirctUrl = this.activatedRoute.snapshot.queryParamMap.get('redirctUrl') || 'Home';
    localStorage.setItem('redirctUrl', JSON.stringify(redirctUrl));
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
      this.router.navigate([redirctUrl])
      // this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  /* Setting up user data when sign in with username/password, 
 sign up with username/password and sign in with social auth  
 provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  get appUser(): Observable<User | null> {
    return this.user$.pipe(
      switchMap((user: any) => {
        if (user) return this.userService.getUser(user.uid).valueChanges()
        return of(null)
      }))
  }
}
