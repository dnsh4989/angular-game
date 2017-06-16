App.controller('LogoutController',function(UserService,$scope,$state, $window, simulator){
  $scope.user = {
  	"username": $window.localStorage.getItem('username')
  };

  $scope.logout=function(){
    UserService.logout();
    simulator.reset();
    $state.go('index');
  }

});