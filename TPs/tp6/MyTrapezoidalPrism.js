var degToRad = Math.PI / 180.0;

/**
 * MyTrapezoidalPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTrapezoidalPrism(scene) {
	CGFobject.call(this,scene);

	this.trapezoid= new MyTrapezoid(this.scene);
	this.quad = new MyQuad (this.scene);;

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.33, 0.33, 0.33, 1);
	this.materialMetal.setSpecular(0.9,0.9,0.9,1);	
	this.materialMetal.setDiffuse(0.3,0.3,0.3,1);	
	this.materialMetal.setShininess(30);
	this.materialMetal.loadTexture("resources/images/metal.jpg");

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
		this.scene.translate(0.3749,0,0);
		this.scene.rotate (14.03*degToRad, 0, 0, 1);
		this.scene.rotate (90*degToRad, 0, 1, 0);
		this.scene.scale (0.1, 1.03078,1);
		this.quad.display();
	this.scene.popMatrix();

	//Left side face
	this.scene.pushMatrix();
		this.scene.translate(-0.3749,0,0);
		this.scene.rotate (-14.03*degToRad, 0, 0, 1);
		this.scene.rotate (-90*degToRad, 0, 1, 0);
		this.scene.scale (0.1, 1.03078,1);
		this.quad.display();
	this.scene.popMatrix();

	//Upper side face
	this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate (270*degToRad, 1, 0, 0);
		this.scene.scale (0.5, 0.1, 1);
		this.quad.display();
	this.scene.popMatrix();

	//Bottom side face
	this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.scene.scale (1, 0.1, 1);
		this.quad.display();
	this.scene.popMatrix();
};