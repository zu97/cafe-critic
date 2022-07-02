import { Component, Input } from '@angular/core';
import { Place } from '../../../models/place.model';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent {
  @Input() place!: Place;
}
