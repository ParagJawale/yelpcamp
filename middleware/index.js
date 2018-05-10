var Campground       = require("../models/campgrounds");
var Comment          = require("../models/comment");
var middlewareObj    = {};


middlewareObj.checkCampOwnership =  function(req, res, next){
        
             if(req.isAuthenticated()){
     
               Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
              req.flash("error", "No Campground found");
              res.redirect("back");
        
           } else {
               //does user own the campground
               if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    
                    next();
               
                   
               } else {
                   req.flash("error", "You dont have permission to do that");
                   res.redirect("back");
               }
              
           }
       });
            
        }else{
            req.flash("error", "You need to log in first");
            res.redirect("back");
        
            
        }
     }
     
    
middlewareObj.checkCommentOwnership =  function(req, res, next){
                  if(req.isAuthenticated()){
                    
                    Comment.findById(req.params.comment_id, function(err, foundComment){
                  
                   if(err || !foundComment){
                       req.flash("error", "Comment not found");
                      res.redirect("back");
                
                   } else {
                       //does user own the campground
                       if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                            
                            next();
                       
                           
                       } else {
                           req.flash("error", "You dont have permission to do that");
                           res.redirect("back");
                       }
                      
                   }
                   });
                        
                    }else{
                        req.flash("error", "You need to log in first");
                        res.redirect("back");
                    
                        
                    }
                 }


middlewareObj.isLoggedIn =  function(req, res, next) {
         // body...
         if(req.isAuthenticated()){
             return next();
         }
        req.flash("error", "Log in first");
         res.redirect("/login");
     }
     


module.exports = middlewareObj;