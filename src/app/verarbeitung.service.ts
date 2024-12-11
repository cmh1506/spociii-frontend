import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Verarbeitung } from './models/verarbeitung';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VerarbeitungService {

  constructor(private http: HttpClient) { }

  path = environment.path

  verarbeitungsAPIUrl = this.path 

  getAll(): Observable<Verarbeitung[]> {
    return this.http.get<Verarbeitung[]>(this.path + '/verarbeitung')
  }

  getById(id: number) {
    return this.http
      .get<Verarbeitung>(`${this.verarbeitungsAPIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add( verarbeitung: Verarbeitung): Observable<Verarbeitung> {
    return this.http
      .post<Verarbeitung>(this.verarbeitungsAPIUrl, verarbeitung)
      .pipe(catchError(this.handleError));
  }

  update(verarbeitung: Verarbeitung): Observable<Verarbeitung> {
    return this.http
      .put<Verarbeitung>(this.verarbeitungsAPIUrl, verarbeitung)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.verarbeitungsAPIUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
