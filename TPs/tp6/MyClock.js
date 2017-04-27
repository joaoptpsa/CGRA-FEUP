var degToRad = Math.PI / 180.0;

/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyClock(scene) {
	CGFobject.call(this,scene);

	//Get the time in ms so we can update the clock relatively to this
	var d = new Date();
	this.oldCurrTime = d.getTime();

	this.cylinder = new MyCylinder (this.scene, 12, 1);
	this.topFace = new MyCircle (this.scene, 12, 1);
	this.secondPointer = new MyClockHand (this.scene);
	this.secondPointer.setAngle (90);
	this.minutePointer = new MyClockHand (this.scene);
	this.minutePointer.setAngle (180);
	this.hourPointer = new MyClockHand (this.scene);
	this.hourPointer.setAngle(270);


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

	this.pointerMaterial = new CGFappearance(this.scene);
	this.pointerMaterial.setAmbient(0,0,0,0);
	this.pointerMaterial.setDiffuse(0,0,0,0);
	this.pointerMaterial.setSpecular(0,0,0,0);
	this.pointerMaterial.setShininess(0);

};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function () {
	
	// Cylinder
	this.scene.pushMatrix();
		this.materialClock.apply();
		this.cylinder.display();
	this.scene.popMatrix();

	//Top Face
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1); //lets put it at the top of the cylinder
		this.materialTopOfClock.apply();
		this.topFace.display();
	this.scene.popMatrix();

	//Seconds Pointer
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.01);
		this.scene.rotate (-this.secondPointer.angle *degToRad, 0, 0 ,1);
		this.pointerMaterial.apply();
		this.secondPointer.display();
	this.scene.popMatrix();

	//Minute Pointer
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.015); 
		this.scene.rotate (-this.minutePointer.angle *degToRad, 0, 0 ,1);
		this.scene.scale (1, 0.8, 1);
		this.pointerMaterial.apply();
		this.minutePointer.display();
	this.scene.popMatrix();

	
	//Hours Pointer
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1.02);
		this.scene.rotate (-this.hourPointer.angle *degToRad, 0, 0 ,1);
		this.scene.scale (1, 0.6, 1);
		this.pointerMaterial.apply();
		this.hourPointer.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function (currTime){ //CurrTime = Current time in ms
	var deltaTime = currTime - this.oldCurrTime;
	this.oldCurrTime = currTime;

	var secondsInc = 360/60;
	var minutesInc = secondsInc/60;
	var hoursInc = minutesInc/12; //A clock goes twice a day through the 00 hour 

	this.secondPointer.setAngle (this.secondPointer.angle + (secondsInc * (deltaTime / 1000)));
	this.minutePointer.setAngle (this.minutePointer.angle + (minutesInc * (deltaTime / 1000)));
	this.hourPointer.setAngle (this.hourPointer.angle + (hoursInc * (deltaTime / 1000)));
};