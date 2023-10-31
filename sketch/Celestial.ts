class Celestial {
    static MAGIC_COEFFICIENT = 2.5;
    name: string;
    arc: number = 0;
    distance: number = 0;
    radius: number = 0;
    orbitSpeed: number = 0;
    v: p5.Vector;
    satelits: Celestial[] = [];
    img: p5.Image;

    constructor(name: string, a: number, d: number, r: number, o: number, img: p5.Image) {
        this.name = name;
        this.v = new p5.Vector();
        this.v.set(1, a / Celestial.MAGIC_COEFFICIENT, 0);
        this.distance = d / Celestial.MAGIC_COEFFICIENT;
        this.radius = r / Celestial.MAGIC_COEFFICIENT;
        this.v.mult(this.distance === 0 ? 0.5 : this.distance);
        this.arc = a / Celestial.MAGIC_COEFFICIENT;
        this.orbitSpeed = o / Celestial.MAGIC_COEFFICIENT;

        this.img = img;
    }

    public orbit() {
        this.arc = this.arc + this.orbitSpeed;
    }

    public show() {
        push();
        noStroke();
        noFill();
        texture(this.img);
        let v2 = new p5.Vector().set(1, 0, 1);
        let p = this.v.cross(v2);
        rotate(this.arc, p);
        translate(this.v.x, this.v.y, this.v.z);
        sphere(this.radius).specularMaterial(10);
        pop();
    }
}
