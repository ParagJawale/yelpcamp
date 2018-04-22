var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campgrounds"),
    middleware   = require("../middleware");

 //set camground page
    router.get("/", function(req, res) {
        // body...
        //get all campgrounds from db
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
                res.redirect("back");
                alert(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds});        
            }
        });
        
    });

    //add post route for campground
    router.post("/", middleware.isLoggedIn , function(req, res) {
        // body...
        //get dta from form and add data in campground array
        var name    = req.body.name,
            image   = req.body.image,
            des     = req.body.description,
            author  = {
                         id: req.user._id,
                         username: req.user.username
                       },
            newCampground = {name:name, image:image, description:des, author:author};
        
        //add new campground to the db
        Campground.create(newCampground,function(err, newlyCreatedCamp) {
            // body...
            if(err){
                console.log(err);
                req.flash("error", "Something Went Wrong");
                res.redirect("/campgrounds");
            }else{
                //redirect back to campground
                req.flash("success", "Campground added successfully!");
                res.redirect("/campgrounds");                
            }
        });

    
    });
    
    //render the form page for new camp
    router.get("/new",middleware.isLoggedIn, function(req, res) {
        res.render("campgrounds/new");
    });
    
    //show more of campgrounds
    router.get("/:id", function(req, res) {
        //fing campground with provided id
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
            // body...
           if(err || !foundCampground){
                req.flash("error", "Something Went Wrong");
                console.log(err);
                res.redirect("back");
            }else
                {   
                    // console.log(foundCampground);
                     //render show with tht campground
                    res.render("campgrounds/show",{campground: foundCampground});

                }   
        });
    });
    
    //edit campgrounds
    router.get("/:id/edit",middleware.checkCampOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit",{campground: foundCampground});
       });
    });
    
    //update campgrounds
    router.put("/:id",middleware.checkCampOwnership, function(req, res){
        // find and update the correct camgrounds
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
            if(err){
                req.flash("error", "Something Went Wrong");
                res.redirect("/campgrounds");
            }else{
                req.flash("success", "Campground Updated");
                res.redirect("/campgrounds/"+ req.params.id);
            }
        });
        
    });
    //destroy campground
    router.delete("/:id",middleware.checkCampOwnership, function(req, res){
        
    Campground.findByIdAndRemove(req.params.id, function(err) {
        // body...
       if(err){
           req.flash("error", "Something Went Wrong");
           res.redirect("/campgrounds");
       }else{
           req.flash("success", "Campground Deleted!!");
           res.redirect("/campgrounds")
       }
    });
    })
    
     
    module.exports = router;