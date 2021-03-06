//<reference path="scripts/engine.js"/>

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function initTouch()
{
    document.addEventListener('touchstart', touchHandler, true);
    document.addEventListener('touchmove', touchHandler, true);
    document.addEventListener('touchend', touchHandler, true);
    document.addEventListener('touchcancel', touchHandler, true);
    return;
}

function removeTouch()
{
    document.removeEventListener('touchstart', touchHandler, true);
    document.removeEventListener('touchmove', touchHandler, true);
    document.removeEventListener('touchend', touchHandler, true);
    document.removeEventListener('touchcancel', touchHandler, true);
    return;
}

function OnResize()
{   snd.pause();
    canvasInit("canvas", canvasAspectRatio);
    clearArray(shapeMenu);
    clearArray(shapeModel);
    shapeGame("canvas");
    return;
}
var canvasAspectRatio=2;
var draggedShape;
var shapeMenu = [];
var shapeModel = [];
var score=0;
var scoreIncreaseAmount=20;

var targetX;
var targetY;
var easeAmount = 0.45;
var hit = false;
var mouseX;
var mouseY;
var dragHoldX;
var dragHoldY;
var matchingAttempts;
var timer;
var snd;
var prevRand =0;

var shapeSounds=[];

function initShapeSounds()
{
    var square = new Audio("Games/shapeGame/sounds/square.wav");
    var circle = new Audio("Games/shapeGame/sounds/circle.wav");
    var triangle = new Audio("Games/shapeGame/sounds/triangle.wav");
    var vRect= new Audio("Games/shapeGame/sounds/rectangle.wav");
    var rect=new Audio("Games/shapeGame/sounds/rectangle.wav");

    shapeSounds.push(square,circle,triangle,vRect,rect);


}

function initShapeMenu(shapeMenu, canvasName) {
    clearArray(shapeMenu);

    var settings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 60, 60, 4, 7);
    var square = new Square(canvasName, settings.width, settings.height, settings.positionOnX, settings.positionOnY, "black", "#A25EA6");
    shapeMenu.push(square);

    var cSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 60, 60, 6, 7);
    var circle = new Circle(canvasName, cSettings.positionOnX + cSettings.width / 2, cSettings.positionOnY + cSettings.width / 2, cSettings.width / 2, "black", "#A25EA6");
    shapeMenu.push(circle);


    var tSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 60, 60, 8, 7);
    var triangle = new Triangle(canvasName, tSettings.positionOnX, tSettings.positionOnY, tSettings.height, tSettings.width, "black", "#A25EA6");
    shapeMenu.push(triangle);

    var rSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 60, 90, 10, 7);
    var rectangle = new Rectangle(canvasName, rSettings.width, rSettings.height, rSettings.positionOnX, rSettings.positionOnY, "black", "#A25EA6");
    shapeMenu.push(rectangle);

    var rvSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 90, 60, 12, 7);
    var vRectangle = new VRectangle(canvasName, rvSettings.width, rvSettings.height, rvSettings.positionOnX, rvSettings.positionOnY, "black", "#A25EA6");
    shapeMenu.push(vRectangle);
}


