import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import {
  addPlaceFailure,
  addPlaceGalleryPhotoFailure,
  addPlaceGalleryPhotoRequest,
  addPlaceGalleryPhotoSuccess,
  addPlaceRequest,
  addPlaceReviewFailure,
  addPlaceReviewRequest,
  addPlaceReviewSuccess,
  addPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  getPlaceFailure,
  getPlaceRequest,
  getPlaceSuccess,
  removePlaceFailure, removePlaceGalleryPhotoFailure, removePlaceGalleryPhotoRequest, removePlaceGalleryPhotoSuccess,
  removePlaceRequest, removePlaceReviewFailure, removePlaceReviewRequest, removePlaceReviewSuccess,
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
      tap(() => {
        this.helpersService.openSnackBar('Place successfully added');
        void this.router.navigate(['/']);
      }),
      this.helpersService.catchServerError(addPlaceFailure),
    )),
  ));

  removePlace = createEffect(() => this.actions.pipe(
    ofType(removePlaceRequest),
    mergeMap(({ id }) => this.placesService.removePlace(id).pipe(
      map(() => removePlaceSuccess()),
      tap(() => {
        this.helpersService.openSnackBar('Place successfully removed');
        this.store.dispatch(fetchPlacesRequest());
      }),
      this.helpersService.catchServerError(removePlaceFailure),
    )),
  ));

  addPlaceReview = createEffect(() => this.actions.pipe(
    ofType(addPlaceReviewRequest),
    mergeMap(({ placeId, reviewData }) => this.placesService.addPlaceReview(placeId, reviewData).pipe(
      map(() => addPlaceReviewSuccess()),
      tap(() => {
        this.helpersService.openSnackBar('Review successfully added');
        this.store.dispatch(getPlaceRequest({ id: placeId }));
      }),
      this.helpersService.catchServerError(addPlaceReviewFailure),
    )),
  ));

  removePlaceReview = createEffect(() => this.actions.pipe(
    ofType(removePlaceReviewRequest),
    mergeMap(({ placeId, reviewId }) => this.placesService.removePlaceReview(placeId, reviewId).pipe(
      map(() => removePlaceReviewSuccess()),
      tap(() => {
        this.helpersService.openSnackBar('Review successfully removed');
        this.store.dispatch(getPlaceRequest({ id: placeId }));
      }),
      this.helpersService.catchServerError(removePlaceReviewFailure),
    )),
  ));

  addPlaceGalleryPhoto = createEffect(() => this.actions.pipe(
    ofType(addPlaceGalleryPhotoRequest),
    mergeMap(({ placeId, photoData }) => this.placesService.addPlaceGalleryPhoto(placeId, photoData).pipe(
      map(() => addPlaceGalleryPhotoSuccess()),
      tap(() => {
        this.helpersService.openSnackBar('Photo successfully uploaded');
        this.store.dispatch(getPlaceRequest({ id: placeId }));
      }),
      this.helpersService.catchServerError(addPlaceGalleryPhotoFailure),
    )),
  ));

  removePlaceGalleryPhoto = createEffect(() => this.actions.pipe(
    ofType(removePlaceGalleryPhotoRequest),
    mergeMap(({ placeId, photoId }) => this.placesService.removePlaceGalleryPhoto(placeId, photoId).pipe(
      map(() => removePlaceGalleryPhotoSuccess()),
      tap(() => {
        this.helpersService.openSnackBar('Photo successfully removed');
        this.store.dispatch(getPlaceRequest({ id: placeId }));
      }),
      this.helpersService.catchServerError(removePlaceGalleryPhotoFailure),
    )),
  ));

}
