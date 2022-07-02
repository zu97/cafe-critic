import { Component, Input } from '@angular/core';
import { Place } from '../../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { removePlaceRequest } from '../../../store/places.actions';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent {
  @Input() place!: Place;
  removeLoading: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.removeLoading = store.select((state) => state.places.removeLoading).pipe(
      map((isLoading) => isLoading === this.place._id),
    );
  }

  onRemove(): void {
    this.store.dispatch(removePlaceRequest({ id: this.place._id }));
  }

}
