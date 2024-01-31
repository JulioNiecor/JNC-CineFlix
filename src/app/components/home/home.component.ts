import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('rowPoster1', { static: true }) rowPoster1!: ElementRef;
  @ViewChild('rowPoster2', { static: true }) rowPoster2!: ElementRef;

  private isMouseDown = false;
  private startX: number = 0;
  private scrollLeft: number = 0;
  bannerResult:any=[];
  trendingMoviesResult:any=[];
  trendingSeriesResult:any=[];
  moviesResult:any=[];
  seriesResult:any=[];

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.bannerData();
    this.trending();
    this.movies();
    this.series();
  }

  onMouseDown(event: MouseEvent, rowPoster: HTMLElement): void {
    event.preventDefault();
    this.isMouseDown = true;
    this.startX = event.pageX - rowPoster.offsetLeft;
    this.scrollLeft = rowPoster.scrollLeft;
  }

  onMouseUp(): void {
    this.isMouseDown = false;
  }

  onMouseLeave(): void {
    if (this.isMouseDown) {
      this.isMouseDown = false;
    }
  }

  onMouseMove(event: MouseEvent, rowPoster: HTMLElement): void {
    if (!this.isMouseDown) return;

    const x = event.pageX - rowPoster.offsetLeft;
    const walk = (x - this.startX) * 1;
    rowPoster.scrollLeft = this.scrollLeft - walk;
  }

  bannerData() {
    this.tmdbApiService.bannerApiData().subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.bannerResult = res.results;
      },
      error: (error) => {
        console.error('Error:', error);
        alert(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  trending(){
    this.tmdbApiService.trendingMoviesApiData().subscribe((res)=>{
      console.log(res, 'trendingMoviesResult#');
      this.trendingMoviesResult=res.results;
    }, error =>{
      alert(error)
    });
    this.tmdbApiService.trendingSeriesApiData().subscribe((res)=>{
      console.log(res, 'trendingSeriesResult#');
      this.trendingSeriesResult=res.results;
    }, error =>{
      alert(error)
    })
  }

  movies(){
    this.tmdbApiService.fetchMovies().subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.moviesResult = res.results;
      },
      error: (error) => {
        console.error('Error:', error);
        alert(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
  series(){
    this.tmdbApiService.fetchSeries().subscribe((res)=>{
      console.log(res, 'seriesResult#');
      this.seriesResult=res.results;
    }, error =>{
      alert(error)
    })
  }

}