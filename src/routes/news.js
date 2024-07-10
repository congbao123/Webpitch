const express = require('express');
const route =  express.Router();

const newsController = require('../app/controllers/NewsController');

route.get('/:slug',newsController.show);
route.get('/',newsController.new); 

module.exports = route;
