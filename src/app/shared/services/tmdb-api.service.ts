import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  constructor(private http:HttpClient) { }

  // private baseUrl = "https://api.themoviedb.org/3";
  // private apiKey = "2767331b366bff7ae7379898cd19714b";

  bannerApiData():Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/trending/all/week?api_key=${environment.tmdbApi.apiKey}&language=es`);
  }

  trendingMoviesApiData():Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/trending/movie/day?api_key=${environment.tmdbApi.apiKey}&language=es`);
  }

  trendingSeriesApiData():Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/trending/tv/day?api_key=${environment.tmdbApi.apiKey}&language=es`);
  }

  getSearch(data:any):Observable<any>{
    console.log(data, 'search#')
    return this.http.get(`${environment.tmdbApi.baseUrl}/search/multi?api_key=${environment.tmdbApi.apiKey}&query=${data.name}&language=es`)
    .pipe(
      map((response: any) => {
        const filteredResults = response.results.filter((result: any) => result.poster_path !== null && result.media_type !== 'person');
        
        response.results = filteredResults;
        return response;
      })
    );
  }

  getDetails(id:any, type:any):Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/${type}/${id}?api_key=${environment.tmdbApi.apiKey}&language=es`);
  }

  getDetailsByIds(type: string, ids: string[]): Observable<any[]> {
    const requests: Observable<any>[] = [];

    ids.forEach(id => {
      requests.push(this.getDetails(id, type));
    });

    return forkJoin(requests);
  }

  getVideo(data:any, type:any):Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/${type}/${data}/videos?api_key=${environment.tmdbApi.apiKey}`);
  }

  getCast(data:any, type:any):Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/${type}/${data}/credits?api_key=${environment.tmdbApi.apiKey}`);
  }

  fetchMovies():Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/discover/movie?api_key=${environment.tmdbApi.apiKey}&language=es`);
  }

  fetchAllMovies(page: number):Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/discover/movie?api_key=${environment.tmdbApi.apiKey}&page=${page}&language=es`)
    .pipe(
      map((res: any) => res.results)
    );
  }

  fetchSeries():Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/discover/tv?api_key=${environment.tmdbApi.apiKey}&language=es`);
  }

  fetchAllSeries(page: number):Observable<any>{
    return this.http.get(`${environment.tmdbApi.baseUrl}/discover/tv?api_key=${environment.tmdbApi.apiKey}&page=${page}&language=es`)
    .pipe(
      map((res: any) => res.results)
    );
  }
}
