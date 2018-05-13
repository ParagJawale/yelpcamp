var express       = require("express"),
    router        = express.Router({mergeParams: true}),
    Campground    = require("../models/campgrounds"),
    Comment       = require("../models/comment"),
    middleware = require("../middleware");
    


    //=============
    //  COMMENTS ROUTES
    //=============
  router.get("/new",middleware.isLoggedIn, function(req, res) {
        Campground.findById(req.params.id, function(err, campground){
           if(err || !campground){
               console.log(err);
               req.flash("error", "No campground found");
               res.redirect("back");
           }else{
            res.render("comments/new", {campground:campground});    
           }
        });
    });


    //add new comments
    router.post("/", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err || !campground){
            console.log(err);
            req.flash("error", "No campground found");
            res.redirect("/campgrounds");
        } else{
            // create comment
            console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    // add username and id in comments
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground.id);
                }
            })
        }
    })
});

//Comment edit route

router.get("/:comment_id/edit",middleware.checkCommentOwnership , function(req, res){
<<<<<<< HEAD
    Campground.findById(req.params.id, function(err, foundCampground) {
=======
     Campground.findById(req.params.id, function(err, foundCampground) {
>>>>>>> 6c3c71fa205fc31f731c76d00a3c6c4293b7515a
        if(err || !foundCampground){
            req.flash("error", "NO campground found");
            res.redirect("back");
        }
         Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
             res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    });
    });
<<<<<<< HEAD
   
=======
>>>>>>> 6c3c71fa205fc31f731c76d00a3c6c4293b7515a
   
});

//comment update route
router.put("/:comment_id",middleware.checkCommentOwnership , function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success", "Comment Updated");
            res.redirect("/campgrounds/"+ req.params.id);
            console.log(req.body.comment ,  updatedComment);
        }
    });

 });
        
// Destroy Comment
 router.delete("/:comment_id",middleware.checkCommentOwnership , function(req, res){
     // body...
     Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if(err){
             console.log(err);
            res.redirect("back")
             
         }else{
             console.log("comment deleted")
             req.flash("success", "Comment Deleted!!");
             res.redirect("/campgrounds/" + req.params.id);
         }
     });
 });
    
     
     
     module.exports = router;