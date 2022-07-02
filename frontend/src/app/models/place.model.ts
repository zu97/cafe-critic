export interface Place {
  _id: string;
  title: string;
  description: string;
  photo: string;
  overallQuality: number;
  foodQuality: number;
  serviceQuality: number;
  interiorQuality: number;
  gallery: PlaceGalleryPhoto[];
  reviews: PlaceReview[];
}

export interface PlaceReview {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  review: string;
  foodQuality: number;
  serviceQuality: number;
  interiorQuality: number;
}

export interface PlaceGalleryPhoto {
  _id: string;
  user: string;
  photo: string;
}
