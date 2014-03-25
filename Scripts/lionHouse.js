function lionHouse()
{
    window.removeEventListener("click",OnClickMonkeyHouse,false);

    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("click",OnClickHome,false);

    window.addEventListener("click",OnClickLionHouse,false);
    window.addEventListener("resize", OnResizeLionHouse,false);

    var canvas = document.getElementById('canvas');

    var context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;

    context.fillStyle = " #8FBE00";
    context.fillRect(0, 0, canvas.width, canvas.height);

    displayMenuPicture("Images/welcomeLion.png",749,37,1,3,1,1,0.05,0.05);
    displayMenuPicture("Images/mlion.png",307,284,7,4,1,1,0.01,0.01);
    displayMenuPicture("Images/lion.png",307,284,7,4,7,1,0.01,0.01);


    displayMenuPicture("Images/arrowLeft.png",48,48,20,10,1,10,0.00,0.00);
    displayMenuPicture("Images/letters.jpg",204,247,5,2,2,2,0.05,0.05);
    displayMenuPicture("Images/writing.jpg",212,287,5,2,4,2,0.05,0.05);

}

function OnClickLionHouse(event)
{
    var x=event.pageX;
    var y=event.pageY;
    if(x>=arrowBackToHome.positionOnX && x<=arrowBackToHome.positionOnX+arrowBackToHome.width
        &&y>=arrowBackToHome.positionOnY && y<=arrowBackToHome.positionOnY+arrowBackToHome.height)
    {
        window.removeEventListener("click", OnClickLionHouse,false);
        canvasApp();
        return;
    }
    if(isInside(writingGame,x,y))
    {
        window.location="Games/WritingApp/index.html";
    }
    if(isInside(hooverGame,x,y))
    {
        window.location="Games/hoover_Game/index.html";
    }
}

function OnResizeLionHouse()
{
    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;
    lionHouse();
    return;
}

