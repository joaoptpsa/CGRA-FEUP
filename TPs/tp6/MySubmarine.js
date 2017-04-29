var degToRad = Math.PI / 180.0;
/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder (this.scene, 20, 8);
	this.halfSphere = new MyHalfSphere (this.scene, 20, 8);
	this.circle = new MyCircle (this.scene, 20, 1);
	this.trapezoidalPrism = new MyTrapezoidalPrism (this.scene);

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.33, 0.33, 0.33, 1);
	this.materialMetal.setSpecular(0.9,0.9,0.9,1);	
	this.materialMetal.setDiffuse(0.3,0.3,0.3,1);	
	this.materialMetal.setShininess(30);
	this.materialMetal.loadTexture("resources/images/metal.jpg");
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function() {

	//Main Body
	this.scene.pushMatrix();
		this.scene.scale (0.73, 1 , 4.08);
		this.materialMetal.apply();
		this.cylinder.display ();
	this.scene.popMatrix();
	
	//Back HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 4.08);
		this.scene.scale (0.73, 1 , 0.46);
		this.materialMetal.apply();
		this.halfSphere.display ();
	this.scene.popMatrix();
	
	//Front HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0);
		this.scene.scale (0.73, 1 , 0.46);
		this.scene.rotate (180*degToRad, 0, 1, 0);
		this.materialMetal.apply();
		this.halfSphere.display ();
	this.scene.popMatrix();

	//Top cylinder
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 2);
		this.scene.scale (0.73, 1.57 , 0.88);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.materialMetal.apply();
		this.cylinder.display ();
	this.scene.popMatrix();

	//Top cylinder "face"
	this.scene.pushMatrix();
		this.scene.translate (0, 1.57, 2);
		this.scene.scale (0.73, 1 , 0.88);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.materialMetal.apply();
		this.circle.display ();
	this.scene.popMatrix();

	//Vertical Periscope
	this.scene.pushMatrix();
		this.scene.translate (0, 1.57, 2.4);
		this.scene.scale (0.05, 1 , 0.05);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.materialMetal.apply();
		this.cylinder.display ();
	this.scene.popMatrix();

	//Horizontal Periscope
	this.scene.pushMatrix();
		this.scene.translate (0, (1.57 + 1 - 0.05), (2.4-0.05));
		this.scene.scale (0.05, 0.05 , 0.2);
		//this.scene.rotate (0*degToRad, 1, 0 ,0);
		this.materialMetal.apply();
		this.cylinder.display ();
	this.scene.popMatrix();

	//Horizontal Periscope Face
	this.scene.pushMatrix();
		this.scene.translate (0, (1.57 + 1 - 0.05), (2.4-0.05 + 0.2));
		this.scene.scale (0.05, 0.05 , 1);
		//this.scene.rotate (0*degToRad, 1, 0 ,0);
		this.materialMetal.apply();
		this.circle.display ();
	this.scene.popMatrix();

	//Vertical Back Trapezoid
	this.scene.pushMatrix();
		//this.scene.translate (0, (1.57 + 1 - 0.05), (2.4-0.05 + 0.2));
		this.scene.scale (3, 3 , 3);
		this.scene.rotate (90*degToRad, 0, 0, 1);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.materialMetal.apply();
		this.trapezoidalPrism.display ();
	this.scene.popMatrix();

 };

/*
 MySubmarine.prototype.changeDir (){

 }

 
 MySubmarine.prototype.changeSpeed (){

 }
 */