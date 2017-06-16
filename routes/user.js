var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

exports.updateHighScore = function(req,res){
  var newHighscore = req.body.highscore;
  var username = req.body.username;
  User.update({username:username}, {
      highscore: newHighscore
  }, function(err, affected, resp) {
     console.log(resp);
  });
}

exports.signup=function(req,res){
  var newuser=new User();
  newuser.username=req.body.username;
  newuser.email=req.body.email;
  newuser.password=req.body.password;
  newuser.highscore=req.body.highscore;

  newuser.save(function(err,savedUser){
    if(err){
      res.status(400).send('An account with same username or email already exist');
    }else{
      res.status(201).send({"username":savedUser.username});
    }
  });
}

exports.login=function(req,res,next){
    var email=req.body.email;
    var password=req.body.password;

    User.findOne({email:email}, function(err,user){
      if(user==null){
        res.status(400).end('No account with this email');
      }else{
      req.body.username=user.username;
      console.log(user.highscore);
      user.comparePassword(password,function(err,isMatch){
       if(isMatch && isMatch==true){
         req.body.highscore=user.highscore;
         next();
       }else{
         res.status(400).end('Invalid email or password');
       }
     });
     }
    });
}

exports.getHighScore = function(req,res){

}