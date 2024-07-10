 const { create } = require('express-handlebars');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-updater');
 mongoose.plugin(slug);

const Pitch = new Schema({
    name:{type:String,required:true},
    describe:{type:String,},
    image:{type:String, required:true},
    price:{type:String, required:true},
    slug:{type:String, slug:'name',unique: true },
  },
    { 
      timestamps:true, 
    });

  module.exports = mongoose.model('Pitch',Pitch);