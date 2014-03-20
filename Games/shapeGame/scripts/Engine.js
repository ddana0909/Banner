//<reference path="scripts/modernizr-latest.js"/>

function canvasInit(canvasName,aspectRatio)
{
    var canvas = document.getElementById(canvasName);
    canvas.width = window.innerWidth;
    canvas.height = canvas.width/aspectRatio;

}

function canvasSupport ()
{
    return Modernizr.canvas;
}

function getCanvasContext(name)
{
    var theCanvas = document.getElementById(name);
    return theCanvas.getContext("2d");
}

function drawShapeArray(shapes)
{
    for (var i = 0; i < shapes.length; i++)
        shapes[i].draw();
}

function GeometricShape(canvasName, positionX, positionY,color,fillColor, width)
{
    this.canvasName=canvasName;
    this.positionOnX=positionX;
    this.positionOnY=positionY;
    this.color=color;
    this.fillColor=fillColor;
    this.width=width;
}


function distanceBetweenPoints(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}

function Sound(source, reapeat)
{
    this.source=source;
    this.repeat=reapeat;
}
function playSound()
{
    while(this.repeat)
    {
        var snd = new Audio(source);
        snd.play();
        this.repeat--;
    }
}

Sound.prototype.playSound=playSound;


function Rectangle(canvasName,width, height, positionX, positionY,color,fillColor)
{
    GeometricShape.call(this,canvasName,positionX,positionY,color,fillColor,width);
    this.height=height;
}

function assignRect( sourceName)
{var i;
    for(i in this)
        this[i]=sourceName;
}
Rectangle.prototype= new GeometricShape();

Rectangle.assign=assignRect;
Rectangle.prototype.draw=drawRectangle;

Rectangle.prototype.area=areaRectangle;

Rectangle.prototype.isPointInside = function (x, y)
{
    if (x < this.positionOnX || x > this.positionOnX + this.width) {
                return false;
    }
    if (y < this.positionOnY || y > this.positionOnY + this.height) {
                return false;
    }

    return true;
};

Rectangle.prototype.move=function(newX, newY)
{
    this.positionOnX=newX;
    this.positionOnY=newY;
};

function drawRectangle()
{
    var context=getCanvasContext(this.canvasName);
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 3;

    context.rect(this.positionOnX, this.positionOnY, this.width,this.height);

    context.stroke();
    if(this.fillColor)
    {
        context.fillStyle=this.fillColor;
        context.fill();
    }

}

function areaRectangle()
{
    return this.width*this.height;
}


function Circle(canvasName,positionX,positionY,radius,color,fillColor)
{
    GeometricShape.call(this,canvasName,positionX,positionY,color,fillColor, radius);

}

Circle.prototype= new GeometricShape();

Circle.prototype.draw=drawCircle;

Circle.prototype.area=areaCircle;

Circle.prototype.isPointInside = function (x, y) {
    return distanceBetweenPoints(this.positionOnX, this.positionOnY, x, y) <= this.width;

};

Circle.prototype.move = function (newX, newY) {
    this.positionOnX = newX;
    this.positionOnY = newY;
};
function drawCircle()
{
    var context=getCanvasContext(this.canvasName);
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 3;
    context.arc(this.positionOnX, this.positionOnY, this.width, 0, (Math.PI/180)*360, false);
    context.stroke();
    context.closePath();
    if(this.fillColor)
    {
        context.fillStyle=this.fillColor;
        context.fill();
    }
}

function areaCircle()
{
    return Math.PI*Math.pow(this.width,2);
}

function Triangle(canvasName,positionX,positionY,height,basisLength,color, fillColor)
{
    GeometricShape.call(this,canvasName,positionX,positionY,color,fillColor);
    this.height=height;
    this.basisLength=basisLength;
    this.x2 =this.positionOnX -basisLength/2;
    this.y2 = this.positionOnY + height;
    this.x3 = this.positionOnX + basisLength/2;
    this.y3 = this.y2;
}

Triangle.prototype=new GeometricShape();

Triangle.prototype.draw = drawTriangle;

Triangle.prototype.area=areaTriangle;

