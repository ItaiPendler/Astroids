//on this canvas we will draw with the context given.
var canvas;

//when checked, the speed will be reduced to half.
var slowMotionModeCheckBox;

//DO NOT TOUCH THIS U STUPID BOI
var updateTimerID;

//the frames per second at which the game will run.
const FPS = 60;

// the state of the game.
var gameover = false;

//the current number of astroids.
var numOfAsteroids=0;

//the speed of the astroid movement;
var astroidSpeed;

//the default speed of the astroids.
const DEAFULT_ASTROID_SPEED = 5;

//the speed for the slow motion.
const SLOW_MOTION_SPEED = 0.5;

// the max size of an astroid.
const astroidMaxSize = 100;

//the starting amount for astroids
const startingAstroidNum = 4;

//average number of points in an astroid.
const astroidVerticeNum = 8;

// after how many clicks will the astroid break;
const rank = 2;

//this will store the astroids.
var astroids = [];


function Init() {
  setup();
  update();
}

function setup() {
  canvas = document.getElementById('canvas');

  canvas.addEventListener('click', function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    mouseClick(x, y);
  }, false);

  slowMotionModeCheckBox = document.getElementById('slowModeCheckBox');
  window.addEventListener(
    "keydown",
    (event) => {
      if(event.key === 's'){
        slowMotionModeCheckBox.click();
      }
    },
    true,
  );
  slowMotionModeCheckBox.addEventListener('change', function (event) {
    if (slowMotionModeCheckBox.checked) {
      //we are in slow motion mode, so we set the speed to slow motion speed.
      astroidSpeed = SLOW_MOTION_SPEED;
    } else {
      //we are not in slow motion mode, so we set the speed to normal speed.
      astroidSpeed = DEAFULT_ASTROID_SPEED;
    }
  });

  //#region Ship Stuff
  //Ori's stuff goes here!
  //#endregion

  //setting the speed of the astroids to the default speed.
  astroidSpeed = DEAFULT_ASTROID_SPEED;

  createAstroids(startingAstroidNum);
}

function gameOver() {
  let gameovertext= document.getElementById('gameover');
  gameovertext.innerText="you won";
}

function update() {

  if(numOfAsteroids===0){
    gameover=true;
    gameOver();
  }

  //region Move the astroids
  for (let i = 0; i < astroids.length; i++) {
    astroids[i].x += astroids[i].xVelocity * astroidSpeed;
    astroids[i].y += astroids[i].yVelocity * astroidSpeed;

    //region Handle the edges of the canvas.
    //we are outside of the right of the canvas!
    if (astroids[i].x >= canvas.width) {
      astroids[i].x = 0;
    }
    //we are outside of the left of the canvas!
    else if (astroids[i].x <= 0) {
      astroids[i].x = canvas.width;
    }

    //we are outside of the bottom of the screen!
    if (astroids[i].y >= canvas.height) {
      astroids[i].y = 0;
    }
    //we are outside of the top of the canvas!
    else if (astroids[i].y <= 0) {
      astroids[i].y = canvas.height;
    }
    //endregion

  }

  //endregion

  draw();
  clearInterval(updateTimerID);
  updateTimerID = setInterval(update, 1000 / FPS)
}


function createAstroids(numToCreate) {

  for (let i = 0; i < numToCreate; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.width);
    astroids.push(createNewAstroid(x, y));
  }
}

function printAstroids() {
  for (let i = 0; i < startingAstroidNum; i++) {
    let x = astroids[i].x;
    let y = astroids[i].y;
    let r = astroids[i].radius;
    let a = astroids[i].angle;
    let points = astroids[i].verticesNum;
    console.log(a + ", " + r + ", " + x + ", " + y + ", " + points);
  }
}

function destroyAstroid(index, x, y) {
  var removedAstroid = astroids.splice(index, 1);
  if (removedAstroid[0].radius >= astroidMaxSize / (rank * 2)) {
    astroids.push(createNewAstroid(x, y, removedAstroid[0].radius));
    astroids.push(createNewAstroid(x, y, removedAstroid[0].radius));
  }
  numOfAsteroids--;
}

function mouseClick(x, y) {
  x = Math.floor(x);
  y = Math.floor(y);

  let length = astroids.length;
  for (let i = 0; i < length; i++) {

    let radius = astroids[i].radius;

    // did we click on this astroid?
    let distance = getDistance(astroids[i].x, astroids[i].y, x, y);
    if (distance < radius) {
      destroyAstroid(i, x, y);
      return;
    }
  }
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

//region Creating a new Astroid.

function createNewAstroid(x, y, astroidSize = astroidMaxSize) {

  //the position of the astroid on the X axis.
  let newX = x;

  //the position of the astroid on the Y axis.
  let newY = y;

  //the velocity of the astroid on the X axis.
  let xVelocityN = Math.random() * (Math.random() < 0.5 ? 1 : -1);

  //the velocity of the astroid on the Y axis.
  let yVelocityN = Math.random() * (Math.random() < 0.5 ? 1 : -1);

  //the radius of the astroid.
  let radiusN = astroidSize / 2;

  //the angle of the astroid.
  let angleN = Math.random() * Math.PI * 2;

  //for example:               random          *  10                     +   5                   =  random number between 5 - 15;
  let points = Math.floor(Math.random() * (astroidVerticeNum + 1) + astroidVerticeNum / 2);

//  console.log(newX + ", " + newY + ", " + xVelocityN + ", " + yVelocityN + ", " + radiusN + ", " + angleN + ", " + points);

  numOfAsteroids++;

  return new Asteroid(newX,newY,xVelocityN,yVelocityN, radiusN, angleN, points);
  // {
  //
  //
  //   x: newX,
  //
  //   y: newY,
  //
  //   xVelocity: xVelocityN,
  //
  //   yVelocity: yVelocityN,
  //
  //   radius: radiusN,
  //
  //   angle: angleN, // this is in radians!!
  //
  //   verticesNum: points
  // };
}

//endregion

function draw(){

  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;


    //drawing space
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);


    //drawing the astroids
    context.strokeStyle = "green";
    context.lineWidth = 1.5;
    var x, y, r, a, points;
    for (let i = 0; i < astroids.length; i++) {

      //get the attributes of the astroid
      x = astroids[i].x;
      y = astroids[i].y;
      r = astroids[i].radius;
      a = astroids[i].angle;
      points = astroids[i].verticesNum;

      //draw the shape
      context.beginPath();
      context.moveTo(
        x + r * Math.cos(a),
        y + r * Math.sin(a)
      );

      for (let j = 1; j < points; j++) {
        context.lineTo(
          x + r * Math.sin(a + j * Math.PI * 2 / points),
          y + r * Math.cos(a + j * Math.PI * 2 / points),
        )
      }
      //dont forget to close the path!
      context.closePath();
      //this draws everything the the canvas.
      context.stroke();

      //draw the astroid.

    }


  }
}
