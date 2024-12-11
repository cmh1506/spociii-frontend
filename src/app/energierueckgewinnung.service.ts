import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Energierueckgewinnung } from './models/energierueckgewinnung';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnergierueckgewinnungService {

  constructor(private http: HttpClient) { }

  path = environment.path

  energierueckgewinnungsAPIUrl = this.path 

  getAll(): Observable<Energierueckgewinnung[]> {
    return this.http.get<Energierueckgewinnung[]>(this.path + '/energierueckgewinnung')
  }

  getById(id: number) {
    return this.http
      .get<Energierueckgewinnung>(`${this.energierueckgewinnungsAPIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add( energierueckgewinnung: Energierueckgewinnung): Observable<Energierueckgewinnung> {
    return this.http
      .post<Energierueckgewinnung>(this.energierueckgewinnungsAPIUrl, energierueckgewinnung)
      .pipe(catchError(this.handleError));
  }

  update(energierueckgewinnung: Energierueckgewinnung): Observable<Energierueckgewinnung> {
    return this.http
      .put<Energierueckgewinnung>(this.energierueckgewinnungsAPIUrl, energierueckgewinnung)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.energierueckgewinnungsAPIUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
