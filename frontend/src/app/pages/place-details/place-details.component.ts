import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { getPlaceRequest, removePlaceGalleryPhotoRequest } from '../../store/places.actions';
import { User } from '../../models/user.model';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {
  place: Observable<null | Place>;

  isAllowSendReview = false;
  galleryOptionsAdmin: NgxGalleryOptions[] = [];
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  isLoading: Observable<boolean>;
  error: Observable<null | string>;

  private user: Observable<null | User>;
  private userData: null | User = null;
  private placeData!: Place;

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
      if (!place) {
        return;
      }

      this.placeData = place;
      this.checkAccessSendReview();
      this.loadingGalleryImages();
    });

    this.userSub = this.user.subscribe((user) => {
      this.userData = user;
      this.checkAccessSendReview();
    });

    this.galleryOptions = [{
      'image': false,
      'width': '100%',
      'height': '150px',
    }];
    this.galleryOptionsAdmin = [{
      'image': false,
      'width': '100%',
      'height': '150px',
      thumbnailActions: [{
        titleText: 'Remove',
        icon: 'fa fa-solid fa-trash',
        onClick: (_, index) => {
          this.onRemoveGalleryPhoto(index);
        }
      }]
    }];
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

  loadingGalleryImages(): void {
    const images = this.placeData.gallery.map((photo) => {
      const url = environment.apiUrl + '/uploads/' + photo.photo;
      return { small: url, medium: url, big: url };
    });

    if (images) {
      this.galleryImages = images;
    }
  }

  onRemoveGalleryPhoto(photoIndex: number): void {
    const galleryPhoto = this.placeData.gallery[photoIndex];
    if (!galleryPhoto) {
      return;
    }

    this.store.dispatch(removePlaceGalleryPhotoRequest({
      placeId: this.placeData._id,
      photoId: galleryPhoto._id,
    }));
  }

}
