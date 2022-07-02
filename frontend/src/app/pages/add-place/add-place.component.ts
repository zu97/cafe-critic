import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { addPlaceRequest } from '../../store/places.actions';
import { AddPlaceError } from '../../models/place.model';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent {
  @ViewChild('f') form!: NgForm;

  addPlaceLoading: Observable<boolean>;
  addPlaceError: Observable<null | AddPlaceError>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.addPlaceLoading = store.select((state) => state.places.addPlaceLoading);
    this.addPlaceError = store.select((state) => state.places.addPlaceError);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addPlaceRequest({ placeData: this.form.value }));
  }

}
