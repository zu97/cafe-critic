import { Component, Input } from '@angular/core';
import { PlaceReview } from '../../../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/types';
import { Observable } from 'rxjs';
import { removePlaceReviewRequest } from '../../../../store/places.actions';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent {
  @Input() placeId!: string;
  @Input() review!: PlaceReview;

  removeLoading: Observable<boolean>;
  removeError: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.removeLoading = store.select((state) => state.places.removeReviewLoading);
    this.removeError = store.select((state) => state.places.removeReviewError);
  }

  onRemove(): void {
    this.store.dispatch(removePlaceReviewRequest({
      placeId: this.placeId,
      reviewId: this.review._id
    }));
  }
}
