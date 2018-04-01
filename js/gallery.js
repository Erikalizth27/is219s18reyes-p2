// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/



var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}



/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo ');
			var max = totalImage - 1;
	if (mCurrentIndex == max) mCurrentIndex = 0;
	else mCurrentIndex = mCurrentIndex + 1;
	
	$('.thumbnail').attr("src",mImages[mCurrentIndex].img);
		$('#spnLocation').text(mImages[mCurrentIndex].location);
		$('#spnDescription').text(mImages[mCurrentIndex].description);
		$('#spnDate').text(mImages[mCurrentIndex].date);
}

// Counter for the mImages array
var mCurrentIndex = 0;



// XMLHttpRequest variable
//var mRequest = new XMLHttpRequest();
var mURL = "images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
// Do something interesting if file is opened successfully
if (mRequest.readyState == 4 && mRequest.status == 200) {
try {
// Let’s try and see if we can parse JSON
//mJson = JSON.parse(mRequest.responseText);
getArray(JSON.parse(mRequest.responseText));
animate();
// Let’s print out the JSON; It will likely show as "obj"
//console.log(mJson);
} catch(err) {
console.log(err.message)
}
}
};
mRequest.open("GET",mURL, true);
mRequest.send();




// Array holding GalleryImage objects (see below).
var mImages = [];
var totalImage = 0;
var showDetails = false;
function getArray(data){
	for(var x in data.images){
		var imagenes = new GalleryImage(data.images[x].imgPath,data.images[x].imgLocation,data.images[x].description,data.images[x].date);
	  	mImages.push(imagenes);
	  	totalImage++;
	}	
	//console.log(mImages);
	$('.thumbnail').attr("src",mImages[0].img);
	$('#spnLocation').text(mImages[0].location);
	$('#spnDescription').text(mImages[0].description);
	$('#spnDate').text(mImages[0].date);

	$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	$('#prevPhoto').click(function(){
		if (mCurrentIndex == 0) mCurrentIndex = (totalImage - 1);
		else mCurrentIndex = mCurrentIndex - 1;
		$('.thumbnail').attr("src",mImages[mCurrentIndex].img);
		$('#spnLocation').text(mImages[mCurrentIndex].location);
		$('#spnDescription').text(mImages[mCurrentIndex].description);
		$('#spnDate').text(mImages[mCurrentIndex].date);

	});
	$('#nextPhoto').click(function(){
		var max = totalImage - 1;
	if (mCurrentIndex == max) mCurrentIndex = 0;
	else mCurrentIndex = mCurrentIndex + 1;
	
	$('.thumbnail').attr("src",mImages[mCurrentIndex].img);
		$('#spnLocation').text(mImages[mCurrentIndex].location);
		$('#spnDescription').text(mImages[mCurrentIndex].description);
		$('#spnDate').text(mImages[mCurrentIndex].date);

	});
	$('.moreIndicator').click(function(){
		if (showDetails) {
			$('.details').eq(0).hide();
			showDetails = false;
		} else{
			$('.details').eq(0).show();
			showDetails = true;
		}
	});

	
	});
}




// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}


window.addEventListener('load', function() {
	
	//console.log('window loaded');

}, false);

function GalleryImage(img, location, description, date) {
	this.location = location;
	this.description = description;
	this.date = date;
	this.img = img;		
}
