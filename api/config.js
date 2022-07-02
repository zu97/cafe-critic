const path = require('path');
const rootPath = __dirname;

let mongoDb = 'mongodb://localhost/cw13_zush';
let port = 8000;

if (process.env.NODE_ENV === 'test') {
  mongoDb = 'mongodb://localhost/cw13_zush_test';
  port = 8010;
}

module.exports = {
  port,
  rootPath,
  uploadsPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    url: mongoDb,
    options: { useNewUrlParser: true },
  },
};
