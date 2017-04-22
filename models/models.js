var mongoose = require('mongoose');
// var findOrCreate = require('mongoose-findorcreate');

// Create a connect.js inside the models/ directory that
// exports your MongoDB URI!
var connect = process.env.MONGODB_URI || require('./connect');

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

// Create all of your models/schemas here, as properties.

var ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  owner: String,
  email: String
});

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  phone: String,
  facebookId: String
});
// UserSchema.plugin(findOrCreate);

var MessageSchema = new mongoose.Schema({
  created: Date,
  content: String,
  user: String,
  contact: String,
  status: String,
  from: String,
  timeToSend: Date,
  channel: String
})

UserSchema.statics.findOrCreate = function findOrCreate(profile, cb){
    var user = new this();
    this.findOne({facebookId: profile.id},function(err, result){
        if(!result) {
            user.username = profile.displayName;
            user.facebookId = profile.id;
            user.save(cb);
        } else {
            cb(err,result);
        }
    });
};

module.exports = {
  Contact: mongoose.model('Contact', ContactSchema),
  User: mongoose.model('User', UserSchema),
  Message: mongoose.model('Message', MessageSchema)
}
