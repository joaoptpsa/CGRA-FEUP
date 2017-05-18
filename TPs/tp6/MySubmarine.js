var degToRad = Math.PI / 180.0;
var radToDeg = 180.0 / Math.PI;
/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene, x, y, z, rotationAngle, verticalAngle) {
	CGFobject.call(this,scene);
	
	var d = new Date();
	this.oldCurrTime = d.getTime();
	
	this.x = x || 0;
 	this.y = y || 0;
 	this.z = z || 0;

	this.rotationAngle = rotationAngle*degToRad || 0;
	this.verticalAngle = verticalAngle*degToRad || 0;
	
	this.maxVerticalAngle = 30*degToRad;
	this.verticalRudderAngle = 0;
	this.horizontalRudderAngle = 0;
	this.rudderMaxAngle = Math.PI/6;
	this.rudderAngleDelta = this.rudderMaxAngle/20;

	this.periscopeMaxMinHeight = -0.8 //minimum height periscope will go down to, the periscope has a height of 0.95
	this.periscopeYDelta = Math.abs(this.periscopeMaxMinHeight)/20;
	this.periscopeAngleDelta = Math.PI/7;

	this.cylinder = new MyCylinder (this.scene, 20, 8);
	this.halfSphere = new MyHalfSphere (this.scene, 20, 8);
	this.circle = new MyCircle (this.scene, 20, 1);
	this.rudderTrapezoidalPrism = new MyTrapezoidalPrism (this.scene, 1.64, 2.34);
	this.towerTrapezoidalPrism = new MyTrapezoidalPrism (this.scene, 1, 1.42);
	this.helix = new MySubmarineHelix (this.scene);
	this.periscope = new MySubmarinePeriscope (this.scene);

	this.torpedo = null;

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
		this.rotateVerticalRudder ();
		this.scene.translate (0, 0, -0.125);
		this.scene.scale (1, 1 , 0.25);
		this.scene.rotate (90*degToRad, 0, 0, 1);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();

	//Horizontal Back Trapezoid
	this.scene.pushMatrix();
		this.rotateHorizontalRudder();44
		this.scene.translate (0, 0, -0.125);
		this.scene.scale (1, 1 , 0.25);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();

	//Right Helix
	this.scene.pushMatrix();
		this.scene.translate (0.51, -0.3, 0);
		this.helix.display ();
	this.scene.popMatrix();

	//Left Helix
	this.scene.pushMatrix();
		this.scene.translate (-0.51, -0.3, 0);
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

	//Periscope
	this.scene.pushMatrix();
		this.periscope.translateToPos();
		this.scene.translate (0, 0.5+0.57, 2.2);
		this.periscope.rotateToPos();
		this.periscope.display ();
	this.scene.popMatrix();

 };

MySubmarine.prototype.changeSpeed = function (speedDelta){
	if (this.scene.speed+speedDelta<=5 && this.scene.speed+speedDelta>=-5){
		this.scene.speed += speedDelta;
	}
};

MySubmarine.prototype.translateToPos = function(){
	this.scene.translate (this.x, this.y, this.z);
};

MySubmarine.prototype.update = function(currTime){
	var deltaTime = currTime - this.oldCurrTime;
	this.oldCurrTime = currTime;

	// deltaTime / 1000 == change in seconds 

	this.updatePos(deltaTime);
	this.helix.updateHelixAngle(deltaTime); //in practice our "helixes" are just one
	this.updateVerticalRudderAngle (this.rudderMaxAngle, (this.rudderMaxAngle*0.5)*(deltaTime/1000), 1); //Takes two seconds to reset
	this.updateHorizontalRudderAngle (this.rudderMaxAngle, (this.rudderMaxAngle*0.5)*(deltaTime/1000), 1); //Takes two seconds to reset
};

