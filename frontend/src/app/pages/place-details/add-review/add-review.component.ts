import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { addPlaceReviewRequest, removePlaceReviewRequest } from '../../../store/places.actions';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  @Input() reviewId!: string;
  @ViewChild('f') form!: NgForm;

  addReviewLoading: Observable<boolean>;
  addReviewError: Observable<null | string>;
  removeLoading: Observable<boolean>;
  removeError: Observable<null | string>;

  private loadingSub!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.addReviewLoading = store.select((state) => state.places.addReviewLoading);
    this.addReviewError = store.select((state) => state.places.addReviewError);
    this.removeError = store.select((state) => state.places.removeReviewError);
    this.removeLoading = store.select((state) => state.places.removeReviewLoading).pipe(
      map((isLoading) => isLoading === this.reviewId),
    );
  }

  ngOnInit(): void {
    this.loadingSub = this.addReviewLoading.subscribe((isLoading) => {
      if (!isLoading && this.form) {
        this.form.resetForm();
      }
    });
  }

  onRemove(): void {
    this.store.dispatch(removePlaceReviewRequest({
      placeId: this.id,
      reviewId: this.reviewId,
    }));
  }


  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(addPlaceReviewRequest({ placeId: this.id, reviewData: this.form.value }));
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

}
