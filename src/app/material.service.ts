import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from './models/material';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  path = environment.path

  materialsAPIUrl = this.path 

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.path + '/materialRefs')
  }

  getById(id: number) {
    return this.http
      .get<Material>(`${this.materialsAPIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add( material: Material): Observable<Material> {
    return this.http
      .post<Material>(this.materialsAPIUrl, material)
      .pipe(catchError(this.handleError));
  }

  update(material: Material): Observable<Material> {
    return this.http
      .put<Material>(this.materialsAPIUrl, material)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.materialsAPIUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: Something bad happened.`
    );
  }
}
