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
    displayMenuPicture("Images/DragBoxes.jpg",286,340,4 ,3,1,2,0.05,0.05);
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
    if(x>=countingGame.positionOnX && x<=countingGame.positionOnX+countingGame.width
        &&y>=countingGame.positionOnY && y<=countingGame.positionOnY+countingGame.height)
    {
        /* this is the file path to where the game is */
        window.location="../Games/edu_centre/dragging_game/DrageNdropK2.html"
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

