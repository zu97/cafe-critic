const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  overallQuality: {
    type: Number,
    required: true,
    default: 0,
  },
  foodQuality: {
    type: Number,
    required: true,
    default: 0,
  },
  serviceQuality: {
    type: Number,
    required: true,
    default: 0,
  },
  interiorQuality: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [{
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
    review: {
      type: String,
      required: true,
      min: 1,
      max: 5,
    },
    foodQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    serviceQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    interiorQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date,
    }
  }],
  gallery: [{
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  }],
});

PlaceSchema.pre('save', async function (next) {
  if (!this.isModified('reviews')) {
    return next();
  }

  let foodQuality = this.reviews.reduce((acc, review) => {
    return acc + review['foodQuality'];
  }, 0);

  let serviceQuality = this.reviews.reduce((acc, review) => {
    return acc + review['serviceQuality']
  }, 0);

  let interiorQuality = this.reviews.reduce((acc, review) => {
    return acc + review['interiorQuality']
  }, 0);

  foodQuality = foodQuality === 0 ? 0 : foodQuality / this.reviews.length;
  serviceQuality = serviceQuality === 0 ? 0 : serviceQuality / this.reviews.length;
  interiorQuality = interiorQuality === 0 ? 0 : interiorQuality / this.reviews.length;

  const overallQuality = (foodQuality + serviceQuality + interiorQuality ) / 3;

  this.foodQuality = (foodQuality).toFixed(1);
  this.serviceQuality = (serviceQuality).toFixed(1);
  this.interiorQuality = (interiorQuality).toFixed(1);
  this.overallQuality = (overallQuality).toFixed(1);

  next();
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
