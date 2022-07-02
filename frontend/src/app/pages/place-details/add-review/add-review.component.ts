import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { addPlaceReviewRequest } from '../../../store/places.actions';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  @Input() allowReview!: boolean;
  @ViewChild('f') form!: NgForm;

  addReviewLoading: Observable<boolean>;
  addReviewError: Observable<null | string>;

  private loadingSub!: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.addReviewLoading = store.select((state) => state.places.addReviewLoading);
    this.addReviewError = store.select((state) => state.places.addReviewError);
  }

  ngOnInit(): void {
    this.loadingSub = this.addReviewLoading.subscribe((isLoading) => {
      if (!isLoading && this.form) {
        this.form.resetForm();
      }
    });
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
