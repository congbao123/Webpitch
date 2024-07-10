const express = require('express');
const route =  express.Router();

const authController = require('../app/controllers/AuthController');
const middlewareController = require('../app/controllers/MiddlewareController');

route.get('/',middlewareController.verifyToken,authController.getALLUsers);
route.delete("/:id",middlewareController.verifyTokenAdminAuth,authController.deleteUser);

module.exports = route; 