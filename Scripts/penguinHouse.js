//<reference path="dragging_game/Scripts/Dragging_Java_script.js"/>
function penguinHouse()
{
    window.removeEventListener("click",OnClickMonkeyHouse,false);
    window.removeEventListener("click",OnClickLionHouse,false);
    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("click",OnClickHome,false);


    window.addEventListener("click",OnClickPenguinHouse,false);
    window.addEventListener("resize", OnResizePenguinHouse,false);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;

    context.fillStyle = "#00A8C6";
    context.fillRect(0, 0, canvas.width, canvas.height);

    displayMenuPicture("Images/welcomePenguin.png",739,37,1,5,1,1,0.05,0.05);
    displayMenuPicture("Images/penguin.png",142,228,8,4,1,1,0.05,0.01);
    displayMenuPicture("Images/penguin.png",142,228,8,4,8,1,0.05,0.01);

    displayMenuPicture("Images/DragBoxes.jpg",286,340,4 ,3,1,2,0.05,0.05);
    displayMenuPicture("Images/shapes.jpg",344,242,4,3,2,2,0.05,0.05);
    displayMenuPicture("Images/counting.jpg",369,277,4,3,3,2,0.05,0.05);
    displayMenuPicture("Images/memory.jpg",298,192,4,3,4,2,0.05,0.05);
    displayMenuPicture("Images/arrowLeft.png",48,48,20,10,1,10,0.00,0.00);

}

function OnClickPenguinHouse(event)
{
    var x=event.pageX;
    var y=event.pageY;
    if(x>=arrowBackToHome.positionOnX && x<=arrowBackToHome.positionOnX+arrowBackToHome.width
       &&y>=arrowBackToHome.positionOnY && y<=arrowBackToHome.positionOnY+arrowBackToHome.height)
    {
        window.removeEventListener("click", OnClickPenguinHouse);
        canvasApp();
    }

    if(isInside(draggingGame,x,y))
    {
        window.location="Games/dragging_game/index.html";
    }

    if(isInside(memoryGame,x,y))
    {
        window.location="Games/SmartFunMemory/index.html";

    }
    if(isInside(countingGame,x,y))
    {
        window.location="Games/counting_game/index.html";
    }
    if(isInside(shapesGame,x,y))
    {
        window.removeEventListener("click",OnClickPenguinHouse,false);
        window.removeEventListener("resize", OnClickPenguinHouse,false);
        shapeGame("canvas");
        return;
    }
}
function OnResizePenguinHouse()
{
    var canvas= document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;
    penguinHouse();
    return;
}