Triangle.prototype.isPointInside = function (x, y) {

    //barycentric coordinates
    var lambda1 = parseFloat((this.y2 - this.y3) * (x - this.x3) + (this.x3 - this.x2) * (y - this.y3)) / ((this.y2 - this.y3) * (this.positionOnX - this.x3) + (this.x3 - this.x2) * (this.positionOnY - this.y3));
    var lambda2 = parseFloat((this.y3 - this.positionOnY) * (x - this.x3) + (this.positionOnX - this.x3) * (y - this.y3)) / ((this.y2 - this.y3) * (this.positionOnX - this.x3) + (this.x3 - this.x2) * (this.positionOnY - this.y3));
    var lambda3 = 1 - lambda1 - lambda2;

    return lambda1 >= 0 && lambda1 <= 1 && lambda2 >= 0 && lambda2 <= 1 && lambda3 >= 0 && lambda3 <= 1;

};

Triangle.prototype.move = function (newX, newY) {
    var dx = this.positionOnX - newX;
    var dy = this.positionOnY - newY;
    this.positionOnX = newX;
    this.positionOnY = newY;
    this.x2 -= dx;
    this.y2 -= dy;
    this.x3 -= dx;
    this.y3 -= dy;
};

function drawTriangle()
{
    var context = getCanvasContext(this.canvasName);
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 3;
    context.moveTo(this.positionOnX, this.positionOnY);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x3, this.y3);
    context.lineTo(this.positionOnX, this.positionOnY);
    context.stroke();
    if (this.fillColor)
    {
        context.fillStyle = this.fillColor;
        context.fill();
    }
}

function areaTriangle()
{
    return (this.basisLength*this.height)/2;
}

function Square(canvasName,width, height, positionX, positionY,color,fillColor)
{
    Rectangle.call(this,canvasName,width, height, positionX, positionY,color,fillColor);
}
Square.prototype=new Rectangle();

function VRectangle(canvasName,width, height, positionX, positionY,color,fillColor)
{
    if(height<width)
    {
        var aux=height;
        height=width;
        width=aux;
    }
    Rectangle.call(this,canvasName,width, height, positionX, positionY,color,fillColor);
}
VRectangle.prototype=new Rectangle();

function Picture(source, width, height)
{
    this.source=source;
    this.width=width;
    this.height=height;
}
var shapeTypes=[];
shapeTypes["Square"]=Square;
shapeTypes["VRectangle"]=VRectangle;
shapeTypes["Rectangle"]=Rectangle;
shapeTypes["Circle"]=Circle;
shapeTypes["Triangle"]=Triangle;


function getObjectType(obj)
{
    for(var oType in shapeTypes)
        if(obj instanceof shapeTypes[oType])
            return oType;
}

function clearArray(name)
{
    name.splice(0,name.length);
}

function adjustDimensionsForGrid(cellHeight, cellWidth, height, width)
{
    var imageRatio = width / height;
    if (cellHeight < height) {
        height = cellHeight;
        width = imageRatio * height;
    }
    if (cellWidth < width) {
        width = cellWidth;
        height = width / imageRatio;
    }
    return {height: height, width: width};
}

function getSettingsForGrid( canvasName,gridMarginLeft,gridMarginTop, gridColumns, gridRows, height, width, gridColumn, gridRow)
{
    var canvas = document.getElementById(canvasName);

    gridMarginLeft = gridMarginLeft * canvas.width;
    gridMarginTop = gridMarginTop * canvas.height;

    var availableWidth = canvas.width - 2 * gridMarginLeft;
    var availableHeight = canvas.height - 2 * gridMarginTop;

    //create the grid stuff
    var cellWidth = availableWidth / parseFloat(gridColumns);
    var cellHeight = availableHeight / parseFloat(gridRows);

    var __ret = adjustDimensionsForGrid(cellHeight, cellWidth, height, width);
    height = __ret.height;
    width = __ret.width;

    var positionOnX = gridMarginLeft + (gridColumn - 1) * cellWidth;
    var positionOnY = gridMarginTop + (gridRow - 1) * cellHeight;

    //center in cell on OX

    var d = (cellWidth - width) / 2;
    positionOnX = positionOnX + d;

    //center in cell on OY

    var dy=(cellHeight-height)/2;
    positionOnY=positionOnY+dy;

    return {height: height, width: width, positionOnX: positionOnX, positionOnY: positionOnY};
}

