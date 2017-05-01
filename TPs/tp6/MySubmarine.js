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
	this.rudderTrapezoidalPrism = new MyTrapezoidalPrism (this.scene, 1.64, 2.34);
	this.towerTrapezoidalPrism = new MyTrapezoidalPrism (this.scene, 1, 1.42);
	this.helix = new MySubmarineHelix (this.scene);

	this.bodyAppearance1 = new CGFappearance(this.scene);
	this.bodyAppearance1.setAmbient(0.33, 0.33, 0.33, 1);
	this.bodyAppearance1.setSpecular(0.9,0.9,0.9,1);	
	this.bodyAppearance1.setDiffuse(0.3,0.3,0.3,1);	
	this.bodyAppearance1.setShininess(30);
	this.bodyAppearance1.loadTexture(this.scene.submarineAppearances[0][0]);

	this.bodyAppearance2 = new CGFappearance(this.scene);
	this.bodyAppearance2.setAmbient(0.33, 0.33, 0.33, 1);
	this.bodyAppearance2.setSpecular(0.2,0.2,0.2,1);	
	this.bodyAppearance2.setDiffuse(0.2,0.2,0.2,1);	
	this.bodyAppearance2.setShininess(10);
	this.bodyAppearance2.loadTexture(this.scene.submarineAppearances[1][0]);

	this.bodyAppearance3 = new CGFappearance(this.scene);
	this.bodyAppearance3.setAmbient(0.33, 0.33, 0.33, 1);
	this.bodyAppearance3.setSpecular(0.2,0.2,0.2,1);	
	this.bodyAppearance3.setDiffuse(0.2,0.2,0.2,1);	
	this.bodyAppearance3.setShininess(10);
	this.bodyAppearance3.loadTexture(this.scene.submarineAppearances[2][0]);

	this.towerAppearance1 = new CGFappearance(this.scene);
	this.towerAppearance1.setAmbient(0.33, 0.33, 0.33, 1);
	this.towerAppearance1.setSpecular(0.9,0.9,0.9,1);	
	this.towerAppearance1.setDiffuse(0.3,0.3,0.3,1);	
	this.towerAppearance1.setShininess(30);
	this.towerAppearance1.loadTexture(this.scene.submarineAppearances[0][1]);

	this.towerAppearance2 = new CGFappearance(this.scene);
	this.towerAppearance2.setAmbient(0.33, 0.33, 0.33, 1);
	this.towerAppearance2.setSpecular(0.2,0.2,0.2,1);	
	this.towerAppearance2.setDiffuse(0.2,0.2,0.2,1);	
	this.towerAppearance2.setShininess(10);
	this.towerAppearance2.loadTexture(this.scene.submarineAppearances[1][1]);

	this.towerAppearance3 = new CGFappearance(this.scene);
	this.towerAppearance3.setAmbient(0.33, 0.33, 0.33, 1);
	this.towerAppearance3.setSpecular(0.9,0.9,0.9,1);	
	this.towerAppearance3.setDiffuse(0.3,0.3,0.3,1);	
	this.towerAppearance3.setShininess(30);
	this.towerAppearance3.loadTexture(this.scene.submarineAppearances[2][1]);

	this.periscopeAppearance1 = new CGFappearance(this.scene);
	this.periscopeAppearance1.setAmbient(0.33, 0.33, 0.33, 1);
	this.periscopeAppearance1.setSpecular(0.9,0.9,0.9,1);	
	this.periscopeAppearance1.setDiffuse(0.3,0.3,0.3,1);	
	this.periscopeAppearance1.setShininess(30);
	this.periscopeAppearance1.loadTexture(this.scene.submarineAppearances[0][2]);

	this.periscopeAppearance2 = new CGFappearance(this.scene);
	this.periscopeAppearance2.setAmbient(0.33, 0.33, 0.33, 1);
	this.periscopeAppearance2.setSpecular(0.2,0.2,0.2,1);	
	this.periscopeAppearance2.setDiffuse(0.2,0.2,0.2,1);	
	this.periscopeAppearance2.setShininess(10);
	this.periscopeAppearance2.loadTexture(this.scene.submarineAppearances[1][2]);

	this.periscopeAppearance3 = new CGFappearance(this.scene);
	this.periscopeAppearance3.setAmbient(0.33, 0.33, 0.33, 1);
	this.periscopeAppearance3.setSpecular(0.9,0.9,0.9,1);	
	this.periscopeAppearance3.setDiffuse(0.3,0.3,0.3,1);	
	this.periscopeAppearance3.setShininess(30);
	this.periscopeAppearance3.loadTexture(this.scene.submarineAppearances[2][2]);
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function() {
	
	console.log(this.scene.currSubmarineAppearance);

	switch (parseInt(this.scene.currSubmarineAppearance)) {
	  case 0:
		this.bodyAppearance1.apply();
		break;
	  case 1:
		this.bodyAppearance2.apply();
		break;
	  case 2:
		this.bodyAppearance3.apply();
		break;
	  default:
		this.bodyAppearance1.apply();
		break;
	}

	//MyCylinder class generates a cylinder with 1 unit of radius -> 2 units of diameter
	//Main Body
	this.scene.pushMatrix();
		this.scene.scale (0.73/2, 1/2 , 4.08);
		this.cylinder.display ();
	this.scene.popMatrix();
	
	//MyCircle class generates a circle with 1 unit of radius -> 2 units of diameter
	//Back HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 4.08);
		this.scene.scale (0.73/2, 1/2 , 0.46);
		this.halfSphere.display ();
	this.scene.popMatrix();
	
	//Front HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0);
		this.scene.scale (0.73/2, 1/2 , 0.46);
		this.scene.rotate (180*degToRad, 0, 1, 0);
		this.halfSphere.display ();
	this.scene.popMatrix();

	//Vertical Back Trapezoid
	this.scene.pushMatrix();
		this.scene.translate (0, 0, -0.125);
		this.scene.scale (1, 1 , 0.25);
		this.scene.rotate (90*degToRad, 0, 0, 1);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();

	//Horizontal Back Trapezoid
	this.scene.pushMatrix();
		this.scene.translate (0, 0, -0.125);
		this.scene.scale (1, 1 , 0.25);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();

	//Right Helix
	this.scene.pushMatrix();
		this.scene.translate (0.51, -0.3, 0);
		this.scene.rotate (0*degToRad, 1, 0, 0);
		this.helix.display ();
	this.scene.popMatrix();

	//Left Helix
	this.scene.pushMatrix();
		this.scene.translate (-0.51, -0.3, 0);
		this.scene.rotate (0*degToRad, 0, 0, 1);
		this.helix.display ();
	this.scene.popMatrix();


	switch (parseInt(this.scene.currSubmarineAppearance)) {
	  case 0:
		this.towerAppearance1.apply();
		break;
	  case 1:
		this.towerAppearance2.apply();
		break;
	  case 2:
		this.towerAppearance3.apply();
		break;
	  default:
		this.towerAppearance1.apply();
		break;
	}

	//Top cylinder
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 2);
		this.scene.scale (0.73/2, 0.5+0.57, 0.88/2);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.cylinder.display ();
	this.scene.popMatrix();

	//Top cylinder "face"
	this.scene.pushMatrix();
		this.scene.translate (0, 0.5+0.57, 2);
		this.scene.scale (0.73/2, 1 , 0.88/2);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.circle.display ();
	this.scene.popMatrix();

	//Horizontal Tower Trapezoid
	this.scene.pushMatrix();
		this.scene.translate (0, 0.7, 2);
		this.scene.scale (1, 1 , 0.25);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.towerTrapezoidalPrism.display ();
	this.scene.popMatrix();

	switch (parseInt(this.scene.currSubmarineAppearance)) {
	  case 0:
		this.periscopeAppearance1.apply();
		break;
	  case 1:
		this.periscopeAppearance2.apply();
		break;
	  case 2:
		this.periscopeAppearance3.apply();
		break;
	  default:
		this.periscopeAppearance1.apply();
		break;
	}

	//Vertical Periscope
	this.scene.pushMatrix();
		this.scene.translate (0, 0.5+0.57, 2.2);
		this.scene.scale (0.05, 1 , 0.05);
		this.scene.rotate (270*degToRad, 1, 0 ,0);
		this.cylinder.display ();
	this.scene.popMatrix();

	//Horizontal Periscope
	this.scene.pushMatrix();
		this.scene.translate (0, (0.5+0.57 + 1 - 0.05), (2.2-0.05));
		this.scene.scale (0.05, 0.05 , 0.2);
		//this.scene.rotate (0*degToRad, 1, 0 ,0);
		this.cylinder.display ();
	this.scene.popMatrix();

	//Horizontal Periscope Face
	this.scene.pushMatrix();
		this.scene.translate (0, (0.5+0.57 + 1 - 0.05), (2.2-0.05 + 0.2));
		this.scene.scale (0.05, 0.05 , 1);
		//this.scene.rotate (0*degToRad, 1, 0 ,0);
		this.circle.display ();
	this.scene.popMatrix();

 };

/*
 MySubmarine.prototype.changeDir (){

 }

 
 MySubmarine.prototype.changeSpeed (){

 }
 */