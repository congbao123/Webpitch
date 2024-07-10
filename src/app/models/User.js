const { create } = require('express-handlebars');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name:{type:String,required:true},
    email:{type:String,},
    password:{type:String, required:true},
    admin:{
      type:Boolean,
      default:false,
    }
  },
    { 
      timestamps:true, 
    });

  module.exports = mongoose.model('User',User);