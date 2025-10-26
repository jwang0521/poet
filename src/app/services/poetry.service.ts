import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PoetryService {
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  getPoemsByTitle(title: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/title/${title}`)
      .pipe(
        catchError((err) =>
          throwError(() => new Error('Failed to fetch poems'))
        )
      );
  }

  getPoemsByAuthor(author: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/author/${author}`)
      .pipe(
        catchError((err) =>
          throwError(() => new Error('Failed to fetch poems'))
        )
      );
  }

  getRandomPoems(count: number = 5): Observable<any> {
    return this.http.get(`${this.baseUrl}/random/${count}`);
  }
}
