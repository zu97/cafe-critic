const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: 'Wrong login or password' });
    }

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Wrong login or password' });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.send({ message: 'ok' });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.send({ message: 'ok' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'ok' });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
