var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
// var comment = new mongoose.Schema({
//     text:String,
//      author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         username: String
//     }
// });
// var campgroundSchema = new mongoose.Schema({
// comments: [comment],
//   name: String,
//   image: String,
//   description: String,
//   author: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         username: String
//     },
//   }, 
//   { usePushEach: true });
    
module.exports = mongoose.model("Campground", campgroundSchema);
