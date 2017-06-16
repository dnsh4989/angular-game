App.factory("simulator", function(board, hurdles, player, $http, $window){
	var simulator = {};

	simulator.init = function(){
		simulator.scoreElm = document.createElement('div');

		simulator.scoreElm.id = 'scoreDiv';

		$(".mainContainer").append(simulator.scoreElm);

		$("#scoreDiv").css({
			"position": "absolute",
		    "right": "350px",
		    "top": "10px",
		    "color": "white"
		});


		simulator.highScoreElm = document.createElement('div');

		simulator.highScoreElm.id = 'highScoreDiv';

		$(".mainContainer").append(simulator.highScoreElm);

		$("#highScoreDiv").css({
			"position": "absolute",
		    "left": "775px",
		    "top": "10px",
		    "color": "white"
		});

		simulator.highscore = $window.localStorage.getItem('highscore');
		$("#highScoreDiv").html("High Score: "+(simulator.highscore));
		//$("#highScoreDiv").hide();

		simulator.score = 0;


		$("#highScoreDiv").show();
		$("#scoreDiv").show();
		$("#playAgain").hide();
	}	

	simulator.checkGameover = function(){
		var counter = 0;
		simulator.gameoverInterval = setInterval(function(){
			var hurdlePosition = parseInt($(hurdles.image).css("right").split("px")[0]);
			var playerPosition = ( board.canvas.width - board.scale*150)/2;
			counter = counter + 1;
			if(counter%20 == 0){
				simulator.score = simulator.score +1;
				$("#scoreDiv").html("Score: "+(simulator.score));
			}
			if( hurdlePosition > playerPosition && hurdlePosition < playerPosition + board.scale*150 ){
				if( player.state == "jumping" ){
					return true;
				}else if( player.state == "running" ){
					simulator.reset();
					return false;
				}
			}
		}, 50);
	};

	simulator.reset = function(){
		if( simulator.score > $window.localStorage.getItem('highscore') ){
			simulator.updateHighscore();
		}
		
		clearInterval(simulator.gameoverInterval);
		clearInterval(player.runInterval);
		clearInterval(hurdles.hurdleCounter);
		$("#villain").remove();
	    $("#scoreDiv").remove();
	    $("#highScoreDiv").remove();
		board.ctx.clearRect(0, 0, board.canvas.width, board.canvas.height);
		board.ctx.fillStyle = "white";
		board.ctx.font="30px Arial";
		board.ctx.fillText("GAME OVER, Your Score is : "+simulator.score,board.canvas.width/5,board.canvas.height/2);
		$("#playAgain").show();
	}

	simulator.updateHighscore = function(){
		var user = {};
		user.username = $window.localStorage.getItem('username');
		user.highscore = simulator.score;
		$window.localStorage.setItem('highscore', user.highscore);
		$("#highScoreDiv").html("High Score: "+(simulator.highscore));
		$http.put("http://localhost:3000/setHighScore", user, {headers:{'Content-Type': 'application/json'}})
			.then(function(user){
				console.log("High Score updated..");
				//console.log(user);
			}, function(error){
				console.log(error);
			});
	}

	return simulator;
});