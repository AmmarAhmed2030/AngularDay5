import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiKey = '73f3f35dbe7e6aabf09282b749f94479';

  constructor(private http: HttpClient) {}

  getAllPopularMovies(): Observable<any[]> {
    return this.http.get<any[]>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`
    );
  }
}
