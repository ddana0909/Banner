function draw()
 {
		var canvas = document.getElementById("canvas");
		if (canvas.getContext)
		{
			var canvasContext = canvas.getContext("2d")
			 canvasContext.fillStyle ="rgb(500,200,0)";
			canvasContext.fillRect (10,10,55,50);
		}

 }