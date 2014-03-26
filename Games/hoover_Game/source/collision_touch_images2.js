
function Pause()
{
	Q.pauseGame();
}

function Resume()
{
	Q.unpauseGame();
}

var xBorderTop = 60;
var xBorderBottom = 300;
var yBorderTop = 90;

var alphabet = '*ABCDEFGHIJKLMNOPQRSTUVWXYZ';

window.addEventListener('load',function(e) {

	var border = 10
	var canvas=document.getElementById("GameStatus");
    var context = canvas.getContext('2d');
	context.font="14px Georgia";

    var strMsg = "Can you find the Triangle"
	context.clearRect(0,0,400,100);
	context.fillText(strMsg, 30, 50);



  // Set up a standard Quintus instance with only the 
  // Sprites and Scene module (for the stage support) loaded.
  var Q = window.Q = Quintus().include("Sprites, Scenes, 2D, Input, Touch");


   Q.setup({ width: 960, height: 512 }).touch(Q.SPRITE_ALL);

  // Sprite class for the randomly generated pulsating / rotating shape,
  // The most of the init code isn't particularly useful - it just 
  // generates random convex shapes with anywhere from 3 to 7 points.
  //
  //
Q.Sprite.extend("HoverUpLetters", {
     init: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 3 + Math.floor(Math.random()*5),
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY, letterValue;

        p = p || {};
        p.w = 100;
        p.h = 100;
        p.x = 100
        p.y = 100;
        p.cx = p.w/2;
        p.cy = p.h/2;
        p.type = 1;

        p.dx = 1;
        p.dy = 1;
       

        this._super(p);
		
       this.on("drag");
       this.on("touchEnd");
     },	
		 
	 drag: function(touch) {
       this.p.dragging = true;
       this.p.x = touch.origX + touch.dx;
       this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;

     },

    step: function(dt) {

		if(this.p.over) {
         this.p.scale = 1.2;
       } else {
         this.p.scale = 1.;
       }

      var p = this.p;

    
      var maxCol = 3, collided = false;
      p.hit = false;
      while((collided = this.stage.search(this)) && maxCol > 0) {

        if(collided) {
          p.hit = true;
          this.p.x -= collided.separate[0];
          this.p.y -= collided.separate[1];
		  console.log("Collided = "); 
		  console.log(p.letterValue); 
		   console.log(" + ");
		  //console.log(this.p.letterValue); 
		  console.log(collided.obj.p.letterValue);
		  if(this.p.letterValue == collided.obj.p.letterValue)
			{
		   collided.obj.destroy()

			   var canvas=document.getElementById("GameStatus");
				var context = canvas.getContext('2d');
				context.font="14px Georgia";

				var strMsg = "Well done!"
				context.clearRect(0,0,400,100);
				context.fillText(strMsg, 30, 50);
				Q.pauseGame();
			}
        }
        maxCol--;
      }
    }
  });


  // Sprite class for the randomly generated pulsating / rotating shape,
  // The most of the init code isn't particularly useful - it just 
  // generates random convex shapes with anywhere from 3 to 7 points.
  //
  //
  Q.Sprite.extend("RandomShape", {
     init: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 3 + Math.floor(Math.random()*5),
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY, letterValue;

        p = p || {};

       

		p.w = 100;
        p.h = 100;


        p.x = Math.random()*Q.width;
        p.y = Math.random()*Q.height;
        p.cx = p.w/2;
        p.cy = p.h/2;
        p.type = 1;

        p.dx = 1;
        p.dy = 1;
        p.speed = Math.random() * 20 + 30;
        p.omega = Math.random() * 40 - 20;
        p.scaleOffset = 0;
        p.scaleSpeed = Math.random();
        p.scaleAmount = 0.70 * Math.random();

        this._super(p);
     },		 

    step: function(dt) {
      var p = this.p;

      p.x += p.dx * p.speed * dt;
      p.y += p.dy * p.speed * dt;

      if(p.x < 0) { 
        p.x = 0;
        p.dx = 1;
      } else if(p.x > Q.width - p.w) { 
        p.dx = -1;
        p.x = Q.width - p.w;
      }

      if(p.y < yBorderTop) {
        p.y = yBorderTop;
        p.dy = 1;
      } else if(p.y > Q.height - p.h) {
        p.dy = -1;
        p.y = Q.height - p.h;
      }
	  
      var maxCol = 3, collided = false;
      p.hit = false;
      while((collided = this.stage.search(this)) && maxCol > 0) {

        if(collided) {
          p.hit = true;
          this.p.x -= collided.separate[0];
          this.p.y -= collided.separate[1];
		 // console.log("Collided = "); 
		  //console.log(p.letterValue); 
		   //console.log(" + ");
		  //console.log(this.p.letterValue); 
		  //console.log(collided.obj.p.letterValue);
		  //if(this.p.letterValue == collided.obj.p.letterValue)
		  // this.destroy()
        }
        maxCol--;
      }
    }
  });

    Q.Sprite.extend("Hexagon", {
     init: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 6,
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY, letterValue;

        p = p || {};

        p.points = [];

        var startAmount = 40;



       

		p.points.push([0, 0]);
		p.points.push([40, 50]);
		p.points.push([40, 100]);
		p.points.push([0, 140]);
		p.points.push([-40, 100]);
		p.points.push([-40, 50]);
		

        maxX += 0;
        minX -= 0;
        maxY += 0;
        minY -= 0;

        p.w = maxX - minX;
        p.h = maxY - minY;

	
        for(var i = 0;i < numPoints;i++) {
          p.points[i][0] -= minX + p.w/2;
          p.points[i][1] -= minY + p.h/2;
        }


        p.x = Math.random()*Q.width;
        p.y = Math.random()*Q.height;
        p.cx = p.w/2;
        p.cy = p.h/2;
        p.type = 1;

        p.dx = 1;
        p.dy = 1;
        p.speed = Math.random() * 20 + 30;
        p.omega = Math.random() * 40 - 20;
        p.scaleOffset = 0;
        p.scaleSpeed = Math.random();
        p.scaleAmount = 0.70 * Math.random();

        this._super(p);
     },		 

    step: function(dt) {
      var p = this.p;

      p.x += p.dx * p.speed * dt;
      p.y += p.dy * p.speed * dt;

      if(p.x < xBorderTop ) { 
        p.x = xBorderTop;
        p.dx = 1;
      } else if(p.x > Q.width - p.w) { 
        p.dx = -1;
        p.x = Q.width - p.w;
      }

      if(p.y < yBorderTop) {
        p.y = yBorderTop;
        p.dy = 1;
      } else if(p.y > Q.height - p.h) {
        p.dy = -1;
        p.y = Q.height - p.h;
      }
	  
      var maxCol = 3, collided = false;
      p.hit = false;
      while((collided = this.stage.search(this)) && maxCol > 0) {

        if(collided) {
          p.hit = true;
          this.p.x -= collided.separate[0];
          this.p.y -= collided.separate[1];
		 
        }
        maxCol--;
      }
    }
  });

  Q.Sprite.extend("Square", {
     init: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 4,
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY, letterValue;

        p = p || {};

        p.points = [];

        var startAmount = 40;



		p.points.push([0,0]);
		p.points.push([50,0]);
		p.points.push([50,50]);
		p.points.push([0,50]);

        maxX += 0;
        minX -= 0;
        maxY += 0;
        minY -= 0;

        p.w = 50;//maxX - minX;
        p.h = 50;//maxY - minY;

	
        for(var i = 0;i < numPoints;i++) {
          p.points[i][0] -= minX + p.w/2;
          p.points[i][1] -= minY + p.h/2;
        }


        p.x = Math.random()*Q.width;
        p.y = Math.random()*Q.height;
        p.cx = p.w/2;
        p.cy = p.h/2;
        p.type = 1;

        p.dx = 1;
        p.dy = 1;
        p.speed = Math.random() * 20 + 30;
        p.omega = Math.random() * 40 - 20;
        p.scaleOffset = 0;
        p.scaleSpeed = Math.random();
        p.scaleAmount = 0.70 * Math.random();

        this._super(p);
     },		 

    step: function(dt) {
      var p = this.p;

      p.x += p.dx * p.speed * dt;
      p.y += p.dy * p.speed * dt;

      if(p.x < xBorderTop) { 
        p.x = xBorderTop;
        p.dx = 1;
      } else if(p.x > Q.width - p.w) { 
        p.dx = -1;
        p.x = Q.width - p.w;
      }

      if(p.y < yBorderTop) {
        p.y =yBorderTop;
        p.dy = 1;
      } else if(p.y > Q.height - p.h) {
        p.dy = -1;
        p.y = Q.height - p.h;
      }
	  
      var maxCol = 3, collided = false;
      p.hit = false;
      while((collided = this.stage.search(this)) && maxCol > 0) {

        if(collided) {
          p.hit = true;
          this.p.x -= collided.separate[0];
          this.p.y -= collided.separate[1];
		 
        }
        maxCol--;
      }
    }
  });

  Q.Sprite.extend("Triangle", {
     init: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 3,
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY, letterValue;

        p = p || {};

        p.points = [];

        var startAmount = 40;



       /* for(var i = 0;i < numPoints;i++) {
          curX = Math.floor(Math.cos(angle)*startAmount);
          curY = Math.floor(Math.sin(angle)*startAmount);

          if(curX < minX) minX = curX;
          if(curX > maxX) maxX = curX;

          if(curY < minY) minY = curY;
          if(curY > maxY) maxY = curY;

          p.points.push([curX,curY]);

          startAmount += Math.floor(Math.random()*10);
          angle += (Math.PI * 2) / (numPoints+1);
        };*/

		p.points.push([0,0]);
		p.points.push([40,0]);
		p.points.push([40,50]);

        maxX += 0;
        minX -= 0;
        maxY += 0;
        minY -= 0;

        p.w = maxX - minX;
        p.h = maxY - minY;

	
        for(var i = 0;i < numPoints;i++) {
          p.points[i][0] -= minX + p.w/2;
          p.points[i][1] -= minY + p.h/2;
        }


        p.x = Math.random()*Q.width;
        p.y = Math.random()*Q.height;
        p.cx = p.w/2;
        p.cy = p.h/2;
        p.type = 1;

        p.dx = 1;
        p.dy = 1;
        p.speed = Math.random() * 20 + 30;
        p.omega = Math.random() * 40 - 20;
        p.scaleOffset = 0;
        p.scaleSpeed = Math.random();
        p.scaleAmount = 0.70 * Math.random();

        this._super(p);
     },		 

    step: function(dt) {
      var p = this.p;

      p.x += p.dx * p.speed * dt;
      p.y += p.dy * p.speed * dt;

      if(p.x < xBorderTop) { 
        p.x = xBorderTop;
        p.dx = 1;
      } else if(p.x > Q.width - p.w) { 
        p.dx = -1;
        p.x = Q.width - p.w;
      }

      if(p.y < yBorderTop) {
        p.y = yBorderTop;
        p.dy = 1;
      } else if(p.y > Q.height - p.h) {
        p.dy = -1;
        p.y = Q.height - p.h;
      }
	  
      var maxCol = 3, collided = false;
      p.hit = false;
      while((collided = this.stage.search(this)) && maxCol > 0) {

        if(collided) {
          p.hit = true;
          this.p.x -= collided.separate[0];
          this.p.y -= collided.separate[1];
		 
        }
        maxCol--;
      }
    }
  });

  // Number of shapes to add to the page
  var numShapes = 5;

  // Scene that actually adds shapes onto the stage
  Q.scene("start",new Q.Scene(function(stage) {
    var shapesLeft = numShapes;
    //while(shapesLeft-- > 0) {
		var Square = new Q.Square();
		Square.p.letterValue = "A";

		 Square.draw= function(ctx) {
		  ctx.fillStyle = '#FF0000';
		  ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
		};

		stage.insert(Square);
		//var image = new Image;
		//image.src = "images\\A.png";
		//ShapA.p.asset = image;

		var Triangle = new Q.Triangle();
		Triangle.p.letterValue = "B";
		//ShapB.p.asset = "B.png";
		Triangle.draw= function(ctx) {
		  ctx.fillStyle = '#00FF00';

          ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(40, 0);
		ctx.lineTo(40, 50);
		ctx.closePath();
		ctx.fill();

		  
		};
		stage.insert(Triangle);

		var Hexagon = new Q.Hexagon();
		Hexagon.p.letterValue = "C";
		Hexagon.draw= function(ctx) {
		  ctx.fillStyle = '#0000FF';

          ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(40, 50);
		ctx.lineTo(40, 100);
		ctx.lineTo(0, 140);
		ctx.lineTo(-40, 100);
		ctx.lineTo(-40, 50);
		
		ctx.closePath();
		ctx.fill();
		};

		var ShapC = new Q.RandomShape();
		ShapC.p.letterValue = "D";
		ShapC.p.asset = "D.png";

		var ShapA2 = new Q.RandomShape();
		ShapA2.p.letterValue = "E";
		ShapA2.p.asset = "E.png";

		var Hover = new Q.HoverUpLetters();
		Hover.p.letterValue = "B";
		Hover.p.asset = "Hover.png";




      
	  
	  stage.insert(Hexagon);
	  /*stage.insert(ShapB);
	  stage.insert(ShapC);*/
	  stage.insert(Hover);

	 // Bind the basic inputs to different behaviors of sprite1
    Q.input.on('up',stage,function(e) { 
      
	  if(Hover.p.y > 90)
			Hover.p.y -= 10;

	  console.log(Hover.p.y);
    });

    Q.input.on('down',stage,function(e) { 
      if(Hover.p.y < 310)
	   Hover.p.y += 10;
	  // console.log(Hover.p.y);
    });

    Q.input.on('left',stage,function(e) {
		if(Hover.p.x > 60)
			Hover.p.x -= 10;
	 // console.log(Hover.p.x);
    });

    Q.input.on('right',stage,function(e) {
      if(Hover.p.x < 750)
	  Hover.p.x += 10;
	  //console.log(Hover.p.x);
    });

    Q.input.on('fire',stage,function(e) {
      Hover.p.x -= 10;
    });

    Q.input.on('action',stage,function(e) {
      Hover.p.x = 50;
      Hover.p.y = 50;
    });

	 // stage.insert(new Q.RandomShape().setValue({ letterValue: "B" }));
	  //stage.insert(new Q.RandomShape().setValue({ letterValue: "C" }));
	 // stage.insert(new Q.RandomShape().setValue({ letterValue: "A" }));
	 // stage.insert(new Q.RandomShape().setValue({ letterValue: "A" }));
    //}
  }));

  Q.load(["Hover.png","A.png","B.png","C.png","D.png","E.png"]);

  // Finally call `stageScene` to start the show
  Q.stageScene("start");

  // Turn on default keyboard controls
    Q.input.keyboardControls();

  // Render the elements
  // Turning Q.debug and Q.debugFill on will render
  // the sprites' collision meshes, which is all we want
  // in this situation, otherwise nothing would get rendered
 // Q.debug = true;
  //Q.debugFill = true;

  var currentObj = null;

   Q.el.addEventListener('mousemove',function(e) {
    var x = e.offsetX || e.layerX,
        y = e.offsetY || e.layerY,
        stage = Q.stage();

	// Use the helper methods from the Input Module on Q to
    // translate from canvas to stage
    var stageX = Q.canvasToStageX(x, stage),
        stageY = Q.canvasToStageY(y, stage);

    // Find the first object at that position on the stage
    var obj = stage.locate(stageX,stageY);

    
    // Set a `hit` property so the step method for the 
    // sprite can handle scale appropriately
    if(currentObj) { currentObj.p.over = false; }
    if(obj) {
      currentObj = obj;
      obj.p.over = true;
    }
  });

  // ## Possible Experimentations:
  // 
  // 1. Try staging the `start` scene on multiple stages (e.g. add Q.stageScene("start",1)), notice
  //    the shapes only collide with other shapes on their own stage
  // 2. Add in a check to the draw method that looks at the currently active stage
  //    (stored in Q.activeStage) to determine the color of the shapes
  // 3. Using the collision.normalX and collision.normalY values of each collision, adjust the
  //    velocity of colliding shapes to bounce off each other more normally
  // 4. Turn this into a game of asteroids.


});
