import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import {
  addPlaceFailure,
  addPlaceRequest,
  addPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  getPlaceFailure,
  getPlaceRequest,
  getPlaceSuccess,
  removePlaceFailure,
  removePlaceRequest,
  removePlaceSuccess
} from './places.actions';
import { PlacesService } from '../services/places.service';

@Injectable()
export class PlacesEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private store: Store<AppState>,
    private helpersService: HelpersService,
    private placesService: PlacesService,
  ) {
  }

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.fetchPlaces().pipe(
      map((places) => fetchPlacesSuccess({ places })),
      this.helpersService.catchServerError(fetchPlacesFailure),
    )),
  ));

  getPlace = createEffect(() => this.actions.pipe(
    ofType(getPlaceRequest),
    mergeMap(({ id }) => this.placesService.getPlace(id).pipe(
      map((place) => getPlaceSuccess({ place })),
      this.helpersService.catchServerError(getPlaceFailure),
    )),
  ));

  addPlace = createEffect(() => this.actions.pipe(
    ofType(addPlaceRequest),
    mergeMap(({ placeData }) => this.placesService.addPlace(placeData).pipe(
      map(() => addPlaceSuccess()),
      tap(() => void this.router.navigate(['/'])),
      this.helpersService.catchServerError(addPlaceFailure),
    )),
  ));

  removePlace = createEffect(() => this.actions.pipe(
    ofType(removePlaceRequest),
    mergeMap(({ id }) => this.placesService.removePlace(id).pipe(
      map(() => removePlaceSuccess()),
      tap(() => this.store.dispatch(fetchPlacesRequest())),
      this.helpersService.catchServerError(removePlaceFailure),
    )),
  ));

}
