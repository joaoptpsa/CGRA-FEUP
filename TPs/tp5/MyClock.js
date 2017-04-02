/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene) {
	CGFobject.call(this,scene);
	
	this.cylinder = new MyCylinder (this, 12, 1);
/*
	this.materialTopOfClock = new CGFappearance(this.scene);
	this.materialTopOfClock.setAmbient(1, 1, 1,1);
	this.materialTopOfClock.setSpecular(0.5,0.5,0.5,1);
	this.materialTopOfClock.setDiffuse(0.5,0.5,0.5,1);
	this.materialTopOfClock.setShininess(60);
	this.materialTopOfClock.loadTexture ("resources/images/clock.png");
*/
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function () {
	
	// Cylinder
	this.scene.pushMatrix();;
		//this.materialTopOfClock.apply();
		this.cylinder.display();
	this.scene.popMatrix();


};