function displayPicture(canvasName,source, width, height, gridColumns, gridRows, gridColumn, gridRow, gridMarginLeft, gridMarginTop,shiftOnX)
{
    var context = getCanvasContext(canvasName);

    var __ret = getSettingsForGrid(canvasName, gridMarginLeft, gridMarginTop, gridColumns, gridRows, height, width, gridColumn, gridRow);
    height = __ret.height;
    width = __ret.width;
    var positionOnX = __ret.positionOnX;
    var positionOnY = __ret.positionOnY;
    if(shiftOnX)
    {
        positionOnX+=shiftOnX;
    }
    //display imag
    var imageToDisplay = new Image();
    imageToDisplay.src = source;
    imageToDisplay.id = source;
    imageToDisplay.onload = function ()
    {
        context.drawImage(imageToDisplay, positionOnX, positionOnY, width, height);
    }
}

function getShapeModel(shapeModel, randomNumber)
{
    clearArray(shapeModel);
switch (randomNumber)
    {
    case 0:
    {
        var settings = getSettingsForGrid("canvas",0.05,0.01,3,3,150,150,2,2);
        var square=new Square("canvas",settings.width,settings.height,settings.positionOnX, settings.positionOnY,"black","#FBB829");
        shapeModel.push(square);

        var cSettings=getSettingsForGrid("canvas",0.05,0.01,3,3,50,50,2,2);
        cSettings.width=settings.width/3;
        cSettings.positionOnX=settings.positionOnX+settings.width/2;
        cSettings.positionOnY=settings.positionOnY+settings.width/2;
        var circle= new Circle("canvas",cSettings.positionOnX,cSettings.positionOnY,cSettings.width/2,"black","#FBB829");
        shapeModel.push(circle);


        var tSettings=getSettingsForGrid("canvas",0.05,0.01,3,3,40,40,2,2);
        tSettings.width=0.8*settings.width/3;
        tSettings.height=0.8*settings.height/3;
        var triangle= new Triangle("canvas",cSettings.positionOnX ,cSettings.positionOnY-tSettings.height-cSettings.width/2-3,tSettings.height,tSettings.width,"black","#FBB829");
        shapeModel.push(triangle);

        var rvSettings=getSettingsForGrid("canvas",0.05,0.01,3,3,80,50,2,2);
        rvSettings.width=settings.width/3;
        rvSettings.height=settings.height/2;
        rvSettings.positionOnY-=(rvSettings.height+(rvSettings.positionOnY-settings.positionOnY+3));
        rvSettings.positionOnX=settings.positionOnX+rvSettings.width;
        var vrectangle=new VRectangle("canvas",rvSettings.width,rvSettings.height,rvSettings.positionOnX, rvSettings.positionOnY,"black","#FBB829");
        shapeModel.push(vrectangle);

        break;
    }
    case 1:
    {

        var cSettings= getSettingsForGrid("canvas",0.05,0.01,3,3,150,150,2,2);
        cSettings.positionOnX+=cSettings.width/2;
        cSettings.positionOnY+=cSettings.width/2;
        var circle= new Circle("canvas",cSettings.positionOnX, cSettings.positionOnY, cSettings.width/2,"black", "FBB829");
        shapeModel.push(circle);

        var sSettings= getSettingsForGrid("canvas",0.05,0.01,3,3,150,150,2,2);
        sSettings.width/=3;
        sSettings.positionOnX+=sSettings.width;
        sSettings.positionOnY+=sSettings.width;
        var square=new Square("canvas",sSettings.width,sSettings.width,sSettings.positionOnX, sSettings.positionOnY,"black","#FBB829");
        shapeModel.push(square);

        var rSettings = getSettingsForGrid("canvas",0.05,0.01,3,3,150,150,2,2);
        rSettings.height/=3;
        rSettings.positionOnY+=cSettings.width;
        var rectangle= new Rectangle("canvas",  rSettings.width, rSettings.height,rSettings.positionOnX, rSettings.positionOnY, "black", "FBB829");
        shapeModel.push(rectangle);

        var rvSettings= getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        rvSettings.width/=3;
        rvSettings.height+=rSettings.height;
        rvSettings.positionOnX+= cSettings.width+2;
        var vrectangle=new VRectangle("canvas",rvSettings.width,rvSettings.height,rvSettings.positionOnX, rvSettings.positionOnY,"black","#FBB829");
        shapeModel.push(vrectangle);

        var tSettings= getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        tSettings.height=tSettings.height/2;
        tSettings.positionOnX+= cSettings.width/2;
        tSettings.positionOnY-=cSettings.width/2+4;
        var triangle= new Triangle("canvas",tSettings.positionOnX ,tSettings.positionOnY,tSettings.height,tSettings.width,"black","#FBB829");
        shapeModel.push(triangle);
        break;
    }
    case 2:
    {
        var sSettings=getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        sSettings.width/=3;
        var square=new Square("canvas",sSettings.width,sSettings.width,sSettings.positionOnX, sSettings.positionOnY,"black","#FBB829");
        shapeModel.push(square);

        var tSettings=getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        tSettings.width/=2;
        tSettings.height/=1.5;
        tSettings.positionOnX+=sSettings.width+tSettings.width/2+4;
        tSettings.positionOnY-=(tSettings.height-sSettings.width);
        var triangle= new Triangle("canvas",tSettings.positionOnX ,tSettings.positionOnY,tSettings.height,tSettings.width,"black","#FBB829");
        shapeModel.push(triangle);

        var rSettings= getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        rSettings.width=tSettings.width+sSettings.width+4;
        rSettings.height/=3;
        rSettings.positionOnY+=sSettings.width+3;
        var rectangle= new Rectangle("canvas",  rSettings.width, rSettings.height,rSettings.positionOnX, rSettings.positionOnY, "black", "FBB829");
        shapeModel.push(rectangle);

        var cSettings= getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        cSettings.width=(rSettings.height-4);
        cSettings.positionOnX=rSettings.positionOnX+rSettings.width/2;
        cSettings.positionOnY=rSettings.positionOnY+cSettings.width/2+2;
        var circle= new Circle("canvas",cSettings.positionOnX, cSettings.positionOnY, cSettings.width/2,"black", "FBB829");
        shapeModel.push(circle);

        var vrSettings= getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        vrSettings.width=sSettings.width;
        vrSettings.height=sSettings.width+rSettings.height+4;
        vrSettings.positionOnX=sSettings.positionOnX+rSettings.width+3;
        vrSettings.positionOnY=sSettings.positionOnY;
        var vRectangle=new VRectangle("canvas",vrSettings.width,vrSettings.height,vrSettings.positionOnX, vrSettings.positionOnY,"black","#FBB829");
        shapeModel.push(vRectangle);

        break;
    }
    case 3:
    {
        var vrSettings=getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        vrSettings.width/=3;
        vrSettings.height/=1.25;
        vrSettings.positionOnX+=vrSettings.width;
        vrSettings.positionOnY+=vrSettings.width;
        var vRectangle=new VRectangle("canvas",vrSettings.width,vrSettings.height,vrSettings.positionOnX, vrSettings.positionOnY,"black","#FBB829");
        shapeModel.push(vRectangle);

        var tSettings=getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        tSettings.height/=1.5;
        tSettings.width*=1.25;
        tSettings.positionOnX=vrSettings.positionOnX+vrSettings.width/2;
        tSettings.positionOnY=vrSettings.positionOnY-tSettings.height-3;
        var triangle= new Triangle("canvas",tSettings.positionOnX ,tSettings.positionOnY,tSettings.height,tSettings.width,"black","#FBB829");
        shapeModel.push(triangle);

        var sSettings=getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        sSettings.width=vrSettings.width-0.15*vrSettings.width;
        sSettings.positionOnX=vrSettings.positionOnX+(vrSettings.width-sSettings.width)/2;
        sSettings.positionOnY=vrSettings.positionOnY-sSettings.width-4;
        var square=new Square("canvas",sSettings.width,sSettings.width,sSettings.positionOnX, sSettings.positionOnY,"black","#FBB829");
        shapeModel.push(square);

        var cSettings=getSettingsForGrid("canvas", 0.05,0.01,3,3,150,150,2,2);
        cSettings.width=tSettings.height/2;
        cSettings.positionOnX=tSettings.positionOnX;
        cSettings.positionOnY=tSettings.positionOnY-cSettings.width/2-3;
        var circle= new Circle("canvas",cSettings.positionOnX, cSettings.positionOnY, cSettings.width/2,"black", "FBB829");
        shapeModel.push(circle);

        break;

    }

}
}

function centerText(message, canvas)
{
    var context=canvas.getContext("2d");
    var metrics=context.measureText(message);
    var messageSize=metrics.width;
    return (canvas.width/2)-(messageSize/2);

}

function writeText(message,positionOnX,fontSize,positionOnY)
{
    var canvas = document.getElementById("canvas");
    var context = getCanvasContext("canvas");
    context.fillStyle = "#000000";
    context.font = fontSize +"px _sans";
    context.textBaseline = "top";

    var position;
    if(positionOnY)
        position=positionOnY;
    else
        position = centerText(message, canvas);
    context.fillText(message, position, positionOnX);
}

