import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FirebaseAuthResponse, User} from "../../../shared/interfaces";
import {Observable, throwError, Subject} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  public _token: string | null = null;
  public err$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expireDate = new Date(localStorage.getItem('fb-token-expire-date') as string);
    if (new Date() > expireDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<FirebaseAuthResponse> {
    user.returnSecureToken = true;
    return this.http.post<FirebaseAuthResponse>(`${environment.apiBaseUrl}/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case "INVALID_EMAIL":
        this.err$.next('Incorrect email');
        break;
      case "INVALID_PASSWORD":
        this.err$.next('Incorrect password');
        break;
      case "EMAIL_NOT_FOUND":
        this.err$.next('The email does not exist!');
        break;
    }
    return throwError(error);
  }

  logout() {
    localStorage.removeItem('fb-token');
    localStorage.removeItem('fb-token-expire-date');
    this._token = null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FirebaseAuthResponse) {
    const expireDate = new Date(new Date().getTime() + parseInt(response.expiresIn) * 1000);
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-expire-date', expireDate.toString());
    this._token = response.idToken;
  }
}
