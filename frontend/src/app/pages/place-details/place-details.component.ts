import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { getPlaceRequest } from '../../store/places.actions';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  place: Observable<null | Place>;
  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.place = store.select((state) => state.places.place);
    this.isLoading = store.select((state) => state.places.getLoading);
    this.error = store.select((state) => state.places.getError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <string>params['place'];
      this.store.dispatch(getPlaceRequest({ id }));
    });
  }

}
