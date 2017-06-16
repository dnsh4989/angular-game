App.service('UserService',function($http,CONSTANT,Storage){

      this.signup = function(user){
        return $http.post(CONSTANT.API_URL+'/signup',user,{headers:{'Content-Type': 'application/json'}});
      };

      this.login = function(user){
        return $http.post(CONSTANT.API_URL+'/login',user,{headers:{'Content-Type': 'application/json'}});
      };

      this.logout = function(){
         Storage.remove('auth-token');
         Storage.remove('username');
         Storage.remove('loggedIn');
      };
});