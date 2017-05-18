var degToRad = Math.PI / 180.0;
var X = 0;
var Y = 1;
var Z = 2;

/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, x, y, z, type) {
	CGFobject.call(this,scene);

	//Store the object's position 
	this.pos = [];
	this.pos.push (x||0, y||0, z||0)

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
 	this.scene.translate (this.pos[X], this.pos[Y], this.pos[Z]);
 };