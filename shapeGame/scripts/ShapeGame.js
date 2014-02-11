/**
 * Created by Dana on 11/2/13.
 */

//<reference path="scripts/engine.js"/>


//window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded()
{  /* playInstructions();
 var button=document.getElementById("instructions");
 button.addEventListener("click", playInstructions,false);*/
    shapeGame();
}
//window.addEventListener("resize", OnResize, false);

function OnResize(canvasName)
{
    canvasInit(canvasName, 2.5);
    clearArray(shapeMenu);
    clearArray(shapeModel);
    shapeGame(canvasName);
}

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

var shapeSounds=[];

function initShapeSounds()
{
    var square = new Audio("shapeGame/sounds/doorbell.wav");
    //shapeSounds.push(square);
    var circle = new Audio("shapeGame/sounds/doorbell.wav");
    // shapeSounds.push(circle);
    var triangle = new Audio("shapeGame/sounds/doorbell.wav");

    var vrect= new Audio("shapeGame/sounds/doorbell.wav");
    var rect=new Audio("shapeGame/sounds/doorbell.wav");
    shapeSounds.push(square,circle,triangle,vrect,rect);

}

function initShapeMenu(shapeMenu, canvasName) {
    clearArray(shapeMenu);

    var settings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 50, 50, 4, 7);
    var square = new Square(canvasName, settings.width, settings.height, settings.positionOnX, settings.positionOnY, "black", "#8A9B0F");
    shapeMenu.push(square);

    var cSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 50, 50, 6, 7);
    var circle = new Circle(canvasName, cSettings.positionOnX + cSettings.width / 2, cSettings.positionOnY + cSettings.width / 2, cSettings.width / 2, "black", "#8A9B0F");
    shapeMenu.push(circle);


    var tSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 50, 50, 8, 7);
    var triangle = new Triangle(canvasName, tSettings.positionOnX, tSettings.positionOnY, tSettings.height, tSettings.width, "black", "#8A9B0F");
    shapeMenu.push(triangle);

    var rSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 50, 80, 10, 7);
    var rectangle = new Rectangle(canvasName, rSettings.width, rSettings.height, rSettings.positionOnX, rSettings.positionOnY, "black", "#8A9B0F");
    shapeMenu.push(rectangle);

    var rvSettings = getSettingsForGrid(canvasName, 0.05, 0.01, 15, 7, 80, 50, 12, 7);
    var vRectangle = new VRectangle(canvasName, rvSettings.width, rvSettings.height, rvSettings.positionOnX, rvSettings.positionOnY, "black", "#8A9B0F");
    shapeMenu.push(vRectangle);
}


function shapeGame(canvasName) {
    window.removeEventListener("click",BackToGames,false);
    window.removeEventListener("click",OnClickMonkeyHouse,false);
    window.removeEventListener("click",OnClickHome,false);

    score=0;
    matchingAttempts=0;
    var snd = new Audio("shapeGame/sounds/doorbell.wav"); // buffers automatically when created
    snd.play();

    initShapeSounds();

    //window.addEventListener("mouseover",mouseOverSounds,false);

    if (!canvasSupport())
        return;

    canvasInit(canvasName, 2.5);
    // if(arguments.callee.caller.name!="OnResize")
    {
        initShapeMenu(shapeMenu, canvasName);
        getShapeModel(shapeModel);
    }
    drawShapeArray(shapeMenu);
    drawShapeArray(shapeModel);

    displayPicture(canvasName, "shapeGame/images/lionface.png", 792, 1009, 15, 4, 1, 4, 0.01, 0.01);

    displayMenuPicture("arrowLeft.png", 48, 48, 20, 10, 1, 1, 0.00, 0.00);


    var canvas = document.getElementById(canvasName);
    canvas.addEventListener("mousedown", mouseDownEvent, false);

}

function mouseOverSounds(event)
{
    var x=event.pageX;
    var y= event.pageY;
    for ( var index in shapeMenu)
    {if(shapeMenu[index].isPointInside(x,y))
        if(getObjectType(shapeMenu[index])=="Square")
        {alert('mouse over square');

        }
    }
}

