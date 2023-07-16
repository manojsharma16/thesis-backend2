const express = require('express');
const router = express.Router();
const Route = require('./v1/routes.js');

router.use('/v1',Route)

module.exports = router;