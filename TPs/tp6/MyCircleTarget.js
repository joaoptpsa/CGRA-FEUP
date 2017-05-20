var degToRad = Math.PI / 180.0;
/**
 * MyCircleTarget
 * @constructor
 */
 function MyCircleTarget(scene) {
	CGFobject.call(this,scene);

	this.circle = new MyCircle (this.scene, 20, 0.5);

	this.materialCircle = new CGFappearance(this.scene);
	this.materialCircle.setAmbient(0.6, 0.32, 0.004,1);
	this.materialCircle.setSpecular(0.1,0.1,0.1,1);
	this.materialCircle.setDiffuse(0.8,0.8,0.8,1);
	this.materialCircle.setShininess(10);
	this.materialCircle.loadTexture("resources/images/target.png");
 };

 MyCircleTarget.prototype = Object.create(CGFobject.prototype);
 MyCircleTarget.prototype.constructor = MyCircleTarget;

 MyCircleTarget.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.materialCircle.apply();
		this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate (180*degToRad, 0, 1, 0);
		this.materialCircle.apply();
		this.circle.display();
	this.scene.popMatrix();

 };
