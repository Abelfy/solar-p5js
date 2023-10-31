// GLOBAL VARS & TYPES


let bg: p5.Image;
let jsonData: any[];
let astersImages: p5.Image[] = [];
let asters: Celestial[] = [];
let detailX;

let x :number = 0;
let y :number = 0;
let z :number = 0;

let cam: p5.Camera;
function preload() {
  console.log("🚀 - Preload initialized - P5 is running");
    bg = loadImage("../data/background.jpg", () => {}, console.error);
    fetch("../data/planets.json")
        .then((response) => response.json())
        .then((json) => {
            jsonData = json;
            for (let i = 0; i < jsonData.length; i++) {
                astersImages.push(loadImage(this.jsonData[i].img, () => {} , console.error));
            }
        });
}

function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight, WEBGL)
    for (let i = 0; i < jsonData.length; i++) {
        let aster = jsonData[i];
        asters.push(
            new Celestial(aster.name, aster.arc, aster.distance, aster.radius, aster.orbitSpeed, astersImages[i])
        );
    }
    translate(750,750,-5000).frameRate(60);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
    console.log("🚀 - Resizing canvas - P5 is running");
    resizeCanvas(windowWidth, windowHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
    console.log("🚀 - Drawing canvas - P5 is running");
    // CLEAR BACKGROUND
    background(5);
    //image(bg,windowWidth/2,windowHeight/2)
    orbitControl(1, 1);

    if(keyIsDown(UP_ARROW)){
      y+= 10
    }
    if(keyIsDown(DOWN_ARROW)){
      y-= 10
    }
    if(keyIsDown(LEFT_ARROW)){
      x-= 10
    }
    if(keyIsDown(RIGHT_ARROW)){
      x+= 10
    }
    translate(x,y,z);
    //pointLight(255, 255, 255, mouseX, mouseY, 150);
    // CENTER OF SCREEN
    for (const aster of asters) {
        aster.show();
        if (aster.name === "Soleil") {
            let sun = asters[0];
            pointLight(255, 255, 255, sun.v.x, sun.v.y, sun.v.z);
        }
        aster.orbit();
    }
}
