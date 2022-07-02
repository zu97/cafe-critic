import { LoginError, RegisterError, User } from '../models/user.model';
import { AddPlaceError, Place } from '../models/place.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
};

export type PlacesState = {
  place: null | Place,
  places: Place[],
  fetchLoading: boolean,
  fetchError: null | string,
  getLoading: boolean,
  getError: null | string,
  addPlaceLoading: boolean,
  addPlaceError: null | AddPlaceError,
  removeLoading: false | string,
  removeError: null | string,
  removeReviewLoading: boolean,
  removeReviewError: null | string,
};

export type AppState = {
  users: UsersState,
  places: PlacesState,
};
