$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//Lets save the cell width in a variable for easy control
	var cellWidth = 25;
	var bigCellWidth=0;
	var d;
	var mouse_x;
	var mouse_y;
	var square;
	var squareColor = "blue";
	
	//Lets create the snake now
	var snake_array; //an array of cells to make up the snake
	
	function init()
	{
		create_square();

		mouse_x = 0;
		
		// trigger the paint function every 60ms
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();
	

	//create a square
	function create_square()
	{
		//set the X,Y coorndinates for square to random
		square = {
			x: Math.round(Math.random()*(w-cellWidth)/cellWidth), 
			y: Math.round(Math.random()*(h-cellWidth)/cellWidth), 

			// hard codeing to middle of square
			//x: 10, 
			//y: 10, 
			
		};
		
	}
	
	
	
	
	//Paint the canvas
	function paint()
	{
		//set canvas background to white
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		// black border
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		
		
		
		
		paint_cell2(square.x, square.y);
		
		
		var x_text = "mouse X: " + mouse_x;
		ctx.fillText(x_text, 5, h-20);

		var y_text = "mouse Y:" + mouse_y;
		ctx.fillText (y_text, 5, h-5);
	}
	
	

	// to paint cells
	function paint_cell2(x, y)
	{
		ctx.fillStyle = squareColor;
		ctx.fillRect(x*cellWidth-bigCellWidth, y*cellWidth-bigCellWidth, cellWidth+bigCellWidth*2, cellWidth+bigCellWidth*2);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*cellWidth-bigCellWidth, y*cellWidth-bigCellWidth, cellWidth+bigCellWidth*2, cellWidth+bigCellWidth*2);
	}
	
	
	

	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	//Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		//The snake is now keyboard controllable
	})

		
	
	

	$(document).mousemove(function(e){
		
		var mousePos = getMousePos(canvas, e);
		if(mousePos.x/cellWidth>= square.x && mousePos.x/cellWidth < (square.x + 1) && 
			mousePos.y/cellWidth >= square.y && mousePos.y/cellWidth < (square.y + 1))
		{
			bigCellWidth = 20;
		    squareColor = "red";
		}
		else
		{
			bigCellWidth = 0;
			squareColor = "blue";
		}
        
		mouse_x = mousePos.x;
		mouse_y = mousePos.y;
	})
	
	
	
	
	
})