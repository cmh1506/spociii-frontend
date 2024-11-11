import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginInfo, Token, User } from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,) { }

  path = environment.path + "/auth"

  registerUser(user: User): Observable<Token> {
    return this.httpClient.post<Token>(this.path + '/register', user)
      .pipe(catchError(this.handleError))
  }

  loginUser(loginInfo: LoginInfo): Observable<Token> {
    return this.httpClient.post<Token>(this.path + '/login', loginInfo)
      .pipe(catchError(this.handleError))
  }

  private handleError({ error }: HttpErrorResponse) {
    return throwError(
      () => `${error}`
    );
  }


}
