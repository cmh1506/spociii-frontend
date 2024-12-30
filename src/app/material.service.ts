import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from './models/material';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  path = environment.path

  materialsAPIUrl = this.path 

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.path + '/material')
    /* .pipe(
      shareReplay(1),
    ) */
  }

  getById(id: number) {
    return this.http
      .get<Material>(`${this.materialsAPIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add( material: Material): Observable<Material> {
    return this.http
      .post<Material>(this.path + '/material', material)
      .pipe(catchError(this.handleError));
  }

  update(material: Material): Observable<Material> {
    return this.http
      .put<Material>(this.path + '/material/' + material._id, material)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.path + '/material/'}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
