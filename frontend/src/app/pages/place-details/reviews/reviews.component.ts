import { Component, Input } from '@angular/core';
import { Place } from '../../../models/place.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input() place!: Place;
}
