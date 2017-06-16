App.factory("board", function(){
	var board = {};

	board.init = function(){

		board.canvas = document.getElementById("gameBoard");
		board.ctx = board.canvas.getContext("2d");

		board.background = new Image();
		board.background.src = "http://localhost:3000/assets/bg1.jpg";

		board.bgCounter = 1;

		board.adjustAspectRatio();

		$(".canvasContainer").css({
			"width":board.canvas.width,
			"height":board.canvas.height
		});

		$(board.canvas).focus();
	};

	board.adjustAspectRatio = function(){
		board.aspectRatio = 16/9; //Divide it with the width to get the height.

		if( window.innerWidth <= window.innerHeight * board.aspectRatio){
			board.canvas.width = window.innerWidth;
			board.canvas.height = window.innerWidth / board.aspectRatio;
			board.scale = (window.innerWidth / 16)/100;
		}else{
			board.canvas.height = window.innerHeight;
			board.canvas.width = window.innerHeight * board.aspectRatio;
			board.scale = (window.innerHeight / 9)/100;
		}
	}

	board.backgroundRenderer = function(bgCounter){
		var rendererNumber = parseInt(bgCounter/board.canvas.width);
		board.ctx.drawImage(board.background, 0, 0, 1600, 800, ((rendererNumber+1)*board.canvas.width)-bgCounter, 0, board.canvas.width, board.canvas.height);
		board.ctx.drawImage(board.background, 0, 0, 1600, 800, (rendererNumber*(board.canvas.width))-bgCounter, 0, board.canvas.width, board.canvas.height);
	};

	return board;
});