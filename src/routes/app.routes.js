const express = require('express');
const router = express.Router();

const threadController = require('../controllers/thread.controller');

router.get('/threads', threadController.fetchAllThreads);

module.exports = router;