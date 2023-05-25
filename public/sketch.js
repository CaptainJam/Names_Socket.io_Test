
let text1 = sessionStorage.getItem('username');

var socket = io();
var slider1Value, slider2Value; // Will be set by initialSliderValues event
let sliderArray = [];
// Setup connection
//var socket = io.connect('http://localhost:3000');

// Setup event listeners immediately upon connection
socket.on('connect', function() {
    console.log('Connected to server');

    let sliderValues = {};
    

socket.on('initialSliderValues', function(data) {
    sliderValues = data;  // Store all the slider values

    // Convert the slider values object into an array
    for (let i = 1; i <= Object.keys(sliderValues).length; i++) {
        sliderArray[i-1] = sliderValues['slider' + i];
    }
});

socket.on('sliderChange', function(data) {
    sliderValues[data.name] = data.value;  // Update the value of the changed slider

    // Update the corresponding value in the array
    let sliderIndex = parseInt(data.name.replace('slider', '')) - 1;
    sliderArray[sliderIndex] = data.value;
});

});

function preload() {
   // song = loadSound('Rosie.mp3');
    //song = loadSound("Freaks.mp3");
    font1 = loadFont('EastmanAlternate-Heavy.otf');
    
  }

function setup() {
    createCanvas(400,400, WEBGL);
    background(160);
    textFont(font1);
    textSize(50);
    textAlign(CENTER, CENTER);
   // song.play();
  amp = new p5.Amplitude();



  r = 0;
  g = 0;

  colord =0;
colorcount= 255;
/*
    socket.on('initialSliderValues', function(data) {
        console.log('Initial slider values:', data); // New line
    
        slider1Value = data.slider1;
        slider2Value = data.slider2;
    });

    socket.on('sliderChange', function(data) {
        console.log('Slider change:', data);
        if (data.name === 'slider1') {
            slider1Value = data.value;
        } else if (data.name === 'slider2') {
            slider2Value = data.value;
        }
    });*/
    

  }


  function draw(){
    background(160);
    let vol = amp.getLevel();
  /*  textAlign(CENTER, CENTER);
    textSize((map(sliderArray[0],0,127,0,255)));
    print(sliderArray[0]);
    
    
    fill(map(sliderArray[1],0,127,0,255),map(sliderArray[1],0,127,0,255),map(sliderArray[1],0,127,0,255));
    */

    if (colorcount >= 255){
        colorcount=255;
        colord =0;
        r = colorcount;
        g =0;
      }
    
      if (colorcount<=-255){
        colorcount = -255;
        colord =1;
        r=0;
        g=colorcount*-1;
      }
    
      if(colord ==1){
        colorcount += 5;
      }
      if(colord ==0){
        colorcount -=5;
      }
      if (colorcount==0){
        r=0;
        g=0;
      }
      if (colorcount>0){
        r=colorcount;
        g=0;
      }
      if (colorcount<0){
        g = colorcount*-1;
        r=0;
      }
vol = sliderArray[19];

    background(255,r,g);
    push()
    fill(r,g,255);
    rotateX(sliderArray[1] * 0.01);
    rotateY(sliderArray[0] * 0.01);
    rotateZ(0.01 * frameCount);
    noStroke();
    box(sliderArray[16],map(vol, 1, 127, 1, 6*sliderArray[17]),sliderArray[18]);
    pop()
   console.log(vol);
    fill(g, 255, r);
      text(text1, 00,-170);
   // console.log(b);

    //console.log(b[1]);

  }

  function touchStarted() {
    getAudioContext().resume();
  }
  