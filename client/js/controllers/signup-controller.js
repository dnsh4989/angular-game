App.controller('SignupController',function(UserService,$scope,$state){
    $scope.user={};

    $scope.signup=function(){
      $scope.signupError=null;
      if($scope.user.confirmPassword !== $scope.user.password){
          $scope.signupError='Opps! password did not match, type again';
          $scope.user.confirmPassword="";
          return;
      }
      var request_body={"username":$scope.user.username,"email":$scope.user.email,"password":$scope.user.password,"highscore":0};
      UserService.signup(request_body)
      .then(function(response){
             setTimeout(function(){$state.go('login');},3000) ;
            }
           ,function(error){$scope.signupError='An account with same username or email already exist';}
         );
    }
});