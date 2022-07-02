import { Component, Input, ViewChild } from '@angular/core';
import { addPlaceGalleryPhotoRequest } from '../../../store/places.actions';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent {
  @Input() id!: string;
  @ViewChild('f') form!: NgForm;

  addPhotoLoading: Observable<boolean>;
  addPhotoError: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.addPhotoLoading = store.select((state) => state.places.addPhotoLoading);
    this.addPhotoError = store.select((state) => state.places.addPhotoError);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addPlaceGalleryPhotoRequest({
      placeId: this.id,
      photoData: this.form.value
    }));
  }

}
