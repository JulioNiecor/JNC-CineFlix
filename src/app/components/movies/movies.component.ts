import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  moviesResult:Observable<any[]> | any;
  currentPage: number = 1;
  totalPages: number = 200;

  constructor(private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute, private tmdbApiService:TmdbApiService) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      // Obtén el número de página de los parámetros de la URL
      this.currentPage = +params['page'] || 1;
      this.movies();
    });
  }

  movies(): void{
    this.moviesResult = this.tmdbApiService.fetchAllMovies(this.currentPage);
  }


  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/movies', page]);
      this.movies();
    }
  }

}
