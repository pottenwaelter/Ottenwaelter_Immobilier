import { ContactForm } from './../models/contact-form';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './../models/user';
import { Offre } from '../models/offre';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private subscriptionPath = '*******';
  loginPath = '*******';
  contactPath = '*******';
  dbContentPath = '*******';
  managementPath = '*******';

  dbContent: any[] = [];

  constructor(private http: HttpClient) { }

  
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

  createItem(item): Observable<any> {
    return this.http.post<any>(this.subscriptionPath, JSON.stringify(item)).pipe(retry(2), catchError(this.handleError));
  }

  getUser(user): Observable<User> {
    return this.http.post<User>(this.loginPath, JSON.stringify(user)).pipe(retry(2), catchError(this.handleError));
  }

  sendContactForm(contactForm): Observable<ContactForm> {
    return this.http.post<ContactForm>(this.contactPath, JSON.stringify(contactForm)).pipe(retry(2), catchError(this.handleError));
  }

  getDbContent(): Observable<any> {
    return this.http.get(this.dbContentPath);
  }

  getDbEntry(id): Observable<any> {
    return this.http.post<any>(this.dbContentPath, JSON.stringify(id)).pipe(retry(2), catchError(this.handleError));
  } 

  createNewOffer(offer): Observable<any> {
    return this.http.post<any>(this.managementPath, offer).pipe(retry(2), catchError(this.handleError));
  }

  updateOffer(offer): Observable<any> {
    return this.http.post<any>(this.managementPath, offer).pipe(retry(2), catchError(this.handleError));
  }

  deleteOffer(offer): Observable<any> {
    return this.http.post<any>(this.managementPath, offer).pipe(retry(2), catchError(this.handleError));
  }
}
