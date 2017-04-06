/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);
	this.cylinder = new MyCylinder (this.scene, 12, 1);
	this.topFace = new MyCircle (this.scene, 12, 1);


	this.materialClock = new CGFappearance(this.scene);
	this.materialClock.setAmbient(0.6, 0.32, 0.004,1);
	this.materialClock.setSpecular(0.1,0.1,0.1,1);
	this.materialClock.setDiffuse(0.1,0.1,0.1,1);
	this.materialClock.setShininess(1);
	this.materialClock.loadTexture ("resources/images/wood_chair.png");
	
	this.materialTopOfClock = new CGFappearance(this.scene);
	this.materialTopOfClock.setAmbient(1, 1, 1,1);
	this.materialTopOfClock.setSpecular(0.5,0.5,0.5,1);
	this.materialTopOfClock.setDiffuse(0.5,0.5,0.5,1);
	this.materialTopOfClock.setShininess(60);
	this.materialTopOfClock.loadTexture ("resources/images/clock.png");

};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function () {
	
	// Cylinder
	this.scene.pushMatrix();
		this.materialClock.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1); //lets put it at the top of the cylinder
		this.materialTopOfClock.apply();
		this.topFace.display();
	this.scene.popMatrix();


};