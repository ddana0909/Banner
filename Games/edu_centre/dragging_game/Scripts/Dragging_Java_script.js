 function start()
 {
    var snd = new Audio("Sounds/slide_whistle_up.wav"); // buffers automatically when created
    snd.play();
 }
 function welldone()
 {
    var snd = new Audio("Sounds/applause_y.wav"); // buffers automatically when created
    snd.play();
 }
 function fail()
 {
    var snd = new Audio("Sounds/fail-buzzer-04.wav"); // buffers automatically when created
    snd.play();
 }
 function check()
 {
    var snd = new Audio("Sounds/crank-1.wav"); // buffers automatically when created
    snd.play();
 }





   
      var stage = new Kinetic.Stage({
        container: 'container',
        width: 1000,
        height: 400
      });
      var layer = new Kinetic.Layer();
      var rectX = stage.getWidth() / 2 - 50;
      var rectY = stage.getHeight() / 2 - 25;
		var counter = 0;
		var requiredNo ;

var simpleText = new Kinetic.Text({
        x: 0 ,
        y: 10,
        text: '',
        fontSize: 45,
        fontFamily: 'Calibri',
        fill: 'green'
      });

var checkText = new Kinetic.Text({
        x: 0 ,
        y: 60,
        text: '',
        fontSize: 45,
        fontFamily: 'Calibri',
        fill: 'green'
      });

      var box = new Kinetic.Rect({
        x: rectX,
        y: rectY,
        width: 100,
        height: 50,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

	   var answerBox = new Kinetic.Rect({
        x: 800,
        y: 0,
        width: 200,
        height: 200,
        fill: '#green',
        stroke: 'black',
        strokeWidth: 4,
        draggable: false
      });

      // add cursor styling 
      box.on('mouseover', function()
	  {
        document.body.style.cursor = 'pointer';
      });

      box.on('mouseout', function()
	  {
        document.body.style.cursor = 'default';
      });
			//added dragend event to square 
	  box.on('dragend', function(evt)
		{
			var canvas = layer.getCanvas();
			var context = canvas.getContext('2d');
			context.clearRect(0, 60, 600, 100);
			context.font = '140px Calibri';
			context.fillStyle = 'red';
			
			

			 var theDiv = document.getElementById('container');
			 var mousePos = getMousePos(theDiv, evt);

			//var message="please enter " + requiredNo + " boxes"; 

			//context.fillText( message, 50, 50);

			if (mousePos.x >=800 && mousePos.y <=200)
			{
				//box.setVisible (false);
				counter = counter +1;
				//context.fillText( counter , 50, 50);
				box.setX (500);
				box.setY (200); 
				box.draw(); 
				check();

				
			}

			
      });


	 


function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    //context.clearRect(0, 0, 150, 25);
   // context.font = '40pt Calibri';
   // context.fillStyle = 'black';
    //context.fillText(message, 10, 25);
}



function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    // return relative mouse position
    var mouseX = evt.clientX ;
    var mouseY = evt.clientY ;
    return {
        x:mouseX,
        y:mouseY
    };
}

function Start()
{
	counter = 0;
	var canvas = layer.getCanvas();
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, 449, 250);
	context.font = '40pt Calibri';
	context.fillStyle = 'black';

	requiredNo = Math.floor((Math.random()*10)+1);

	var message="please enter " + requiredNo + " boxes"; 

	//context.fillText( message, 50, 50);
	simpleText.setText (message);
	simpleText.draw();
	start();
	

}

function Check()
{
	var canvas = layer.getCanvas();
	var context = canvas.getContext('2d');
	context.clearRect(0, 155, 170, 100);
	context.font = '40pt Calibri';
	context.fillStyle = 'black';
			
	if (counter == requiredNo )
	{

		//context.fillText( "well done  ", 155, 50);
		checkText.setText ("well done  ");
		checkText.draw();
		welldone();
	}

	else
	{
		//context.fillText( "fail  ", 155, 50);
		checkText.setText ("Oh no try again!!!  ");
		checkText.draw();
		fail();
	}

}

	layer.add(checkText);
	layer.add(simpleText);
	layer.add(answerBox);
	layer.add(box);   
     stage.add(layer);

