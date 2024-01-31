import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SecureInnerPageGuard } from './shared/guard/secure-inner-page.guard';
// import { AuthGuard } from './shared/guard/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'details/:media_type/:id', component: DetailsComponent },
  { path: 'movies/:page', component: MoviesComponent },
  { path: 'series/:page', component: SeriesComponent },
  { path: 'search/:name', component: SearchComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [SecureInnerPageGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
