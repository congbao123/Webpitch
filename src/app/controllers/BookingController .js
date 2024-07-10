// app/controllers/BookingController.js
const Pitch = require('../models/Pitch');
const Booking = require('../models/Booking');  // Assuming you have a Booking model

class BookingController {
    showBookingForm(req, res, next) {
        Pitch.findOne({ slug: req.params.slug }).lean()
            .then(pitch => res.render('Booking/booking', { pitch }))
            .catch(next);
    }

    bookPitch(req, res, next) {
        const booking = new Booking({
            pitch: req.params.slug,
            user: req.body.user,  
            phone: req.body.phone,
            date: req.body.date,
            time: req.body.time
        });

        booking.save()
            .then(() => {
                req.flash('success_msg', 'Đặt sân thành công!');
                res.redirect('/');
            })
            .catch(error => {
                console.error(error);
                req.flash('error_msg', 'Lỗi khi đặt sân');
                res.redirect('back');
            });
    }
    listBookings(req, res, next) {
        Booking.find().lean()
            .then(bookings => res.render('Booking/adminBooking', { bookings }))
            .catch(next);
    }

    updateBookingStatus(req, res, next) {
        Booking.findByIdAndUpdate(req.params.id, { status: req.body.status })
            .then(() => {
                req.flash('success_msg', 'Cập nhật trạng thái thành công!');
                res.redirect('/Booking/adminBooking');
            })
            .catch(error => {
                console.error(error);
                req.flash('error_msg', 'Lỗi khi cập nhật trạng thái');
                res.redirect('back');
            });
    }
}


module.exports = new BookingController();
