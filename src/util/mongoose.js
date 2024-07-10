const { default: mongoose } = require("mongoose");

module.exports = {
  mutipleMongooseToObject:function(mongoose) {
    return mongoose.map(mongoose => mongoose.toObject());
  },
  MongooseToObject:function(mongoose){
    return mongoose ? mongoose.toObject() : mongoose;
  }
};