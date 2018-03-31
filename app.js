var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    Campground            = require("./models/campgrounds"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user"),
    seedDB                = require("./seed");

var campgroundsRoutes    = require("./routes/campgrounds"),
    commentsRoutes       = require("./routes/comments"),
    indexRoutes           = require("./routes/index")
    
    // seedDB();  //Seed the database 
    
    // connect to the database
    console.log(process.env.DATABASEURL);
    mongoose.connect(process.env.DATABASEURL);
    // mongoose.connect("mongodb://localhost/yelp_camp_v9");
    
    //install body parser
    app.use(bodyParser.urlencoded({extended:true}));
    //set view engine to ejs
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    app.use(methodOverride("_method"));
    app.use(flash());
    
    //PASSPORT CONFIGURATION
    app.use(require("express-session")({
        secret:"Once again Jimmy is cute",
        resave:false,
        saveUninitialized:false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        res.locals.error     = req.flash("error");
        res.locals.success     = req.flash("success");
        next();
    });
    
    app.use("/",indexRoutes);
    app.use("/campgrounds",campgroundsRoutes);
    app.use("/campgrounds/:id/comments",commentsRoutes);
   
//start the server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER HAS STARTED"); 
});