App.controller( "LandingController", function($scope, $http, board, player, hurdles, simulator){
	$scope.aspectRatio = 16/9; //Divide it with the width to get the height.

	if( window.innerWidth <= window.innerHeight * board.aspectRatio){
		$("#landingContainer").css("width", window.innerWidth+"px");
		$("#landingContainer").css("height", window.innerWidth/($scope.aspectRatio)+"px");
		$scope.scale = (window.innerWidth / 16)/100;
	}else{
		$("#landingContainer").css("height", window.innerHeight+"px");
		$("#landingContainer").css("width", window.innerHeight*($scope.aspectRatio)+"px");
		$scope.scale = (window.innerHeight / 9)/100;
	}
});