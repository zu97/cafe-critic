import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Place } from '../models/place.model';

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

}
