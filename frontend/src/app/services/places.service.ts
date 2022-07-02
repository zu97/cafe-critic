import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { AddPlaceData, AddPlaceGalleryPhotoData, AddPlaceReviewData, Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient,
  ) { }

  fetchPlaces() {
    return this.http.get<Place[]>(env.apiUrl + '/places');
  }

  getPlace(id: string) {
    return this.http.get<Place>(env.apiUrl + '/places/' + id);
  }

  addPlace(placeData: AddPlaceData) {
    const formData = new FormData();
    Object.keys(placeData).forEach((data) => {
      formData.append(data, placeData[data]);
    });

    return this.http.post<Place>(env.apiUrl + '/places', formData);
  }

  removePlace(id: string) {
    return this.http.delete(env.apiUrl + '/places/' + id);
  }

  addPlaceReview(placeId: string, reviewData: AddPlaceReviewData) {
    return this.http.post<Place>(env.apiUrl + '/places/' + placeId + '/reviews', reviewData);
  }

  removePlaceReview(placeId: string, reviewId: string) {
    return this.http.delete(env.apiUrl + '/places/' + placeId + '/reviews/' + reviewId);
  }

  addPlaceGalleryPhoto(placeId: string, photoData: AddPlaceGalleryPhotoData) {
    const formData = new FormData();
    Object.keys(photoData).forEach((data) => {
      formData.append(data, photoData[data]);
    });

    return this.http.post<Place>(env.apiUrl + '/places/' + placeId + '/gallery', formData);
  }

  removePlaceGalleryPhoto(placeId: string, photoId: string) {
    return this.http.delete(env.apiUrl + '/places/' + placeId + '/gallery/' + photoId);
  }

}
