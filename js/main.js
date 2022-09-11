//The dreaded global variables.
//I believe it's more effective to ping the document once when mouse down,
//Then reference these while drawing.
//Doing away with these globals means I have to ping the document constantly
//To get the right color and thickness
let brushColor = '#000';
let brushThickness = 3;

//We'll use the demo code from Moz as the foundation,
//since they apparently did the thing I intend already...
//It's been bushwhacked a bit and probably will be a lot more as things progress

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const theCanvas = document.getElementById('theCanvas');
const context = theCanvas.getContext('2d');

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
theCanvas.addEventListener('mousedown', (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
  brushColor = document.getElementById('color').value; //Modifies the global above
  brushThickness = document.getElementById('thickness').value; //This also modifies a global
});

theCanvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = brushColor; //brushColor and brushThickness are globals
  context.lineWidth = brushThickness;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
// End Moz demo code.
// My thanks to you (and this is sincere).