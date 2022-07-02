import { createAction, props } from '@ngrx/store';
import { AddPlaceData, AddPlaceError, Place } from '../models/place.model';

export const fetchPlacesRequest = createAction(
  '[Places] Fetch Request'
);
export const fetchPlacesSuccess = createAction(
  '[Places] Fetch Success',
  props<{ places: Place[] }>()
);
export const fetchPlacesFailure = createAction(
  '[Places] Fetch Failure',
  props<{ error: null | string }>()
);

export const getPlaceRequest = createAction(
  '[Places] Get Request',
  props<{ id: string }>()
);
export const getPlaceSuccess = createAction(
  '[Places] Get Success',
  props<{ place: Place }>()
);
export const getPlaceFailure = createAction(
  '[Places] Get Failure',
  props<{ error: null | string }>()
);

export const addPlaceRequest = createAction(
  '[Places] Add Request',
  props<{ placeData: AddPlaceData }>()
);
export const addPlaceSuccess = createAction(
  '[Places] Add Success'
);
export const addPlaceFailure = createAction(
  '[Places] Add Failure',
  props<{ error: null | AddPlaceError }>()
);

export const removePlaceRequest = createAction(
  '[Places] Remove Request',
  props<{ id: string }>()
);
export const removePlaceSuccess = createAction(
  '[Places] Remove Success'
);
export const removePlaceFailure = createAction(
  '[Places] Remove Failure',
  props<{ error: null | string }>()
);

export const removePlaceReviewRequest = createAction(
  '[Places] Remove Review Request',
  props<{ placeId: string, reviewId: string }>()
);
export const removePlaceReviewSuccess = createAction(
  '[Places] Remove Review Success'
);
export const removePlaceReviewFailure = createAction(
  '[Places] Remove Review Failure',
  props<{ error: null | string }>()
);
