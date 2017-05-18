var degToRad = Math.PI / 180.0;
/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, x, y, z) {
	CGFobject.call(this,scene);

	//Store the object's position 
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

	this.fish = new MyFish (this.scene);
	this.circle = new MyCircle (this.scene, 20, 1);

 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function() {


	this.scene.pushMatrix();
		this.scene.translate (this.x, this.y, this.z);
		this.fish.display();
	this.scene.popMatrix();

 };
