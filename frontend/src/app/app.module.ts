import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { BarRatingModule } from 'ngx-bar-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { LoaderComponent } from './ui/loader/loader.component';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { IsAuthDirective } from './directives/is-auth.directive';
import { HasRoleDirective } from './directives/has-role.directive';
import { AuthInterceptor } from './auth.interceptor';
import { LayoutComponent } from './ui/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ImagePipes } from './pipes/image.pipe';
import { PlacesComponent } from './pages/places/places.component';
import { PlaceItemComponent } from './pages/places/place-item/place-item.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { PlaceDetailsComponent } from './pages/place-details/place-details.component';
import { ReviewsComponent } from './pages/place-details/reviews/reviews.component';
import { ReviewItemComponent } from './pages/place-details/reviews/review-item/review-item.component';
import { AddReviewComponent } from './pages/place-details/add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CenteredCardComponent,
    FileInputComponent,
    LoaderComponent,
    ValidateIdenticalDirective,
    IsAuthDirective,
    HasRoleDirective,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ImagePipes,
    PlacesComponent,
    PlaceItemComponent,
    AddPlaceComponent,
    PlaceDetailsComponent,
    ReviewsComponent,
    ReviewItemComponent,
    AddReviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppStoreModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    BarRatingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
