App.controller( "GameController", function($scope, $http, board, player, hurdles, simulator){
	$scope.startGame = function(){
		board.init();
		player.run();
		hurdles.run();
		simulator.init();
		simulator.checkGameover();
	};

	$scope.startGame();

	$scope.keyPressed = function($event){
		var code = $event.which || $event.keycode;
		if(code == 32){
			player.jump();
		}
	}
});