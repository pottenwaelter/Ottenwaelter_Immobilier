import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, throwError } from 'rxjs';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  authState = new BehaviorSubject(false);
  adminState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform,
  ) { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Une erreur est survenue, veuillez réessayer plus tard');
  };

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if(response) {
        this.authState.next(true);
        if(response.role == "admin")
        {
          this.adminState.next(true);
        }
      }
    })
  }
  
  login(user) {
    this.storage.set('USER_INFO', user).then((response) => {
      this.authState.next(true);
      if(response.role == "admin")
        {
          this.adminState.next(true);
        }
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.authState.next(false);
      if(this.adminState.value == true)
      {
        this.adminState.next(false);
      }
    })
  }

  isAuthenticated() {
    return this.authState.value;
  }

  isAdmin()
  {
    return this.adminState.value;
  }
}