function shapeGame(canvasName) {

    if(snd){snd.pause();}
    if (!canvasSupport())
    return
        var context = getCanvasContext("canvas");
    var canvas = document.getElementById("canvas");

    canvas.style.backgroundImage="url('Games/shapeGame/images/19.png')";
    canvas.style.backgroundSize="100% 100%";

    context.clearRect(0, 0, canvas.width, canvas.height);
    window.removeEventListener("resize", OnResizePenguinHouse, false);
    window.removeEventListener("click", BackToGames, false);
    window.removeEventListener("click", OnClickPenguinHouse, false);
    window.removeEventListener("click", OnClickHome, false);
    window.addEventListener("resize", OnResize, false);
    //add toucheventlisteners
    initTouch();
    score = 0;
    matchingAttempts = 0;
    //play instructions
    snd = new Audio("Games/shapeGame/sounds/instructions.wav");
    snd.play();
    clearArray(shapeSounds);
    initShapeSounds();
    canvasInit(canvasName, canvasAspectRatio);
    initShapeMenu(shapeMenu, canvasName);
   if(prevRand==null)
        prevRand = Math.floor((Math.random() * 10) + 1) % 3;
    var randGameNumber=(prevRand+1)%4;
    prevRand = randGameNumber;
    getShapeModel(shapeModel, randGameNumber);
    drawShapeArray(shapeMenu);
    drawShapeArray(shapeModel);

    displayPicture("canvas", "Games/shapeGame/images/peng.png", 200, 212, 8, 4, 1, 3, 0.05, 0.05);
    displayMenuPicture("Images/arrowLeft.png", 48, 48, 20, 10, 1, 1, 0.00, 0.00);
    var canvas = document.getElementById(canvasName);
    canvas.addEventListener("mousedown", mouseDownEvent, false);
}

function gameOver()
{
    return ((!winGame()) && matchingAttempts  == shapeModel.length)

}

function winGame()
{

    for (var shape in shapeModel)
    {
        if (shapeModel[shape].fillColor != "#A25EA6")
            return false;
    }
    return true;
}

function mouseDownEvent(event) {
    var x = event.pageX;
    var y = event.pageY;
    snd.pause();
    if (x >= arrowBackToHome.positionOnX && x <= arrowBackToHome.positionOnX + arrowBackToHome.width
        && y >= arrowBackToHome.positionOnY && y <= arrowBackToHome.positionOnY + arrowBackToHome.height)
    {

        window.removeEventListener("mousedown", mouseDownEvent);
        window.removeEventListener("mousemove", mouseMoveEvent);
        window.removeEventListener("mouseup", mouseUpEvent);
        window.removeEventListener("click",OnClickHome);
        canvas.removeEventListener("mousedown", mouseDownEvent, false);
        window.removeEventListener("resize",OnResize,false);

        //removeTouchEvents
        removeTouch();

        penguinHouse();
        return;
    }


    var shapeIndex;
    mouseX = event.pageX;
    mouseY = event.pageY;
    for (var i = 0; i < shapeMenu.length; i++)
    {
        if (shapeMenu[i].isPointInside(event.pageX, event.pageY))
        {
            hit = true;
            switch (getObjectType(shapeMenu[i]))

            {
                case "Square":
                {
                    shapeSounds[0].play();
                    break;
                }
                case "Circle":
                {
                    shapeSounds[1].play();
                    break;
                }
                case "Triangle":
                {
                    shapeSounds[2].play();
                    break;
                }
                case "VRectangle":
                {
                    shapeSounds[3].play();
                    break;
                }
                case "Rectangle":
                {
                    shapeSounds[4].play();
                    break;
                }
            }
            shapeIndex = i;
            break;
        }
    }

    if (hit)
    {

        window.addEventListener("mousemove", mouseMoveEvent, false);

        window.removeEventListener("mousedown", mouseDownEvent, false);
        window.addEventListener("mouseup", mouseUpEvent, false);

        var selectedShape = shapeMenu[shapeIndex]; //select
        draggedShape = shapeMenu[shapeIndex];
        shapeMenu.splice(shapeIndex, 1);
        shapeMenu.unshift(selectedShape);


        dragHoldX = mouseX - draggedShape.positionOnX;
        dragHoldY = mouseY - draggedShape.positionOnY;

        targetX = draggedShape.positionOnX;
        targetY = draggedShape.positionOnY;

        timer = setInterval(onTimerTick, 1000 / 30);

    }


}

