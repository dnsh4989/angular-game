App.factory("hurdles", function(board){
	var hurdles = {};

	hurdles.create = function(){
		hurdles.image = new Image();
		hurdles.image.src = "http://localhost:3000/assets/joker.gif";
		hurdles.image.id = "villain";

		$(".canvasContainer").append(hurdles.image);

		$("#villain").css({
			"position": "absolute",
		    "width": (board.scale*100)+"px",
		    "right": ( -200 )+"px",
		    "top": (board.canvas.height - 1.6*(board.scale*100))+"px"
		});
	};

	hurdles.run = function(){
		hurdles.create();

		var counter = 0;
		hurdles.hurdleCounter = setInterval(function(){
			if( parseInt($("#villain").css("right").split("px")[0]) >  ((board.canvas.width) +200) ){
				$("#villain").remove();
				clearInterval(hurdles.hurdleCounter);
				hurdles.run();
				return false;
			}
			counter = counter + 1;
			$("#villain").css("right", ( parseInt($("#villain").css("right").split("px")[0]) + counter )+"px");
		}, 100);
	}

	return hurdles;
});