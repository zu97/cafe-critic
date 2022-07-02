import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
