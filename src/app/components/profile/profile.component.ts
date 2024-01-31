import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  // movies: any[] = [];
  // series: any[] = [];

  constructor(private authService: AuthService,) {}

  ngOnInit(): void {
    this.user = this.authService.getAuthFire();
  }
  
  
}
