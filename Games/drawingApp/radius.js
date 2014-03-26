// var minRad = 0.5,
// 	interval = 1,
// 	maxRad = 100,
// 	defaultRad = 20,
// 	radSpan = document.getElementById('radval'),
// 	decRad = document.getElementById('decrad'),
// 	incRad = document.getElementById('incrad');

// var setRadius = function(newRadius){
// 	if(newRadius<minRad)
// 		newRadius = minRad;
// 	else if(newRadius>maxRad)
// 		newRadius=maxRad;
// 	radius = newRadius;
// 	context.lineWidth = radius*2;
// 	radSpan.innerHTML = radius;
// }


// decRad.addEventListener('click', function(){
// 	setRadius(radius-interval);
// });
// incRad.addEventListener('click', function(){
// 	setRadius(radius+interval);
// });

// setRadius(defaultRad);


var size = [40,30,20,10];

for(var i=0, n=size.length; i<n;i++) {
	var sizer = document.createElement('div');

	if(size[i] == 40) {
		sizer.className = 'sizer active2';
	} else {
		sizer.className = 'sizer';
	}

	sizer.id = 'sizerid'+i;
	sizer.style.height = size[i]+'px';
	sizer.style.width = size[i]+'px';
	sizer.innerHTML = size[i];
	sizer.style.backgroundColor = 'black';
	sizer.addEventListener('click', setSizer);
	getID('rad').appendChild(sizer);
}

var setRadius = function(newRadius){
	radius = newRadius;
	context.lineWidth = radius;
	var active = getCLASS('active2',0);
	if(active){
		active.className = 'sizer';
	}
}

function setSizer(e){

	var sizer = e.target;
	setRadius(sizer.innerHTML);
	sizer.className += ' active2';

}
setRadius(20);
getID('sizerid2').className = 'sizer active2';
