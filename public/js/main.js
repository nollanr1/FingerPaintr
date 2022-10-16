document.getElementById('imageUpload').addEventListener('change', placeImgOnCanvas);
document.getElementById('imageDownload').addEventListener('click', downloadImage);
if (document.getElementById('saveToGallery') != null){
  document.getElementById('saveToGallery').addEventListener('click', saveToGallery);
}


//The dreaded global variables.
//I believe it's more effective to ping the document once when mouse down,
//Then reference these while drawing.
//Doing away with these globals means I have to ping the document constantly
//To get the right color and thickness
let brushColor = '#000';
let brushThickness = 3;
const theCanvas = document.getElementById('theCanvas');
const context = theCanvas.getContext('2d');
const maxHeight = null;
const maxWidth = null; //In pixels. No size limit, but the functionality is there if needed.
//We'll use the demo code from Moz as the foundation, since open source

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;
/*placeImgOnCanvas:
puts the uploaded image on the canvas.
Does not resize the image.*/
function placeImgOnCanvas() {
  let img = new Image();
  img.onload = function () {
    if((maxWidth && maxHeight) && (this.width > maxWidth || this.height > maxHeight)){ //Basic gate to stop overly large images, to save the sorrow of being rejected by the backend after all your hard work.
      //You could bypass this by editing this code since it's all frontend, but... if you're reading this comment to try that, just go use GIMP or something, hackerman.
      alert(`Image is larger than allowed size. Maximum size is ${maxHeight} pixels high by ${maxWidth} pixels wide, but this image is ${this.height} pixels high by ${this.width} pixels wide. Image downscaling or larger images may be supported in the future, but not yet.`);
    }
    else{
      theCanvas.width = this.width;
      theCanvas.height = this.height;
      context.drawImage(this, 0, 0);
    }
    URL.revokeObjectURL(this.src);
  }
  img.src = URL.createObjectURL(document.getElementById('imageUpload').files[0]);
}

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for pointerdown, pointermove, and pointerup
// This allows user with touchscreens to draw... But we need a an extra line depending on function.
// Since hiding the overflow hides the scrollbar... and on desktop, this moves the page a little.
// That moves the canvas a little every time you click. Like trying to draw during an earthquake.
theCanvas.addEventListener('mousedown', (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
  brushColor = document.getElementById('color').value; //Modifies the global above
  brushThickness = document.getElementById('thickness').value; //This also modifies a global
  //document.body.style.overflow = 'hidden'; //Locks the screen in place while drawing...But hiding the scrollbar moves the window a bit on desktop browsers.
});
theCanvas.addEventListener('touchstart', (e) => {
  if(isDrawing){ //If we're already drawing, stop drawing, to allow for panning
    //Yes, this means only one drawing point at a time.
    //But this is more important than multi-draw at the moment.
    x = 0;
    y = 0;
    isDrawing = false;
    document.body.style.overflow = 'visible';
  }
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
  brushColor = document.getElementById('color').value; //Modifies the global above
  brushThickness = document.getElementById('thickness').value; //This also modifies a global
  document.body.style.overflow = 'hidden'; //Locks the screen in place while drawing
});

theCanvas.addEventListener('pointermove', (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('pointerup', (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
    document.body.style.overflow = 'visible';
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


/*
downloadImage:
Converts the current canvas contents into an image file and prompts the user to download.
Does not release the dataURL afterwards since I seem to have no way to track the user progress, so...
//TODO: See if I can *safely* release the DataURL without exploding user's downloads or blocking all the other threads.
*/
function downloadImage(){
  let tempDataURL = theCanvas.toDataURL();//This is PNG by default, don't see any need for other formats but if someone asks I might look into it.
  console.log(tempDataURL);
  let anchor = document.getElementById('downloadLink');
  anchor.href = tempDataURL;
  anchor.style.visibility = 'visible';
  anchor.click();
}

/*saveToGallery():
This takes the gallery image as a base64 image url
plunks it directly into an invisible form field as raw text,
then hits the send button for the user.
Yes, this uses the same form as uploading an image from the user's device.
It's something of a bodge, if the ElementID name didn't give it away already.*/
function saveToGallery(){
  let tempDataURL = theCanvas.toDataURL();
  let galleryForm = new FormData(document.getElementById('galleryForm'));
  document.getElementById('thisBeSomeHackery').value = tempDataURL;
  console.log(document.getElementById('galleryForm'));
  console.log(galleryForm.has('imageUpload'));
  let submitButton = document.getElementById('galleryButton');
  submitButton.click();
}


//TODO: Less hacky version of this.
//I can probably just remote load the image, but...
//Given how touchy htmlCanvas is with outside images,
//Copying the image upload code seemed the safest approach while building MVP.
if(theCanvas.hasAttribute('data-init')){ //Then there's an initial image to load
  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    if((maxWidth && maxHeight) && (this.width > maxWidth || this.height > maxHeight)){ //Basic gate to stop overly large images, to save the sorrow of being rejected by the backend after all your hard work.
      //You could bypass this by editing this code since it's all frontend, but... if you're reading this comment to try that, just go use GIMP or something, hackerman.
      alert(`Image is larger than allowed size. Maximum size is ${maxHeight} pixels high by ${maxWidth} pixels wide, but this image is ${this.height} pixels high by ${this.width} pixels wide. Image downscaling or larger images may be supported in the future, but not yet.`);
    }
    else{
      theCanvas.width = this.width;
      theCanvas.height = this.height;
      context.drawImage(this, 0, 0);
    }
    URL.revokeObjectURL(this.src);
  }
  img.src = theCanvas.getAttribute('data-init');
}