
function getID(id) {
	return document.getElementById(id);
}
function getCLASS(clas,num) {
	return document.getElementsByClassName(clas)[num];
}

var canvas = getID('canvas');
var context = canvas.getContext('2d');
var radius = 10;
var dragging = false;
var square = false;
var circle = true;
var circleid = getID('circle');
var squareid = getID('square');
var bin = getID('bin');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


canvas.width = window.innerWidth;
canvas.height = canvas.width/2.5;
window.onresize = function(e){
	var image = context.getImageData(0,0,canvas.width, canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = canvas.width/2.5;
	context.putImageData(image, 0, 0);
}
function changeBorder(size) {
	for(var i=0, n=13; i<n;i++) {
	cur_class = getCLASS('sizer', i);
	cur_class.style.borderRadius = size;
	cur_class.style.MozBorderRadius = size;
	cur_class.style.WebkitBorderRadius = size;
	}
}

function clearCanvas() {
	canvas.width = canvas.width;
}

function setSquare(e){
	square = true;
	circle = false;
	changeBorder('0px');

	var shape = e.target;
	var active = getCLASS('active3',0);
	if(active){
		active.className = 'shape';
	}
	shape.className += ' active3';
}
function setCircle(e){
	circle = true;
	square - false;
		changeBorder('30px');
	var shape = e.target;
	var active = getCLASS('active3',0);
	if(active){
		active.className = 'shape';
	}
	shape.className += ' active3';
}


var putShape = function(e){

	if(dragging) {
		if(circle) {
			context.lineWidth = radius;
			context.lineTo(e.clientX, e.clientY);
			context.stroke();
			context.beginPath();
			context.arc(e.clientX, e.clientY, radius/2, 0, Math.PI*2);
			context.fill();
			context.beginPath();
			context.moveTo(e.clientX, e.clientY);
		} else if(square) {
			context.lineWidth = radius;
		    context.fill();
			context.lineTo(e.clientX, e.clientY);
			context.stroke();
			context.beginPath();
		    context.rect(e.clientX - radius/2, e.clientY - radius/2, radius, radius);
			context.fill();
			context.beginPath();
			context.moveTo(e.clientX, e.clientY);

		}
	}
}

var engage = function(e) {
	dragging = true;
	putShape(e);

}
var disengage = function() {
	dragging = false;
	context.beginPath();

}

bin.addEventListener('click', clearCanvas);
squareid.addEventListener('click', setSquare);
circleid.addEventListener('click', setCircle);
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putShape);
canvas.addEventListener('mouseup', disengage);
window.addEventListener ("mousein", engage);
//canvas.addEventListener ("mouseout", engage);