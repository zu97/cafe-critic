import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceDetailsComponent } from './pages/place-details/place-details.component';

const routes: Routes = [
  { path: '', component: PlacesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'places', component: PlacesComponent },
  { path: 'places/new', component: AddPlaceComponent, canActivate: [AuthGuardService] },
  { path: 'places/:place', component: PlaceDetailsComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
