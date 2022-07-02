const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');

const config = require('../config');
const Place = require('../models/Place');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadsPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const router = express.Router();
const upload = multer({ storage });

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.find();
    return res.send(places);
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id).populate('reviews.user', 'displayName');
    if (!place) {
      return res.status(404).send({ error: 'Page not found' });
    }

    return res.send(place);
  } catch (e) {
    return next(e);
  }
});

router.post('/', auth, upload.single('photo'), async (req, res, next) => {
  try {
    if (!req.body.agree) {
      return res.status(400).send({ error: 'To create a place, you must agree to the terms' });
    }

    const place = new Place({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      photo: req.file ? req.file.filename : null,
    });

    await place.save();
    return res.send(place);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

router.post('/:id/reviews', auth, async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).send({ error: 'Page not found' });
    }

    const checkReview = place['reviews'].find((review) => review.user.equals(req.user._id));
    if (checkReview) {
      return res.status(400).send({ error: 'You have already posted a review for this place' });
    }

    place['reviews'].push({
      user: req.user._id,
      review: req.body.review,
      foodQuality: req.body.foodQuality,
      serviceQuality: req.body.serviceQuality,
      interiorQuality: req.body.interiorQuality,
    });

    await place.save();
    return res.send(place);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

router.post('/:id/gallery', auth, upload.single('photo'), async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).send({ error: 'Page not found' });
    }

    place['gallery'].push({
      user: req.user._id,
      photo: req.file ? req.file.filename : null,
    });

    await place.save();
    return res.send(place);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).send({ error: 'Page not found' });
    }

    await place.remove();
    return res.send({ message: 'ok' });
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id/reviews/:reviewId', auth, async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).send({ error: 'Page not found' });
    }

    const checkRemove = place['reviews'].find((review) => review._id.equals(req.params.reviewId));
    if (!checkRemove) {
      return res.status(404).send({ error: 'Page not found' });
    }

    if (req.user.role !== 'admin' && !checkRemove.user._id.equals(req.user._id)) {
      return res.status(400).send({ error: 'You do not have sufficient rights to delete' });
    }

    const reviewIndex = place['reviews'].findIndex((review) => review._id.equals(req.params.reviewId));
    place['reviews'].splice(reviewIndex, 1);
    await place.save();

    return res.send({ message: 'ok' });
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id/gallery/:photoId', auth, permit('admin'), async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).send({ error: 'Page not found' });
    }

    const photoIndex = place['gallery'].findIndex((photo) => photo._id.equals(req.params.photoId));
    if (photoIndex === -1) {
      return res.status(404).send({ error: 'Page not found' });
    }

    place['gallery'].splice(photoIndex, 1);
    await place.save();

    return res.send({ message: 'ok' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
