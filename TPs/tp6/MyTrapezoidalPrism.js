var degToRad = Math.PI / 180.0;

/**
 * MyTrapezoidalPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTrapezoidalPrism(scene, a, b) {
	CGFobject.call(this,scene);

	console.log(a);
	console.log(b);

	//a is the smaller side
	//b is the bigger side
	this.a = a || 0.5;
    this.b = b || 1;

   	if (this.a<=this.b){
		//do nothing
	}
	else{
		this.temp = this.a;
		this.a = this.b;
		this.b = this.temp;
	}

	console.log(this.a);
	console.log(this.b);


    this.c = Math.sqrt(1 + Math.pow(((this.b-this.a)/2),2));

    this.g =(this.b-this.a)/2;
    //console.log(this.g);
    this.h = (0.5)* Math.sqrt((4*Math.pow(this.c,2))-Math.pow(this.b-this.a,2));
    //console.log(this.h);
    this.alpha = Math.acos ((Math.pow(this.g,2)+Math.pow(this.c,2)-Math.pow(this.h,2))/(2*this.g*this.c));
    //console.log(this.alpha);

    this.x = (this.a/2)+ ((this.h/2)/Math.tan(this.alpha));

	this.trapezoid= new MyTrapezoid(this.scene, this.a , this.b);
	this.quad = new MyQuad (this.scene);;

};

MyTrapezoidalPrism.prototype = Object.create(CGFobject.prototype);
MyTrapezoidalPrism.prototype.constructor=MyTrapezoidalPrism;

MyTrapezoidalPrism.prototype.display = function () {
	
    //Front trapezoid
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.05);
		this.trapezoid.display();
	this.scene.popMatrix();

    //Back trapezoid
	this.scene.pushMatrix();
		this.scene.translate(0,0,-0.05);
		this.scene.rotate (180*degToRad, 1, 0, 0);
		this.scene.rotate (180*degToRad, 0, 0, 1);
		this.trapezoid.display();
	this.scene.popMatrix();

	//Right side face
	this.scene.pushMatrix();
		this.scene.translate(this.x,0,0);
		this.scene.rotate ((Math.PI/2-this.alpha), 0, 0, 1);
		this.scene.rotate (90*degToRad, 0, 1, 0);
		this.scene.scale (0.1, this.c,1);
		this.quad.display();
	this.scene.popMatrix();

	//Left side face
	this.scene.pushMatrix();
		this.scene.translate(-this.x,0,0);
		this.scene.rotate (-(Math.PI/2-this.alpha), 0, 0, 1);
		this.scene.rotate (-90*degToRad, 0, 1, 0);
		this.scene.scale (0.1, this.c,1);
		this.quad.display();
	this.scene.popMatrix();

	//Upper side face
	this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate (270*degToRad, 1, 0, 0);
		this.scene.scale (this.a, 0.1, 1);
		this.quad.display();
	this.scene.popMatrix();

	//Bottom side face
	this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.scene.scale (this.b, 0.1, 1);
		this.quad.display();
	this.scene.popMatrix();
};