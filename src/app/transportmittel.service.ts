import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transportmittel } from './models/transportmittel';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransportmittelService {

  constructor(private http: HttpClient) { }

  path = environment.path

  transportmittelsAPIUrl = this.path 

  getAll(): Observable<Transportmittel[]> {
    return this.http.get<Transportmittel[]>(this.path + '/transportmittel')
  }

  getById(id: number) {
    return this.http
      .get<Transportmittel>(`${this.transportmittelsAPIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add( transportmittel: Transportmittel): Observable<Transportmittel> {
    return this.http
      .post<Transportmittel>(this.transportmittelsAPIUrl, transportmittel)
      .pipe(catchError(this.handleError));
  }

  update(transportmittel: Transportmittel): Observable<Transportmittel> {
    return this.http
      .put<Transportmittel>(this.transportmittelsAPIUrl, transportmittel)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.transportmittelsAPIUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
