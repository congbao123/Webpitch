const express = require('express');
const route =  express.Router();

const meController = require('../app/controllers/MeController');

route.get('/stored/pitch',meController.storedpitch);

module.exports = route;
