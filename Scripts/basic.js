function displayMenuPicture(source, width, height, gridColumns, gridRows, gridColumn, gridRow, gridMarginLeft, gridMarginTop,dxPerc,dyPerc)
{
    var canvas= document.getElementById("canvas");
    this.width=width;
    this.height=height;
    this.gridColumns=gridColumns;
    this.gridRows=gridRows;
    this.gridColumn=gridColumn;
    this.gridRow=gridRow;
    this.gridMarginLeft=gridMarginLeft*canvas.width;
    this.gridMarginTop=gridMarginTop*(canvas.width/canvasAspectRatio);

    var availableWidth=canvas.width-2*this.gridMarginLeft;
    var availableHeight=(canvas.width/canvasAspectRatio)-2*this.gridMarginTop;
    var imageRatio=width/height;

    //create the grid stuff
    var cellWidth=availableWidth/parseFloat(gridColumns);
    var cellHeight=availableHeight/parseFloat(gridRows);

    if(cellHeight<height)
    {
        height=cellHeight;
        width=imageRatio*height;
    }
    if(cellWidth<width)
    {
        width=cellWidth;
        height=width/imageRatio;
    }

    var positionOnX=this.gridMarginLeft+(gridColumn-1)*cellWidth;
    var positionOnY=this.gridMarginTop+(gridRow-1)*cellHeight;


    var d=(cellWidth-width)/2;
    positionOnX=positionOnX+d;
    var dy=(cellHeight-height)/2;
    positionOnY=positionOnY+dy;

    if(dxPerc)
        positionOnX+=dxPerc*canvas.width;

    if(dyPerc)
        positionOnY+=dyPerc*canvas.height;



    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    var imageToDisplay = new Image();
    imageToDisplay.src = source;
    imageToDisplay.id=source;
    imageToDisplay.onload = function () {
        context.drawImage(imageToDisplay, positionOnX, positionOnY, width, height);
    };

    if(source=="Images/arrowLeft.png")
    {
        arrowBackToHome=new CanvasImage(source,positionOnX,positionOnY,width,height);
    }
    else
    if(source=="Images/lion.png"||source=="Images/monkey.png"||source=="Images/penguin.png"
        ||source=="Images/monkeySign.png"||source=="Images/igloo.png"||source=="Images/monkeyHouse.png"
        ||source=="Images/penguinSign.png"||source=="Images/lionHouse.png"||"Images/lionsSign.png")
    {
        var img=new CanvasImage(source,positionOnX,positionOnY,width,height);
        imagesOnCanvas.push(img);
    }
    if(source=="Images/shapes.jpg")
    {
        shapesGame  = new CanvasImage(source, positionOnX, positionOnY, width, height);
    }

    if(source=="Images/DragBoxes.jpg")
    {
        countingGame =new CanvasImage(source,positionOnX,positionOnY,width,height);
    }
	return;
}

function CanvasImage(name,positionOnX, positionOnY, width, height)
{   this.name=name;
    this.positionOnX=positionOnX;
    this.positionOnY=positionOnY;
    this.width=width;
    this.height=height;

}

function centerPictureOnYTop(pictureHeight)
{
    return (window.innerHeight) / 2 - (pictureHeight);
}
function centerPictureOnX(pictureWidth)
{
    return (window.innerWidth) / 2 - (pictureWidth / 2);
}



