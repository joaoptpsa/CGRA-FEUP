var degToRad = Math.PI / 180.0;
/**
 * MySubmarineHelix
 * @constructor
 */
 function MySubmarineHelix(scene) {
	CGFobject.call(this,scene);

	this.halfSphere = new MyHalfSphere (this.scene, 20, 8);
	this.parallelepiped = new MyParallelipiped (this.scene, 0.35, 0.05, 0.05);
	this.twoFaced = new MyTwoFacedCylinder (this.scene, 20 ,8);
 };

 MySubmarineHelix.prototype = Object.create(CGFobject.prototype);
 MySubmarineHelix.prototype.constructor = MySubmarineHelix;

 MySubmarineHelix.prototype.display = function() {

	//MyCylinder class generates a cylinder with 1 unit of radius -> 2 units of diameter
	//Left Parallelepiped
	this.scene.pushMatrix();
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.parallelepiped.display ();
	this.scene.popMatrix();

	//Left twoFaced Cylinder
	this.scene.pushMatrix();
		this.scene.translate (0, 0, -0.25/2);
		this.scene.scale (0.4/2, 0.4/2 , 0.25);
		this.twoFaced.display ();
	this.scene.popMatrix();

	//Left halfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0.05/2);
		this.scene.scale (0.05, 0.05 , 0.0625);
		this.halfSphere.display ();
	this.scene.popMatrix();



 };

/*
 MySubmarineHelix.prototype.changeDir (){

 }

 
 MySubmarineHelix.prototype.changeSpeed (){

 }
 */