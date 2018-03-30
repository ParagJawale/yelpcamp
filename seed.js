var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment");
    
var data = [
        {
            name: "Clouds rest",
            image: "https://images.unsplash.com/photo-1508978905892-a3b049964046?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b8a617081070dd7e5015a8994b232558&auto=format&fit=crop&w=750&q=80",
            description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of th"
        },
        {
            name: "fallen nights",
            image: "https://images.unsplash.com/photo-1452473767141-7c6086eacf42?ixlib=rb-0.3.5&s=fa02cefc180b843e14076de3ae830062&auto=format&fit=crop&w=1050&q=80",
            description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of th"
        },
        {
            name: "firebase camp",
            image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec456c4aeb71d3aecbe65e586d186ec0&auto=format&fit=crop&w=750&q=80",            
            description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of th"
        }
    ]
    
    
    function seedDB() {
        // body...
        Campground.remove({}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("removed campgrounds");
            }
        });
        
        //add Campgrounds
        data.forEach(function(seed){
          Campground.create(seed, function(err, campground) {
              // body...
              if(err){
                  console.log(err);
              }else
              {
                  console.log("campground added");
                   
                  //create a comments
                  Comment.create(
                      {
                          text:"This place is great,Wish She was with me",
                          author: "Pagu"
                      }, function(err, comment){
                          if(err){
                              console.log(err);
                          }else{
                              campground.comments.push(comment);
                              campground.save();
                              console.log("comments created");
                          }
                      });
              }
          }) ;
        });
    }
    
    
    module.exports = seedDB;