import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private tmdbApiService:TmdbApiService, public authService: AuthService) {}

  searchForm = new FormGroup({
    'name':new FormControl(null)
  });

  ngOnInit(): void {}

  submitForm(){
    const name = this.searchForm.value.name;
    this.router.navigate(['search/', name]);
  }


}