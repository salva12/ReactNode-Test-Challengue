const express = require('express');

const meeting = require('./meeting');
const auth = require('../../middelwares/auth');

const router = express.Router();

router.get('/', auth, meeting.index)
router.post('/add', auth, meeting.add)

module.exports = router