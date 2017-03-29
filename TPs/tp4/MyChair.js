/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyChair(scene) {
	CGFobject.call(this,scene);
	this.cube= new MyUnitCubeQuad(this.scene)

	this.materialChair = new CGFappearance(this.scene);
	this.materialChair.setAmbient(0.6, 0.32, 0.004,1);
	this.materialChair.setSpecular(0.1,0.1,0.1,1);
	this.materialChair.setDiffuse(0.1,0.1,0.1,1);
	this.materialChair.setShininess(1);
	this.materialChair.loadTexture ("../resources/images/wood_chair.png");

};

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor=MyChair;

MyChair.prototype.display = function () {
	// LEGS
	this.scene.pushMatrix();
		this.scene.translate(0.8,0.875,1);
		this.scene.scale(0.2,1.75,0.2);
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0.8,0.875,-1);
		this.scene.scale(0.2,1.75,0.2);
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.8,0.875,1);
		this.scene.scale(0.2,1.75,0.2);
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-0.8,0.875,-1);
		this.scene.scale(0.2,1.75,0.2);
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();

		// Seat
	this.scene.pushMatrix();
		this.scene.translate(0,1.9,0);
		this.scene.scale(1.8,0.3,2.2);
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();
	
    // Back Holder
	this.scene.pushMatrix();
		this.scene.translate(0,3.2,-1);
		this.scene.scale(1.8,2.3,0.2);
		this.materialChair.apply();
		this.cube.display();
	this.scene.popMatrix();

};