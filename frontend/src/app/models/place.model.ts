export interface Place {
  _id: string;
  title: string;
  description: string;
  photo: string;
  overallQuality: number;
  foodQuality: number;
  serviceQuality: number;
  interiorQuality: number;
  reviews: PlaceReview[];
  gallery: PlaceGalleryPhoto[];
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
  createdAt: Date;
}

export interface PlaceGalleryPhoto {
  _id: string;
  user: string;
  photo: string;
}

export interface AddPlaceData {
  [key: string]: any;
  title: string;
  description: string;
  photo: string;
  agree: boolean;
}

export interface AddPlaceError {
  error: string;
}

export interface AddPlaceReviewData {
  review: string;
  foodQuality: number;
  serviceQuality: number;
  interiorQuality: number;
}
