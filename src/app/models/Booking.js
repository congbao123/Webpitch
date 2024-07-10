 const { create } = require('express-handlebars');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    pitch: { type: String, required: true },
    phone: { type: String, required: true }, 
    user: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' } // Trạng thái của đơn đặt
});

module.exports = mongoose.model('Booking', BookingSchema);
