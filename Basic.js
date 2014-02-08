/**
 * Created by Dana on 01/02/14.
 */
function displayMenuPicture(source, width, height, gridColumns, gridRows, gridColumn, gridRow, gridMarginLeft, gridMarginTop)
{
    this.width=width;
    this.height=height;
    this.gridColumns=gridColumns;
    this.gridRows=gridRows;
    this.gridColumn=gridColumn;
    this.gridRow=gridRow;
    this.gridMarginLeft=gridMarginLeft*window.innerWidth;
    this.gridMarginTop=gridMarginTop*(window.innerWidth/canvasAspectRatio);

    var availableWidth=window.innerWidth-2*this.gridMarginLeft;
    var availableHeight=(window.innerWidth/canvasAspectRatio)-2*this.gridMarginTop;
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

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    var imageToDisplay = new Image();
    imageToDisplay.src = source;
    imageToDisplay.id=source;
    imageToDisplay.onload = function () {
        context.drawImage(imageToDisplay, positionOnX, positionOnY, width, height);
    };

    if(source=="arrowLeft.png")
    {
        arrowBackToHome=new CanvasImage(source,positionOnX,positionOnY,width,height);
    }
    else
    if(source=="lion.jpg"||source=="monkey.jpg"||source=="penguin.jpg")
    {
        var img=new CanvasImage(source,positionOnX,positionOnY,width,height);
        imagesOnCanvas.push(img);
    }
    if(source=="shapes.jpg")
    {
        shapesGame  = new CanvasImage(source, positionOnX, positionOnY, width, height);
    }

    if(source=="counting.gif")
    {
        countingGame =new CanvasImage(source,positionOnX,positionOnY,width,height);
    }

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



