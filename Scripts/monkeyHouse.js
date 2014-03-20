//<reference path="scripts/basic.js"/>
//<reference path="scripts/shapeGame.js"/>

function monkeyHouse()
{

    window.addEventListener("click",OnClickMonkeyHouse,false);
    window.addEventListener("resize", OnResizeMonkeyHouse,false);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;

    context.clearRect(0,0,canvas.width, canvas.height);

    context.fillStyle = "#ff0000";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    displayMenuPicture("Images/welcomeMonkey.png",387,111,3,3,1,1,0.05,0.05);
    displayMenuPicture("Images/shapes.jpg",1722,1210,4 ,3,1,2,0.05,0.05);
    displayMenuPicture("Images/arrowLeft.png",48,48,20,10,1,10,0.00,0.00);


}

function OnClickMonkeyHouse(event)
{

    window.removeEventListener("click",OnClickLionHouse,false);
    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("click",OnClickHome,false);

    var x=event.pageX;
    var y=event.pageY;
    if(x>=arrowBackToHome.positionOnX && x<=arrowBackToHome.positionOnX+arrowBackToHome.width
        &&y>=arrowBackToHome.positionOnY && y<=arrowBackToHome.positionOnY+arrowBackToHome.height)
    {
        window.removeEventListener("click", OnClickMonkeyHouse,false);
        canvasApp();
        return;
    }
    if(x>=shapesGame.positionOnX && x<=shapesGame.positionOnX+shapesGame.width
        &&y>=shapesGame.positionOnY && y<=shapesGame.positionOnY+shapesGame.height)
    {
        window.removeEventListener("click",OnClickMonkeyHouse,false);
        window.removeEventListener("resize", OnClickMonkeyHouse,false);
        shapeGame("canvas");
        return;
    }
}
function OnResizeMonkeyHouse()
{
    var canvas=document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;
    monkeyHouse();
    return;
}