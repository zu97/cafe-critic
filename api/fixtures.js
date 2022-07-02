const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Place = require('./models/Place');

const run = async () => {
  await mongoose.connect(config.mongo.url, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();
  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [anna, john] = await User.create({
    email: 'anna@gmail.com',
    password: '123',
    displayName: 'Anna',
    avatar: 'anna.jpg',
    token: nanoid(),
    role: 'admin',
  }, {
    email: 'john@gmail.com',
    password: '123',
    displayName: 'John',
    avatar: 'john.jpg',
    token: nanoid(),
    role: 'user',
  });

  await Place.create({
    user: anna,
    title: 'Ithaa Undersea Restaurant',
    description: 'An all-glass undersea restaurant, five meters below sea level, Ithaa gives a scuba-dining experience. With a visual aesthetic of marine animals through the glass, the ambience of this marvel will leave you awestruck! Leading through the wooden jetty to a tiny thatched pavilion, then pointed down a dark, winding staircase, lies Ithaa. Only fourteen diners are served at a time. Ithaa offers a European and French curated menu with novelty food ranging from Australian wagyu beef to French chocolate and the Caspian Sea caviar. Exquisite meals of Ithaa look and taste fantastic! ',
    photo: 'place-1.jpg',
    overallQuality: 1.8,
    foodQuality: 1.5,
    serviceQuality: 2.5,
    interiorQuality: 1.5,
    reviews: [{
      user: anna,
      review: 'Круто, круто',
      foodQuality: 2,
      serviceQuality: 4,
      interiorQuality: 2,
      createdAt: '2022-07-02T16:46:24.000+00:00',
    }, {
      user: john,
      review: 'Мне тоже нравится',
      foodQuality: 1,
      serviceQuality: 1,
      interiorQuality: 1,
      createdAt: '2022-07-02T16:46:24.000+00:00',
    }],
  }, {
    user: john,
    title: 'Grotta Palazzese',
    description: 'Grotta Palazzese\'s exclusivity lies in its setting. It is an outdoor lounge ensconced in a natural cave with pleasant lighting, invoking a tranquil vibe. Flanked by a seascape with a marine horizon on one side and overlapping caves on the other, the ambience is simply classy and upscale. It makes for a great romantic dining spot. Fancy Apulian cuisine? You\'ll get served with exotic dishes from the cuisine at the cave-like Calamari Fritti with salad greens, tuna with burrata cheese, lobster ravioli and what not! Don\'t forget to dress well; they are very particular with the dress code policy here! ',
    photo: 'place-2.jpg',
    overallQuality: 3,
    foodQuality: 3,
    serviceQuality: 3,
    interiorQuality: 3,
    reviews: [{
      user: anna,
      review: 'Это где?',
      foodQuality: 3,
      serviceQuality: 3,
      interiorQuality: 3,
      createdAt: '2022-07-02T16:46:24.000+00:00',
    }],
  }, {
    user: john,
    title: 'SafeHouse Spy',
    description: 'Wondering what\'s with the spy theme? SafeHouse is a restaurant and pub where you\'re spoken to and treated as a spy. Right from the entrance, everything\'s a secret game of Chinese whispers! It\'s fun with memorabilia from the cold war era. The dusky atmosphere of the pub adds to the spy theme. Ordering your food and finishing it to the last bit is your mission. The food comes with a twist too. The Mac and cheese here are served with broccoli, bacon, chicken, peppers topped with bread crumbs. On completion of your meals, the waiters whisper "I will now destroy the evidence\'\' which is pretty cool! Embark upon a dining mission! This is one of the best restaurants in the world as it provides diners with an unforgettable adventure. ',
    photo: 'place-3.jpg',
    gallery: [{
      user: anna,
      photo: 'place-1.jpg',
    }, {
      user: john,
      photo: 'place-2.jpg',
    }],
  });

  await mongoose.connection.close();
};

run().catch((e) => console.error(e));
