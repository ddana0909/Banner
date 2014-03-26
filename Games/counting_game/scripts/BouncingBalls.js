var random = 1;
var Q
var GuessCount = 0;
var Tries = 0;

function Play()
{
	Q.unpauseGame();
	var snd = new Audio("Sounds/how_many_are_moving.wav"); // buffers automatically when created
    snd.play();
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
		if (guess == 1)
		{var snd = new Audio("Sounds/1.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 2)
		{var snd = new Audio("Sounds/2.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 3)
		{var snd = new Audio("Sounds/3.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 4)
		{var snd = new Audio("Sounds/4.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 5)
		{var snd = new Audio("Sounds/5.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 6)
		{var snd = new Audio("Sounds/6.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 7)
		{var snd = new Audio("Sounds/7.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 8)
		{var snd = new Audio("Sounds/8.wav"); // buffers automatically when created
    snd.play();
		}
		if (guess == 9)
		{var snd = new Audio("Sounds/9.wav"); // buffers automatically when created
    snd.play();
		}if (guess == 10)
		{var snd = new Audio("Sounds/10.wav"); // buffers automatically when created
    snd.play();
		}
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
		var snd = new Audio("Sounds/Good_Job.wav"); // buffers automatically when created
    snd.play();
	  }
	  else
	  {
		context.fillText("Wrong Please try again", 30, 75);
		var snd = new Audio("Sounds/O_NO.wav"); // buffers automatically when created
    snd.play();
		
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



Q.load(["ball.png"],function() {

    var canvas=document.getElementById("example1");
    var context = canvas.getContext('2d');
	var arr = [];
	var nCount = getRandomInt(1, 10);
	random = nCount;
	for (var i = 0; i < nCount; i++) 
	{
		var obj = new Q.Ball();
		arr.push(obj);
	}
  
	Q.gameLoop(function(dt) {
   
		Q.clear();
		context.fillStyle="rgba(0, 0, 200, 0.5)";
	context.fillRect(0,0,500,500);
		for (var i = 0; i < nCount; i++) 
		{
		 
		 arr[i].update(dt);
		 
		 arr[i].render(Q.ctx);
		}		
	  });
	   function updateScore(score)
{
    $.ajax({
        type: "POST",
        url: 'counting_game/scripts/score.php',
        data: {score: score}

    });
}
});


// this is the end addEventListener
});