function onTimerTick()
{
    if(draggedShape.positionOnX + easeAmount * (targetX - draggedShape.positionOnX)>0.2*canvas.width&&
        draggedShape.positionOnX + easeAmount * (targetX - draggedShape.positionOnX)<0.90*canvas.width)
    draggedShape.move(draggedShape.positionOnX + easeAmount * (targetX - draggedShape.positionOnX), draggedShape.positionOnY + easeAmount * (targetY - draggedShape.positionOnY));

    if ((!hit) && (Math.abs(draggedShape.positionOnX - targetX) < 0.1) && (Math.abs(draggedShape.positionOnY - targetY) < 0.1))
    {
        draggedShape.move(targetX, targetY);
        clearInterval(timer);
    }
    drawScreen();
    return;

}

function BackToGames(event)
{
 //snd.pause();
    var x = event.pageX;
    var y = event.pageY;
    if (x >= arrowBackToHome.positionOnX && x <= arrowBackToHome.positionOnX + arrowBackToHome.width
        && y >= arrowBackToHome.positionOnY && y <= arrowBackToHome.positionOnY + arrowBackToHome.height)
    {
        window.removeEventListener("click",BackToGames);
        shapeGame("canvas");
        return;

    }

}

function gameOverScreen(context, canvas)
{
    var canvas=document.getElementById("canvas");
    removeTouch();
    window.removeEventListener("click",OnClickPenguinHouse,false);
    window.removeEventListener("click",OnClickLionHouse,false);
    window.removeEventListener("click",OnClickMonkeyHouse,false);
    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("click",OnClickHome,false);
    window.removeEventListener("mouseup", mouseUpEvent,false);
    canvas.removeEventListener("mousedown", mouseDownEvent, false);

    context.clearRect(0, 0, canvas.width, canvas.height);

    snd= new Audio("Games/shapeGame/sounds/gameOver.wav");
    snd.play();

    //displayPicture("canvas", "Games/shapeGame/images/lose.png", 197, 164, 1, 1, 1, 1, 0.05, 0.05);
    displayPicture("canvas", "Games/shapeGame/images/SadP.png", 400, 321, 1, 2, 1, 2, 0.05, 0.05);
    displayMenuPicture("Images/arrowLeft.png", 48, 48, 20, 10, 1, 10, 0.00, 0.00);


    var message = "GAME OVER!!!";
    textPerc("canvas",message,0.5,0.1,0.08);
    textPerc("canvas",score,0.5,0.2,0.08);
    updateScore(score);
    displayPicturePercent("canvas","Games/shapeGame/images/coin.png",98,96,0.52,0.20,0.08,0.08);
    //displayPicture("canvas","Games/shapeGame/images/coin.gif",300,300,1,10,1,3,0.05,0.05,45);
    window.addEventListener("click",BackToGames,false);

    return;
}
function winScreen(context, canvas)
{
    removeTouch();
    window.removeEventListener("click",OnClickMonkeyHouse,false);
    window.removeEventListener("click",OnClickLionHouse,false);
    window.removeEventListener("click",OnClickPenguinHouse,false)
    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("mouseup", mouseUpEvent,false);
    window.removeEventListener("click",OnClickHome,false);
    canvas.removeEventListener("mousedown", mouseDownEvent, false);

    context.clearRect(0, 0, canvas.width, canvas.height);

    var snd= new Audio("Games/shapeGame/sounds/wellDone.wav");
    snd.play();

      displayPicture("canvas", "Games/shapeGame/images/happy.png", 444, 322, 1, 2, 1, 2, 0.05, 0.05);
    //displayPicture("canvas", "Games/shapeGame/images/win.png", 288, 175, 1, 1, 1, 1, 0.05, 0.05);

    displayMenuPicture("Images/arrowLeft.png", 48, 48, 20, 10, 1, 10, 0.00, 0.00);

    var message = "Well done!!!";
    textPerc("canvas",message,0.5,0.1,0.08);
    textPerc("canvas",score,0.5,0.2,0.08);
    displayPicturePercent("canvas","Games/shapeGame/images/coin.png",98,96,0.54,0.20,0.08,0.08);
    updateScore(score);

    //displayPicture("canvas","Games/shapeGame/images/coin.gif",300,300,1,10,1,3,0.05,0.05,45);
    window.addEventListener("click",BackToGames,false);
    return;
}

