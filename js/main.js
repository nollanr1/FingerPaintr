const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);


/*
findCanvasCoords:
Finds the mouse coordinates within the canvas (although it could work for any object).
The following code is stolen from
https://nerdparadise.com/programming/javascriptmouseposition
although I've tweaked it a bit.
*/
function findCanvasCoords(mouseEvent)
{
  let obj = document.getElementById("theCanvas");
  let obj_left = 0;
  let obj_top = 0;
  let xpos;
  let ypos;
  while (obj.offsetParent)
  {
    obj_left += obj.offsetLeft;
    obj_top += obj.offsetTop;
    obj = obj.offsetParent;
  }
  if (mouseEvent)
  {
    //FireFox
    xpos = mouseEvent.pageX;
    ypos = mouseEvent.pageY;
  }
  else
  {
    //IE
    xpos = window.event.x + document.body.scrollLeft - 2;
    ypos = window.event.y + document.body.scrollTop - 2;
  }
  xpos -= obj_left;
  ypos -= obj_top;
  document.getElementById("objectCoords").innerHTML = xpos + ", " + ypos;
}
document.getElementById("theCanvas").onmousemove = findCanvasCoords;