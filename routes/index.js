var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    middleware = require("../middleware");


 //set homepage root route
    router.get("/", function(req, res){
       res.render("landing");
    });
    
   
    //============
    //AUTH ROUTES
    //============
    
    //sign up form
    router.get("/register", function(req, res) {
        res.render("register");
    });
    
    //handle sign up logic
    router.post("/register", function(req, res) {
        var newUser = new User({username: req.body.username})
        User.register(newUser,req.body.password, function(err, user) {
            // body...
            if(err){
                console.log(err);
                req.flash("error", err.message);
                res.redirect("register");
            }
            passport.authenticate("local")(req,res, function(){
                res.redirect("/campgrounds");
            });
        });
    });
    
    //signIn form
    router.get("/login", function(req, res) {
        res.render("login");
    });
    
    //handling Login Logic
    router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req, res){
    
    });
    
    //Logout logic route
    router.get("/logout", function(req, res) {
        req.logout();
        req.flash("success", "Logged you out");
        res.redirect("/campgrounds")
    });
     
     module.exports = router;