MySubmarine.prototype.updatePos = function(deltaTime){
	this.x += ((this.scene.speed/10)*Math.sin (this.rotationAngle))* (deltaTime/1000);
	this.y += ((this.scene.speed/10)*Math.sin (-this.verticalAngle))* (deltaTime/1000); //-this.verticalAngle because we start it off as 0 and due to the way the trigonometic circle works we want (180-this.verticalAngle)
	this.z += ((this.scene.speed/10)*Math.cos (this.rotationAngle))* (deltaTime/1000);
};


MySubmarine.prototype.updateRotation = function(){
	//this.scene.rotate (this.rotationAngle, 0, Math.cos(this.verticalAngle), -Math.sin(this.verticalAngle)); //Uncomment to make the submarine rotate on its "butt" axis
	this.scene.rotate (this.rotationAngle, 0, 1, 0); //Uncomment to make the submarine rotate always in the y axis
	this.scene.rotate (this.verticalAngle, 1, 0, 0);
	
};

MySubmarine.prototype.rotateSubHor = function(factor){
	var rotationDelta;
	rotationDelta = (this.scene.speed/10) * factor;
	this.rotationAngle += rotationDelta;
};

MySubmarine.prototype.rotateSubVer =  function(factor){
	var rotationDelta;
	rotationDelta = (this.scene.speed/10) * factor;

	if (Math.abs(this.verticalAngle+rotationDelta) < this.maxVerticalAngle){
		this.verticalAngle += rotationDelta;
	}
}

MySubmarine.prototype.rotateVerticalRudder = function(){
	this.scene.rotate (this.verticalRudderAngle, 0, 1, 0);
};


MySubmarine.prototype.updateVerticalRudderAngle = function(maxAngle, rudderRotation, reset){

	if (reset && this.verticalRudderAngle!=0){
		if (this.verticalRudderAngle>0){
			if ((this.verticalRudderAngle-Math.abs(rudderRotation))>0){
				this.verticalRudderAngle -= Math.abs(rudderRotation);
			}
			else{
				this.verticalRudderAngle =0;
			}
		}
		else if (this.verticalRudderAngle<0){
			if ((this.verticalRudderAngle+Math.abs(rudderRotation))<0) {
				this.verticalRudderAngle += Math.abs(rudderRotation);
			}
			else{
				this.verticalRudderAngle =0;
			}
		}
	}
	else if (!reset)
	{
		if (!(Math.abs(this.verticalRudderAngle+rudderRotation)>=maxAngle)){
			this.verticalRudderAngle += rudderRotation;
		}
	}
};

MySubmarine.prototype.rotateHorizontalRudder = function(){
	this.scene.rotate (this.horizontalRudderAngle, 1, 0, 0);
};

MySubmarine.prototype.updateHorizontalRudderAngle = function(maxAngle, rudderRotation, reset){

	if (reset && this.horizontalRudderAngle!=0){
		if (this.horizontalRudderAngle>0){
			if ((this.horizontalRudderAngle-Math.abs(rudderRotation))>0){
				this.horizontalRudderAngle -= Math.abs(rudderRotation);
			}
			else{
				this.horizontalRudderAngle =0;
			}
		}
		else if (this.horizontalRudderAngle<0){
			if ((this.horizontalRudderAngle+Math.abs(rudderRotation))<0) {
				this.horizontalRudderAngle += Math.abs(rudderRotation);
			}
			else{
				this.horizontalRudderAngle =0;
			}
		}
	}
	else if (!reset)
	{
		if (!(Math.abs(this.horizontalRudderAngle+rudderRotation)>=maxAngle)){
			this.horizontalRudderAngle += rudderRotation;
		}
	}
};


MySubmarine.prototype.createTorpedo = function(){
	if (this.torpedo === null){
		this.torpedo = new MyTorpedo (this.scene, this.x, this.y-0.5-0.1, this.z-2, this.rotationAngle*radToDeg, this.verticalAngle*radToDeg);
	}
};
