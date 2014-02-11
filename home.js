/**
 * Created by Dana on 01/02/14.
 */
//<reference path="scripts/monkeyHouse.js"/>

var imagesOnCanvas= [];
var canvasAspectRatio=2.5;

function canvasSupport ()
{
    return Modernizr.canvas;
}

window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded ()
{
    canvasApp();
}

window.addEventListener("resize", OnResizeHome, false);

function OnResizeHome()
{
    canvas.width = window.innerWidth;
    canvas.height =canvas.width/canvasAspectRatio;
    canvasApp();
}

window.addEventListener("click",OnClickHome,false);

function OnClickHome(event)
{
    var x=event.pageX;
    var y=event.pageY;
    // var message="click"+ x.toString()+" "+ y.toString()+" event detected!"
    var i=0;
    while(i< imagesOnCanvas.length)
    {
        var img=imagesOnCanvas[i];
        if(x>=img.positionOnX && x<=img.positionOnX+img.width
            && y>=img.positionOnY && y<=img.positionOnY+img.height)
        {  window.removeEventListener("click",OnClickHome,false);
            window.removeEventListener("resize",OnResizeHome,false);

            if(img.name=="monkey.png"||img.name=="monkeyHouse.png"||img.name=="monkeySign.png")
            {
                monkeyHouse();
            }

            if(img.name=="penguin.png"||img.name=="penguinSign.png"||img.name=="igloo.png")
            {
                penguinHouse();
            }

            if(img.name=="lion.png"||img.name=="lionHouse.png"||img.name=="lionsSign.png")
            {
                lionHouse();
            }
        }
        i++;
    }
    window.addEventListener("click",OnClickHome,false);
}
var arrowBackToHome;

function canvasApp()
{
    window.removeEventListener("click", OnClickMonkeyHouse, false); //trebuie sa dezactivam chestiile din Houses
    window.removeEventListener("resize", OnResizeMonkeyHouse, false); //exact asa tre facut si pt click

    window.removeEventListener("resize", OnResizePenguinHouse, false);
    window.removeEventListener("resize", OnResizeLionHouse, false);

    window.addEventListener("click",OnClickHome,false);
    window.addEventListener("resize", OnResizeHome, false);

    var canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = canvas.width/canvasAspectRatio;

    displayMenuPicture("planet.png",1740,696,1,1,1,1,0,0);

    displayMenuPicture("monkey.png",333,381,13,4,4,4,-0.01,0.00);
    displayMenuPicture("monkeyHouse.png",243,329,5,2,1,2,0.23,0.24,0.01,0.01);
    displayMenuPicture("palm.png",252,293,5,2,1,2,0.04,0.00,0.04,-0.01);
    displayMenuPicture("monkeySign.png",115,142,5,4,1,4,0.28,0.13,0.02,-0.05);

    displayMenuPicture("igloo.png",388,237,7,2,4,2,0.05,0.30,0.01,-0.06);
    displayMenuPicture("penguin.png",142,228,2,3,1,3,0.40,0.20,-0.01,-0.05);
    displayMenuPicture("penguinSign.png",90,104,13,6,8,4,0.00,0.02,0.03,-0.01);

    displayMenuPicture("lion.png",307,284,10,4,7,4,0.02,0.00,-0.01,0.02);
    displayMenuPicture("lionHouse.png",293,245,5,3,5,3,0.17,0.00,-0.05,-0.14);
    displayMenuPicture("savannahTree.png",239,212,6,2,5,2,0.01,0.01,0.07,0.05);
    displayMenuPicture("lionsSign.png",99,100,7,6,6,6,0.00,0.01);


    if (!canvasSupport())
    {
        return;
    }
}



