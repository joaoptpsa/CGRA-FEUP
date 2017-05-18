var degToRad = Math.PI / 180.0;
/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, x, y, z, type) {
	CGFobject.call(this,scene);

	//Store the object's position 
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

	this.type = type || Math.floor(Math.random()*2)+1;

	switch (this.type){
		case 1:
			this.target = new MyCircleTarget (this.scene);
			break;
		case 2:
			this.target = new MyFish (this.scene);
			break;
		default:
			this.target = new MyCircleTarget (this.scene);
			break;
	}
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.target.display();
	this.scene.popMatrix();

 };

 MyTarget.prototype.translateToPos = function (){
 	this.scene.translate (this.x, this.y, this.z);
 }
