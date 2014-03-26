//var swatches = document.getElementsByClassName('swatch');
var colors = ['black','white', '#009933','#663300', '#0066FF', '#CC0000', '#FFFF00', '#FF66FF', '#9900FF'];

for(var i=0, n=colors.length; i<n;i++) {
	var swatch = document.createElement('div');
	if(colors[i] == 'black') {
		swatch.className = 'sizer active';

	} else {

		swatch.className = 'sizer';

	}
	swatch.style.backgroundColor = colors[i];
	swatch.addEventListener('click', setSwatch);
	getID('colors').appendChild(swatch);
}

function setColor(color) {
	context.fillStyle = color;
	context.strokeStyle = color;
	var active = getCLASS('active',0);
	if(active){
		active.className = 'sizer';
	}
}

function setSwatch(e){
	var swatch = e.target;
	var color = swatch.style.backgroundColor;
	getID('circle').style.backgroundColor = color
	getID('square').style.backgroundColor = color

	for(var i=0, n=4; i<n;i++) {
		var sizecol = getID('sizerid'+i);
		sizecol.style.backgroundColor = color;
	}
	setColor(color);
	swatch.className += ' active';
}


	getID('circle').style.backgroundColor = 'black';
	getID('square').style.backgroundColor = 'black';