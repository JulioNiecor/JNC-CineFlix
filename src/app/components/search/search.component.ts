import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchResult:any;
  searchForm = new FormGroup({
    'name':new FormControl(null as string | null)
  });

  constructor(private tmdbApiService:TmdbApiService, private activatedRouter:ActivatedRoute, private router:Router) {}

  ngOnInit(){
    this.activatedRouter.params.pipe(distinctUntilChanged()).subscribe(params => {
      if (params['name']) {
        this.searchForm.patchValue({ name: params['name'] });
        this.submitForm();
      }
    });
  }

  submitForm(){
    this.tmdbApiService.getSearch(this.searchForm.value).subscribe((res)=>{
      console.log(res, 'search#')
      this.searchResult = res.results;
    })
  }
}
