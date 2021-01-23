
// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/wj5sL1qMb/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

let WMT;
let ony3;
let yourFada;

let WMTFade = 0;
let ony3Fade = 0;
let yourFadaFade = 0;



// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  WMT = loadImage('https://res.cloudinary.com/dbkakssug/image/upload/v1610695408/WMT_1.png');
  ony3 = loadImage('https://res.cloudinary.com/dbkakssug/image/upload/v1610695408/ony3_1.png');
  yourFada = loadImage('https://res.cloudinary.com/dbkakssug/image/upload/v1610695408/YourFada_1.png');
}

function setup() {
    createCanvas(windowWidth, 1080);
    // Create the video
    video = createCapture(VIDEO);
    video.size(windowWidth, 1080);
    video.hide();
  
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
}

function draw() {
//   imageMode(CORNER);
  background(0)
  image(video, 0, 0, windowWidth, 1080);

  // Draw the video
 

    workWithPhoto(WMT,WMTFade,label,'WMT')
    workWithPhoto(ony3,ony3Fade,label,'Ony3')
    workWithPhoto(yourFada,yourFadaFade,label,'Your fada')
}

function workWithPhoto(photo, fade, label, text) {
    if (label == text) {
        fade = 255;
      }
      if (fade > 0) {
        tint(255, fade);
        image(photo, 0, 0, 500, 480);
        fade -= 10;
      }

      return {photo, fade, label}
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = video;
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.

  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
