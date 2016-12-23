var express = require("express");
var app = express();

app.use(express.static("./client"));
app.use(express.static("./node_modules"));

app.use(require("body-parser").json());

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/survey-test1-app");
mongoose.Promise = global.Promise;


var userSchema = new mongoose.Schema({ username: {type:String, unique: true, required: true}}, {timestamps: true});
mongoose.model("User", userSchema);
var User = mongoose.model("User");

app.get("/users/:username", function(req, res){
  User.findOne({username: req.params.username}, function(err, user){
    console.log(user);
    res.json({ user: user});
  });
});

app.post("/users", function(req, res){{

  var user = new User ({username : req.body.username});

  user.save(function(error){
    if(error){res.json({error:error})}

    res.json({ user:user });

  });



  }

});

app.listen(8000, function() {
  console.log("Listening on 8000")
})