function drawScreen() {
    var canvas = document.getElementById("canvas");

    if (gameOver() || winGame()) {
        var context = getCanvasContext("canvas");
        if (gameOver())
        {
            window.clearTimeout(timer);
            gameOverScreen(context, canvas);
            return;

        }
        if (winGame())
        {
            window.clearTimeout(timer);
            winScreen(context, canvas);
            return;
        }
    }
    else {
        context = getCanvasContext("canvas");
        context.clearRect(0.19*canvas.width, 0 , 0.76*canvas.width, canvas.height);


            var message = "SCORE: " + score;

            textPerc("canvas",message,0.89,0.06,0.05);
            displayPicturePercent("canvas","Games/shapeGame/images/coin.png",98,96,0.95,0.05,0.06,0.06);
            drawShapeArray(shapeMenu);
            drawShapeArray(shapeModel);

            if (hit == true)
                draggedShape.draw();

    }
}

function mouseMoveEvent(event)
{
    var canvas = document.getElementById("canvas");
    var posX;
    var posY;
    var shapeRad = draggedShape.width;
    var minX = shapeRad;
    var maxX = canvas.width - shapeRad;
    var minY = shapeRad;
    var maxY = canvas.height - shapeRad;

    mouseX = event.clientX;
    mouseY = event.clientY;

    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

    targetX = posX;
    targetY = posY;

}

function mouseUpEvent(event) {
    window.removeEventListener("mousemove", mouseMoveEvent, false);

    var nrMatch = 0;
    var match = false;
    var shapeIndex = [];
    var indexOfMin = 0;

    hit = false;

    for (var i = 0; i < shapeModel.length; i++)
    {
        if (shapeModel[i].isPointInside(event.pageX, event.pageY))
        {
            nrMatch++;
            shapeIndex.push(i);
        }
    }

    if (nrMatch > 1)
    {
        var minSize = 999 * 999;

        for (var j in shapeIndex)
        {
            var indexInShapeModel = shapeIndex[j];
            if (shapeModel[indexInShapeModel].area() < minSize)
            {
                minSize = shapeModel[indexInShapeModel].area();
                indexOfMin = indexInShapeModel;
            }
        }
        if (getObjectType(shapeModel[indexOfMin]) == getObjectType(draggedShape))
            match = true;

    }
    if (nrMatch == 1)
        if (getObjectType(shapeModel[shapeIndex[0]]) == getObjectType(draggedShape))
        {
            match = true;
            indexOfMin = shapeIndex[0];

        }

    if (match)
    {

        shapeModel[indexOfMin].fillColor = draggedShape.fillColor;
        score+=scoreIncreaseAmount;
        matchingAttempts++;

    }
    else
    {
        matchingAttempts++;
    }

    shapeMenu.splice(0, 1);
    if (gameOver())
    {
        drawScreen();

        window.removeEventListener("mousedown", mouseDownEvent, false);
        return;
    }
    else if (winGame())
    {
        drawScreen();

        window.removeEventListener("mousedown", mouseDownEvent, false);
        return;
    }
    else
    {
        drawScreen();
        return;
    }

    return;


}

function playSound()
{
    var snd = new Audio("Games/shapeGame/sounds/doorbell.wav"); // buffers automatically when created
    snd.play();
}
function playInstructions()
{
    var snd = new Audio("Games/shapeGame/sounds/doorbell.wav"); // buffers automatically when created
    snd.play();
}

function updateScore(score)
{
    $.ajax({
        type: "POST",
        url: 'Games/shapeGame/php/score.php',
        data: {score: score}

    });
}
