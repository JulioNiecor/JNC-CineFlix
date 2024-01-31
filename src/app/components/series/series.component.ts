import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit{

  seriesResult:Observable<any[]> | undefined;
  currentPage: number = 1;
  totalPages: number = 200;

  constructor(private authService: AuthService, private router: Router, private activatedRouter: ActivatedRoute, private tmdbApiService:TmdbApiService) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.currentPage = +params['page'] || 1;
      this.series();
    });
  }

  series(): void{
    this.seriesResult = this.tmdbApiService.fetchAllSeries(this.currentPage);
  }


  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.router.navigate(['/series', page]);
      this.series();
    }
    this.router.navigate(['/series', page]);
    this.series();
  }
}
