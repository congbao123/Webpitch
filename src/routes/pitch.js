const express = require('express');
const route =  express.Router();

const pitchController = require('../app/controllers/PitchController');
const bookingController  = require('../app/controllers/BookingController ');
const MiddlewareController = require('../app/controllers/MiddlewareController');;

//tạo sân
route.get('/create', pitchController.create);

route.post('/store',pitchController.store);
//sửa sân
route.get('/:id/edit', pitchController.edit);

route.post('/:id', pitchController.update);
//lấy id show chi tiết 
route.get('/:slug', pitchController.show);
//xóa sân
route.post('/:id/delete', pitchController.delete);

// Booking routes
route.get('/:slug/book', bookingController.showBookingForm);
route.post('/:slug/book', bookingController.bookPitch);

// //admin booking roter
// route.get('/Booking/adminBooking', bookingController.showBookings);

// // Cập nhật trạng thái đặt sân
// route.post('/admin/adminBooking/:bookingId/update-status', bookingController.updateBookingStatus);

route.get('/Booking/adminBooking', bookingController.listBookings);
route.post('/Booking/adminBooking/{{this._id}}/status', bookingController.updateBookingStatus);
module.exports = route;
