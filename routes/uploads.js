const express = require('express');
const router = express.Router();
const UploadsController = require('../app/Controllers/UploadsController');

// uploads
router.post('/image', UploadsController.image);
router.post('/video', UploadsController.video);

module.exports = router;