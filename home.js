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
        //dana
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

                    if(img.name=="monkey.jpg")
                        {
                        monkeyHouse();
                        }

                    if(img.name=="penguin.jpg")
                        {
                         penguinHouse();
                        }

                    if(img.name=="lion.jpg")
                        {
                         lionHouse();
                        }
                }
              i++;
             }
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

        displayMenuPicture("background.jpg",1535,614,1,1,1,1,0,0);

        displayMenuPicture("penguin.jpg",380,269,3,2,2,1,0.05,0.05);
        displayMenuPicture("monkey.jpg",296,250,3,2,1,2,0.05,0.05);
        displayMenuPicture("lion.jpg",250,276,3,2,3,2,0.05,0.05);

        if (!canvasSupport())
        {
         return;
        }
    }




