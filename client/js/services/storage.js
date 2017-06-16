App.service('Storage',function($window){
  var store = $window.localStorage;
      return{
            getUsername: getUsername,
            setUsername: setUsername,
            remove:remove,
            save:save
      };
    function getUsername() {
      return store.getItem('username');
    }
    function setUsername(username) {
      return store.setItem('username',username);
    }
    function remove(key){
      return store.removeItem(key);
    }
    function save(key,value){
      return store.setItem(key,value);
    }

});