function gameOver()
{
    if ((!winGame()) && matchingAttempts - 1 == shapeModel.length)
        return true;
}
function winGame()
{
    var shape;
    for (shape in shapeModel)
    {
        if (shapeModel[shape].fillColor != "#8A9B0F")
            return false;
    }
    return true;
}

function mouseDownEvent(event) {
    var x = event.pageX;
    var y = event.pageY;
    if (x >= arrowBackToHome.positionOnX && x <= arrowBackToHome.positionOnX + arrowBackToHome.width
        && y >= arrowBackToHome.positionOnY && y <= arrowBackToHome.positionOnY + arrowBackToHome.height)
    {

        window.removeEventListener("mousedown", mouseDownEvent);
        window.removeEventListener("mousemove", mouseMoveEvent);
        window.removeEventListener("mouseup", mouseUpEvent);
        window.removeEventListener("click",OnClickHome);

        monkeyHouse();
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
                };

            }
            shapeIndex = i;
            break;
        }
    }

    if (hit)
    {
        matchingAttempts++;
        window.addEventListener("mousemove", mouseMoveEvent, false);

        window.removeEventListener("mousedown", mouseDownEvent, false);
        window.addEventListener("mouseup", mouseUpEvent, false);

        var selectedShape = shapeMenu[shapeIndex]; //select
        draggedShape = shapeMenu[shapeIndex];
        shapeMenu.splice(shapeIndex, 1);                            //delete
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

    draggedShape.move(draggedShape.positionOnX + easeAmount * (targetX - draggedShape.positionOnX), draggedShape.positionOnY + easeAmount * (targetY - draggedShape.positionOnY));

    if ((!hit) && (Math.abs(draggedShape.positionOnX - targetX) < 0.1) && (Math.abs(draggedShape.positionOnY - targetY) < 0.1))
    {
        draggedShape.move(targetX, targetY);
        clearInterval(timer);
    }
    drawScreen();

}

function BackToGames(event)
{
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

    window.removeEventListener("click",OnClickMonkeyHouse,false);
    window.removeEventListener("click",OnClickLionHouse,false);
    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("click",OnClickHome,false);


    context.clearRect(0, 0, canvas.width, canvas.height);

    displayPicture("canvas", "shapeGame/images/lose.jpg", 197, 164, 1, 1, 1, 1, 0.05, 0.05);
    displayMenuPicture("arrowLeft.png", 48, 48, 20, 10, 1, 10, 0.00, 0.00);


    var message = "GAME OVER!!!";
    writeText(message,50,40);
    writeText(score,120,40);

    updateScore(score);

    displayPicture("canvas","shapeGame/images/coin.gif",300,300,1,10,1,3,0.05,0.05,45);

    //window.removeEventListener("click",OnClickMonkeyHouse);
    window.addEventListener("click",BackToGames,false);
    //window.instructions.style.visibility="hidden";

}
function winScreen(context, canvas)
{

    window.removeEventListener("click",OnClickMonkeyHouse,false);
    window.removeEventListener("click",OnClickLionHouse,false);
    window.removeEventListener("mousedown",mouseDownEvent,false);
    window.removeEventListener("click",OnClickHome,false);


    context.clearRect(0, 0, canvas.width, canvas.height);


    displayPicture("canvas", "shapeGame/images/win.jpg", 288, 175, 1, 1, 1, 1, 0.05, 0.05);
    displayMenuPicture("arrowLeft.png", 48, 48, 20, 10, 1, 10, 0.00, 0.00);



    var message = "Well done!!!";
    writeText(message,50,40);
    writeText(score,100,40);

    updateScore(score);

    displayPicture("canvas","shapeGame/images/coin.gif",300,300,1,10,1,3,0.05,0.05,45);
    window.addEventListener("click",BackToGames,false);
    //window.instructions.style.visibility="hidden";
}

function drawScreen() {
    var canvas = document.getElementById("canvas");



    if (gameOver() || winGame()) {
        var context = getCanvasContext("canvas");
        if (gameOver()) {
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
        context.clearRect(115, 0, canvas.width - 115, canvas.height);

        var message = "SCORE: " + score;
        writeText(message,50,20);
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
    var snd = new Audio("sounds/doorbell.wav"); // buffers automatically when created
    snd.play();
}
function playInstructions()
{
    var snd = new Audio("sounds/doorbell.wav"); // buffers automatically when created
    snd.play();
}


