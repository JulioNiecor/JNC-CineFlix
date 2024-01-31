import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TmdbApiService } from './tmdb-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private authService: AuthService, private tmdbApiService: TmdbApiService) {}

  // addFromList(type: string, id: number): void {
  //   const user = this.authService.getAuthFire();
  
  //   if (user) {
  //     const uid = user.uid;
  //     this.db.object(`userLists/${uid}/${type}/${id}`).set(true);
  //   }
  // }

  // removeFromList(type: string, id: number): void {
  //   const user = this.authService.getAuthFire();
  
  //   if (user) {
  //     const uid = user.uid;
  //     this.db.object(`userLists/${uid}/${type}/${id}`).remove();
  //   }
  // }

  // getList(type: string): Observable<any[]> {
  //   const user = this.authService.getAuthFire();
  
  //   if (user) {
  //     const uid = user.uid;
  //     return this.db.list(`userLists/${uid}/${type}`).valueChanges();
  //   } else {
  //     return of([]);
  //   }
  // }

  // inList(type: string, id: number): Observable<boolean> {
  //   const user = this.authService.getAuthFire();
  
  //   if (user) {
  //     const uid = user.uid;
  //     return this.db.object(`userLists/${uid}/${type}/${id}`).valueChanges().pipe(
  //       map((value) => !!value)
  //     );
  //   } else {
  //     return of(false);
  //   }
  // }

  // getMovies(): Observable<string[]> {
  //   return this.getDetails('movie');
  // }

  // getSeries(): Observable<string[]> {
  //   return this.getDetails('tv');
  // }


  // private getUserIds(type: string): Observable<string[]> {
  //   const user = this.authService.getAuthFire();
  
  //   if (user) {
  //     const uid = user.uid;
  //     return this.db.object(`userLists/${uid}/${type}`).valueChanges().pipe(
  //       map((data: any) => {
  //         return data ? Object.keys(data || {}) : [];
  //       })
  //     );
  //   } else {
  //     return of([]);
  //   }
  // }

  // private getDetails(type: string): Observable<any[]> {
  //   return this.getUserIds(type).pipe(
  //     switchMap(ids => {
  //       if (ids.length > 0) {
  //         return this.tmdbApiService.getDetailsByIds(type, ids);
  //       } else {
  //         return of([]);
  //       }
  //     })
  //   );
  // }
}
