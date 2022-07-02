import { PlacesState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  addPlaceFailure,
  addPlaceRequest,
  addPlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  getPlaceFailure,
  getPlaceRequest,
  getPlaceSuccess
} from './places.actions';

const initialState: PlacesState = {
  place: null,
  places: [],
  fetchLoading: false,
  fetchError: null,
  getLoading: false,
  getError: null,
  addPlaceLoading: false,
  addPlaceError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({ ...state, fetchLoading: true, fetchError: null })),
  on(fetchPlacesSuccess, (state, { places }) => ({ ...state, fetchLoading: false, places })),
  on(fetchPlacesFailure, (state, { error }) => ({ ...state, fetchLoading: false, fetchError: error })),

  on(getPlaceRequest, state => ({ ...state, getLoading: true, getError: null })),
  on(getPlaceSuccess, (state, { place }) => ({ ...state, getLoading: false, place })),
  on(getPlaceFailure, (state, { error }) => ({ ...state, getLoading: false, getError: error })),

  on(addPlaceRequest, state => ({ ...state, addLoading: true, addError: null })),
  on(addPlaceSuccess, state => ({ ...state, addLoading: false })),
  on(addPlaceFailure, (state, { error }) => ({ ...state, addLoading: false, addError: error })),

);
