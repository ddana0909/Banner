var random = 1;
var Q
var GuessCount = 0;
var Tries = 0;

function Play()
{
	Q.unpauseGame();
}

function Pause()
{
	Q.pauseGame();
}

function Stop()
{
	Q.pauseGame();
}

function ResetGame()
{
	Q.pauseGame();
}

function Check(canvas,guess) 
{
	Tries++;
	var context = canvas.getContext('2d');
	var letterIncex = 25;
	context.font="14px Georgia";
	context.clearRect(0,0,400,100);
	
    var strGuess = "You Guessed "
	var strNumber = guess
	strGuess.concat(strNumber);
	context.fillText(strGuess, 30, 25);
	context.fillText(guess, 150, 25);

	context.fillText("Tries: ", 30, 50);
	context.fillText(Tries, 150, 50);

	//alert(guess)


    
	if(random==guess)
	  {
		context.fillText("You are correct", 30, 75);
		Pause();
	  }
	  else
	  {
		context.fillText("Wrong Please try again", 30, 75);
	  }

	context.fill();
	context.strokeStyle = 'blue';
	context.stroke();
 

}


window.addEventListener("onClick",function() { // Wait for the window to finish loading
console.log("OnClick??"); 
// this is the end addEventListener
});



window.addEventListener("load",function() { // Wait for the window to finish loading

	var border = 10
	var canvas=document.getElementById("GameStatus");
    var context = canvas.getContext('2d');
	context.font="14px Georgia";
	//var calcLetter = Math.round( random * letterIncex);
    var strMsg = "How Many Can you see?"
	context.clearRect(0,0,400,100);
	context.fillText(strMsg, 30, 50);
	//context.fillStyle="#FF0000";
	//context.fillRect(0,0,500,500);

    Q = window.Q = Quintus()                // Create a new engine instance
    .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI") // Load any needed modules
    .setup("example1")                        // Bind Quintus to the canvas with ID "myGame"
    .controls()                             // Add in default controls (keyboard, buttons)
    .touch();                               // Add in touch support (for the UI)
     
    /*
    ... Actual game code goes here ...
    */

	console.log("Scene"); 


	//////

	Q.Sprite.extend("HoverUpLetters", {
     init: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 3 + Math.floor(Math.random()*5),
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY, letterValue;

        p = p || {};
        p.w = 100;
        p.h = 150;
        p.x = 0
        p.y = 0;
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

	   console.log("Hover step... ");

      var p = this.p;

      var maxCol = 3, collided = false;
      p.hit = false;
      while((collided = this.search(this)) && maxCol > 0) {

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
		   collided.obj.destroy()
        }
        maxCol--;
      }
    }
  });

//////


	Q.Sprite.extend("Ball",{
  init:function(p) {
    this._super(p,{
      asset: "ball.png",
      x: getRandomInt(0, Q.width), 
      y: getRandomInt(0, Q.height - 50),
      vx: 50,
      vy: -40, //vertical acceleration
	  bounceX: 1,
	  bounceY: 1


    }); 

	console.log(this.p.x); 
  },

  step: function(dt) {
    this.p.vy += dt * 9.8;

    
	
	if(this.p.x < 0 + border)
	{
		this.p.bounceX = 1;
	}

	if(this.p.x>Q.width - border)
	{
		this.p.bounceX = -1;
	}

	if(this.p.y < 0 + border)
	{
		this.p.bounceY = 1;
	}

	if(this.p.y>Q.height- border)
	{
		this.p.bounceY = -1;
	}

	this.p.x += this.p.vx * dt * this.p.bounceX;
	
	this.p.y += this.p.vy * dt * this.p.bounceY;
		
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//plays sound when start button is clicked
 function Check1()
 {
	alert("Checking 1");
	console.log("Checking 1"); 
 }

	Q.scene("level1",function(stage) {
  //var ball = stage.insert(new Q.Ball());
  //var ball2 = stage.insert(new Q.Ball());
});



Q.load(["ball.png","Hover.png"],function() {

    var canvas=document.getElementById("example1");
    var context = canvas.getContext('2d');
	var arr = [];
	var nCount = getRandomInt(1, 10);
	random = nCount;
	/*for (var i = 0; i < nCount; i++) 
	{
		var obj = new Q.Ball();
		arr.push(obj);
	}*/

	  var Hover = new Q.HoverUpLetters();
	arr.push(Hover);

	 // Bind the basic inputs to different behaviors of sprite1
    Q.input.on('up',function(e) { 
      Hover.p.y -= 10;
    });

    Q.input.on('down',function(e) { 
       Hover.p.y += 10;
    });

    Q.input.on('left',function(e) {
      Hover.p.x -= 10;
    });

    Q.input.on('right',function(e) {
      Hover.p.x += 10;
    });

    Q.input.on('fire',function(e) {
      Hover.p.x -= 10;
    });

    Q.input.on('action',function(e) {
      Hover.p.x = 50;
      Hover.p.y = 50;
    });

  

	 // Turn on default keyboard controls
    Q.input.keyboardControls();
  
	Q.gameLoop(function(dt) {
   
		Q.clear();
		context.fillStyle="#FF0000";
	context.fillRect(0,0,500,500);
		for (var i = 0; i < nCount; i++) 
		{
		 
		 arr[i].update(dt);
		 
		 arr[i].render(Q.ctx);
		}		
	  });
});


// this is the end addEventListener
});