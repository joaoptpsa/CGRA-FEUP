var degToRad = Math.PI / 180.0;
/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, x, y, z) {
	CGFobject.call(this,scene);

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function() {
 	
	this.scene.pushMatrix();
	this.scene.popMatrix();

 };
