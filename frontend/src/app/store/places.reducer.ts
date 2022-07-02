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
  getPlaceSuccess,
  removePlaceFailure,
  removePlaceRequest,
  removePlaceReviewFailure,
  removePlaceReviewRequest,
  removePlaceReviewSuccess,
  removePlaceSuccess
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
  removeLoading: false,
  removeError: null,
  removeReviewLoading: false,
  removeReviewError: null,
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

  on(removePlaceRequest, (state, { id }) => ({ ...state, removeLoading: id, removeError: null })),
  on(removePlaceSuccess, state => ({ ...state, removeLoading: false })),
  on(removePlaceFailure, (state, { error }) => ({ ...state, removeLoading: false, removeError: error })),

  on(removePlaceReviewRequest, state => ({ ...state, removeReviewLoading: true, removeReviewError: null })),
  on(removePlaceReviewSuccess, state => ({ ...state, removeReviewLoading: false })),
  on(removePlaceReviewFailure, (state, { error }) => ({
    ...state,
    removeReviewLoading: false,
    removeReviewError: error
  })),

);
