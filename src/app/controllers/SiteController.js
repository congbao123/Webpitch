const Pitch = require('../models/Pitch');

const {mutipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    //[GET] /
    index = async (req, res, next) => {
        try {
            const pitchs = await Pitch.find({});
            res.render('home', { pitchs: mutipleMongooseToObject(pitchs), user: req.session.user });
        } catch (err) {
            console.error(err); // Ghi lại lỗi để kiểm tra
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    //[GET] /news/:slug(slug=biến động)
    search(req, res) {
        res.send('search');
    }
}
module.exports = new SiteController();
