const Pitch = require('../models/Pitch');

const {mutipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    //Get/me/
    storedpitch(req, res,next) {
        Pitch.find({})
        .then(pitchs =>  res.render('me/stored-pitch',{
            pitchs:mutipleMongooseToObject(pitchs)
        }))
        .catch(next);
    }
}
module.exports = new MeController();
