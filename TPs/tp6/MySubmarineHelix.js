var degToRad = Math.PI / 180.0;
/**
 * MySubmarineHelix
 * @constructor
 */
 function MySubmarineHelix(scene) {
	CGFobject.call(this,scene);

	this.helixAngle = 0;

	this.halfSphere = new MyHalfSphere (this.scene, 20, 8);
	this.parallelepiped = new MyParallelipiped (this.scene, 0.35, 0.05, 0.05);
	this.twoFaced = new MyTwoFacedCylinder (this.scene, 20 ,8);
 };

 MySubmarineHelix.prototype = Object.create(CGFobject.prototype);
 MySubmarineHelix.prototype.constructor = MySubmarineHelix;

 MySubmarineHelix.prototype.display = function() {

	//MyCylinder class generates a cylinder with 1 unit of radius -> 2 units of diameter
	//Parallelepiped
	this.scene.pushMatrix();
		this.rotateHelix();
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.parallelepiped.display ();
	this.scene.popMatrix();

	//TwoFaced Cylinder
	this.scene.pushMatrix();
		this.scene.scale (0.4, 0.4 , 0.25);
		this.twoFaced.display ();
	this.scene.popMatrix();

	//halfSphere
	this.scene.pushMatrix();
		this.rotateHelix();
		this.scene.translate (0, 0, 0.05/2);
		this.scene.scale (0.05, 0.05 , 0.0625);
		this.halfSphere.display ();
	this.scene.popMatrix();

 };


MySubmarineHelix.prototype.rotateHelix = function(){
	this.scene.rotate (this.helixAngle, 0, 0, 1);
};

MySubmarineHelix.prototype.updateHelixAngle = function(deltaTime){
	var ratio =  this.scene.speed / 1; //Assuming 1 is minimum speed (it really is 0.1)
	
	this.helixAngle += (Math.PI*2)*(deltaTime/1000)*ratio;
};