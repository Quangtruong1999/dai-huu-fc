// uploadMiddleware.js

const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
    // fileSize: 4 * 4500 * 4500,
  }
});

module.exports = upload
