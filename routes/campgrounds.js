var express         = require("express"),
    router          = express.Router(),
    Campground      = require("../models/campgrounds"),
    middleware   = require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
    var options = {
                      provider: 'google',
                      httpAdapter: 'https',
                      apiKey: process.env.GEOCODER_API_KEY,
                      formatter: null
                };
 
var geocoder = NodeGeocoder(options);

 //set camground page
    router.get("/", function(req, res) {
        var noMatch = null;
        //get all campgrounds from db
    if (req.query.search) {
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name:regex},function(err,allCampgrounds){
            if(err){
                console.log(err);
                res.redirect("back");
                alert(err);
            }else{
                if(allCampgrounds.length < 1){
                    noMatch = "No Campground Match That Query,Try again!";
                }
                res.render("campgrounds/index",{campgrounds:allCampgrounds, page: 'campgrounds',noMatch: noMatch});        
            }
        });
        
        } else {
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
                res.redirect("back");
                alert(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds, page: 'campgrounds',noMatch: noMatch});        
            }
        });
        }
    });

    //add post route for campground
   //CREATE - add new campground to DB
        router.post("/", middleware.isLoggedIn, function(req, res){
          // get data from form and add to campgrounds array
          var name = req.body.name;
          var image = req.body.image;
          var desc = req.body.description;
          var author = {
              id: req.user._id,
              username: req.user.username
          }
          geocoder.geocode(req.body.location, function (err, data) {
            if (err || !data.length) {
              req.flash('error', 'Invalid address');
              return res.redirect('back');
            }
            var lat = data[0].latitude;
            var lng = data[0].longitude;
            var location = data[0].formattedAddress;
            var newCampground = {name: name, image: image, description: desc, author:author, location: location, lat: lat, lng: lng};
            // Create a new campground and save to DB
            Campground.create(newCampground, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to campgrounds page
                    console.log(newlyCreated);
                    res.redirect("/campgrounds");
                }
            });
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
<<<<<<< HEAD
            if(err || !foundCampground){
=======
           if(err || !foundCampground){
>>>>>>> 6c3c71fa205fc31f731c76d00a3c6c4293b7515a
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
   // UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
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
    
    function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
     
    module.exports = router;