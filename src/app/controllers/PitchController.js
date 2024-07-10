const Pitch = require('../models/Pitch');

const {MongooseToObject} = require('../../util/mongoose')

class  PitchController {
    //[GET] /
   
    show(req, res,next) {
    //  Pitch.findOne({slug: req.params.slug}).lean()
    //  .then(pitches => 
    //     res.render('pitchs/chitiet',{pitches:MongooseToObject(pitches)})
    //  )
    //  .catch(next);
    // }
    Pitch.findOne({ slug: req.params.slug }).lean()
            .then(pitches => res.render('pitchs/chitiet', { pitches }))
            .catch(next)
}

   // [GET] /pitchs/create
 create(req ,res ,next) {
    res.render('pitchs/create');
 }
    // [POST] /pitchs/store
    store(req, res, next) {
      const pitch = new Pitch(req.body);
      pitch.save()
          .then(() => {
              req.flash('success_msg', 'Tạo sân bóng thành công!');
              res.redirect('/');
          })
          .catch(error => {
              console.error(error);
              req.flash('error_msg', 'Lỗi khi lưu sân bóng');
          });
  }
  
    // [GET] /pitch/:id/edit
    edit(req ,res ,next) {
      Pitch.findById(req.params.id)
      .then(pitch => res.render('pitchs/edit',{
        pitch:MongooseToObject(pitch)
      }))
      .catch(next);
  }
  update(req ,res ,next) {
    Pitch.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            req.flash('success_msg', 'Cập nhật thành công!');
            res.redirect(`/pitch/${req.params.id}/edit`);
        })
        .catch(next);
  }

  delete(req, res, next) {
     Pitch.deleteOne({ _id: req.params.id })
      .then(() => {
           req.flash('success_msg', 'Xóa thành công!');
          res.redirect('/');
      })
      .catch(next);
}

}
module.exports = new PitchController();
