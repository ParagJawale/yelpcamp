var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    username:String,
<<<<<<< HEAD
    password:String,
    isAdmin: {type:Boolean, default: false}
=======
    password:String
>>>>>>> 6c3c71fa205fc31f731c76d00a3c6c4293b7515a
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);