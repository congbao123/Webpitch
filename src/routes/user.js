const express = require('express');
const route =  express.Router();

const siteController = require('../app/controllers/SiteController');
const userController = require('../app/controllers/UserController');
const MiddlewareController = require('../app/controllers/MiddlewareController');
const pitchController = require('../app/controllers/PitchController');


//Register
route.get('/auth/Register',userController.Register)
route.post('/register',userController.registerUser);

//Login
route.get('/auth/Login',userController.Login);
route.post('/login',userController.loginUser);
//Reresh
route.post('/refresh',userController.requesRefreshToken);
//loguot
// route.get('/loguot',MiddlewareController.verifyToken,userController.userLoguot);

route.post('/loguot',MiddlewareController.verifyToken,userController.userLoguot);

// trang chu khi dang nhap
route.get('/', MiddlewareController.verifyToken, siteController.index); 

// //tạo sân
// route.get('/create',MiddlewareController.verifyToken, pitchController.create);

// route.post('/store',pitchController.store);
// //sửa sân
// route.get('/:id/edit',MiddlewareController.verifyToken, pitchController.edit);

// route.post('/:id', pitchController.update);
// //lấy id show chi tiết 
// route.get('/:slug',MiddlewareController.verifyToken,pitchController.show);
// //xóa sân
// route.post('/:id/delete', pitchController.delete);

module.exports = route;