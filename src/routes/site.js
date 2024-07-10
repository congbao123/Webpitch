const express = require('express');
const route =  express.Router();

const siteController = require('../app/controllers/SiteController');
const middlewareController = require('../app/controllers/MiddlewareController');

route.get('/search',siteController.search);
route.get('/',siteController.index); 

module.exports = route;
