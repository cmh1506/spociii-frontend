import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Verpackung } from '../models/verpackung';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { Berechnung } from '../models/berechnung';
import { VerpackungsPageActions } from './+state/verpackungs.actions';

@Injectable({
  providedIn: 'root'
})
export class VerpackungService {
  path = environment.path

  constructor(private httpClient: HttpClient,
    private store: Store) { }

  getAll(): Observable<Verpackung[]> {
    return this.httpClient.get<Verpackung[]>(this.path + '/verpackungs')
      .pipe(catchError(this.handleError))
  }

  getVerpackung(_id: string) {
    return this.httpClient.get<Verpackung>(this.path + '/verpackung/' + _id)
  }

  getBerechnungs(_id: string): Observable<Berechnung[]> {
    if (_id || _id !== '') {
      return this.httpClient.get<Berechnung[]>(this.path + '/berechnungs/' + _id)
    } else {
      return EMPTY
    }
  }

  add(verpackung: Partial<Verpackung>): Observable<Verpackung> {
    let newVerpackung: Partial<Verpackung> = { ...verpackung };
    return this.httpClient.post<Verpackung>(this.path + '/verpackung', newVerpackung)
      .pipe(
        tap((verpackung) => this.store.dispatch(VerpackungsPageActions.loadBerechnungs({ verpackungId: verpackung._id }))),
        catchError(this.handleError));
  }

  update(verpackung: Partial<Verpackung>): Observable<Verpackung> {
    return this.httpClient.put<Verpackung>(this.path + '/verpackung/' + verpackung._id, verpackung)
      .pipe(
        tap((verpackung) => this.store.dispatch(VerpackungsPageActions.loadBerechnungs({ verpackungId: verpackung._id }))),
        catchError(this.handleError));
  }

  delete(_id: string): Observable<unknown> {
    const url = `${this.path}/verpackung/${_id}`;
    return this.httpClient.delete(url).pipe(catchError(this.handleError));
  }


  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
