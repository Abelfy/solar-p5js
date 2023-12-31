var Celestial = (function () {
    function Celestial(name, a, d, r, o, img) {
        this.arc = 0;
        this.distance = 0;
        this.radius = 0;
        this.orbitSpeed = 0;
        this.satelits = [];
        this.name = name;
        this.v = new p5.Vector();
        this.v.set(1, a / Celestial.MAGIC_COEFFICIENT, 0);
        this.distance = d;
        this.radius = r / Celestial.MAGIC_COEFFICIENT;
        this.v.mult(this.distance === 0 ? 0.5 : this.distance);
        this.arc = a / Celestial.MAGIC_COEFFICIENT;
        this.orbitSpeed = o / Celestial.MAGIC_COEFFICIENT;
        this.img = img;
    }
    Celestial.prototype.orbit = function () {
        this.arc = this.arc + this.orbitSpeed;
    };
    Celestial.prototype.show = function () {
        push();
        noStroke();
        noFill();
        texture(this.img);
        var v2 = new p5.Vector().set(1, 0, 1);
        var p = this.v.cross(v2);
        rotate(this.arc, p);
        translate(this.v.x, this.v.y, this.v.z);
        sphere(this.radius).specularMaterial(10);
        pop();
    };
    Celestial.MAGIC_COEFFICIENT = 2.5;
    return Celestial;
}());
var bg;
var jsonData;
var astersImages = [];
var asters = [];
var detailX;
var x = 0;
var y = 0;
var z = 0;
var cam;
function preload() {
    console.log("🚀 - Preload initialized - P5 is running");
    jsonData = loadJSON("../data/planets.json", {}, "json", function (json) {
        var planets = jsonData.planets;
        for (var i = 0; i < planets.length; i++) {
            astersImages.push(loadImage(planets[i].img, function () { }, console.error));
        }
    }, function (error) {
        console.error("Impossible to load data ! ", error);
    });
}
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    var planets = jsonData.planets;
    createCanvas(windowWidth, windowHeight, WEBGL);
    for (var i = 0; i < planets.length; i++) {
        var aster = planets[i];
        asters.push(new Celestial(aster.name, aster.arc, aster.distance, aster.radius, aster.orbitSpeed, astersImages[i]));
    }
    translate(750, 750, -5000).frameRate(60);
}
function windowResized() {
    console.log("🚀 - Resizing canvas - P5 is running");
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    console.log("🚀 - Drawing canvas - P5 is running");
    background(5);
    orbitControl(1, 1);
    if (keyIsDown(UP_ARROW)) {
        y += 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        y -= 10;
    }
    if (keyIsDown(LEFT_ARROW)) {
        x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        x += 10;
    }
    translate(x, y, z);
    for (var _i = 0, asters_1 = asters; _i < asters_1.length; _i++) {
        var aster = asters_1[_i];
        aster.show();
        if (aster.name === "Soleil") {
            var sun = asters[0];
            pointLight(255, 255, 255, sun.v.x, sun.v.y, sun.v.z);
        }
        aster.orbit();
    }
}
//# sourceMappingURL=build.js.map