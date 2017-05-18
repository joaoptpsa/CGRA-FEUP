var degToRad = Math.PI / 180.0;
/**
 * MySubmarinePeriscope
 * @constructor
 */
 function MySubmarinePeriscope(scene) {
	CGFobject.call(this,scene);

	this.periscopeY = 0;

	this.periscopeTheta = 0;

	this.cylinder = new MyCylinder (this.scene, 20, 8);
	this.circle = new MyCircle (this.scene, 20, 1);
 };

 MySubmarinePeriscope.prototype = Object.create(CGFobject.prototype);
 MySubmarinePeriscope.prototype.constructor = MySubmarinePeriscope;

 MySubmarinePeriscope.prototype.display = function() {

	//Vertical Periscope
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0);
		this.scene.scale (0.05, 1 , 0.05);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.cylinder.display ();
	this.scene.popMatrix();

	//Horizontal Periscope
	this.scene.pushMatrix();
		this.scene.translate (0, (1-0.05), (-0.05));
		this.scene.scale (0.05, 0.05 , 0.2);
		//this.scene.rotate (0*degToRad, 1, 0 ,0);
		this.cylinder.display ();
	this.scene.popMatrix();

	//Horizontal Periscope Face
	this.scene.pushMatrix();
		this.scene.translate (0, (1 - 0.05), (-0.05+0.2));
		this.scene.scale (0.05, 0.05 , 1);
		//this.scene.rotate (0*degToRad, 1, 0 ,0);
		this.circle.display ();
	this.scene.popMatrix();

};

MySubmarinePeriscope.prototype.translateToPos = function(){
	this.scene.translate (0, this.periscopeY, 0);
};

MySubmarinePeriscope.prototype.rotateToPos = function(){
	this.scene.rotate (this.periscopeTheta,0,1,0);
};

MySubmarinePeriscope.prototype.updatePeriscopeRotation = function(rotationFactor){
		this.periscopeTheta += rotationFactor;
};

MySubmarinePeriscope.prototype.updatePeriscopeHeight = function(maxMinHeight, yDelta){
	if ((this.periscopeY+yDelta>=maxMinHeight) && (this.periscopeY+yDelta<=0)){
		this.periscopeY+=yDelta;
	}
};