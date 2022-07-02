import { createAction, props } from '@ngrx/store';
import { Place } from '../models/place.model';

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

