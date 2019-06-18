const express = require('express');
const router = express.Router();
const detailCon = require('../controlller/detailController');
router.get('/get', detailCon.getAllUsers);
router.post('/add', detailCon.addUser);

module.exports = router;