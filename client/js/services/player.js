App.factory("player", function(board){
	var player = {};
	
	player.sprites = new Image();
	player.sprites.src = "http://localhost:3000/assets/sheet.png";

	player.run = function(){
		var counter = 0;
		var unit = 69.2;
		player.state = "running";
		player.runInterval = setInterval(function(){
			board.backgroundRenderer(board.bgCounter);
			counter = counter +1;
			board.bgCounter = board.bgCounter +1;
			board.ctx.drawImage(player.sprites,((counter-1)*unit)+2.1,3*unit, unit, unit, board.scale*700, board.scale*700, board.scale*150, board.scale*150);
			if( counter == 6 ){
	    		counter = 0;
	    	}
		}, 90);
	};

	player.jump = function(){
		if(player.state == "jumping"){
			return false;
		}
		var counter = 0;
		var unit = 69.2
		if(player.runInterval){
			clearInterval(player.runInterval);
		}
		player.state = "jumping";
		player.jumpInterval = setInterval(function(){
			board.backgroundRenderer(board.bgCounter);
			counter = counter +1;
			board.bgCounter = board.bgCounter +1;
			if(counter < 21){
				board.ctx.drawImage(player.sprites,(5*unit)+2.1,4*unit, unit, unit, board.scale*700, board.scale*(700-(counter*15)), board.scale*150, board.scale*150);
			}else if( counter >= 21 && counter < 33 ){
	    		board.ctx.drawImage(player.sprites,(0*unit)+2.1,5*unit, unit, unit, board.scale*700, board.scale*(700-((30-counter)*15)), board.scale*150, board.scale*150);
	    	}else if(counter == 33){
	    		counter =0;
	    		clearInterval(player.jumpInterval);
	    		player.run();
	    	}
		}, 50);
	};

	return player;
});