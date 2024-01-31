import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router, private tmdbApiService:TmdbApiService, public authService: AuthService) {}

  searchForm = new FormGroup({
    'name':new FormControl(null)
  });

  ngOnInit(): void {
  }

  submitForm(){
    const name = this.searchForm.value.name;
    this.router.navigate(['search/', name]);
  }

}
