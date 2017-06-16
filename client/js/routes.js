App.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
});

App.run(function($rootScope,AuthService,$state){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
       if(toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()){
           event.preventDefault();
           $state.transitionTo('login');
        }
    });
});

App.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/views/landingPage.html',
            controller : "LandingController"
        })
        .state('login', {
            url: '/login',
            templateUrl : "/views/login.html",
            controller : "LoginController"
        })
        .state('signup', {
            url: '/signup',
            templateUrl : "/views/signup.html",
            controller : "SignupController"
        })
        .state('play', {
            url: '/play',
            templateUrl : "/views/play.html",
            controller : "GameController",
            authenticate: true
        });
});