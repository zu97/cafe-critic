import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { getPlaceRequest } from '../../store/places.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  place: Observable<null | Place>;
  isAllowSendReview = false;

  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  private user: Observable<null | User>;
  private userData: null | User = null;
  private placeData: null | Place = null;

  private userSub!: Subscription;
  private placeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.user = store.select((state) => state.users.user);
    this.place = store.select((state) => state.places.place);
    this.isLoading = store.select((state) => state.places.getLoading);
    this.error = store.select((state) => state.places.getError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = <string>params['place'];
      this.store.dispatch(getPlaceRequest({ id }));
    });

    this.placeSub = this.place.subscribe((place) => {
      this.placeData = place;
      this.checkAccessSendReview();
    });

    this.userSub = this.user.subscribe((user) => {
      this.userData = user;
      this.checkAccessSendReview();
    });
  }

  checkAccessSendReview(): void {
    if (!this.placeData || !this.userData) {
      return;
    }

    const checkUserReview = this.placeData.reviews.find((review) => {
      return review.user._id === this.userData?._id
    });

    this.isAllowSendReview = !checkUserReview;
  }

}
