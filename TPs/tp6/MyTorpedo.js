var degToRad = Math.PI / 180.0;
/**
 * MyTorpedo
 * @constructor
 */
 function MyTorpedo(scene, x, y, z, rotationAngle, verticalAngle) {
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

	this.target = null;

	this.cylinder = new MyCylinder (this.scene, 20, 8);
	this.halfSphere = new MyHalfSphere (this.scene, 20, 8);
	this.circle = new MyCircle (this.scene, 20, 1);
	this.rudderTrapezoidalPrism = new MyTrapezoidalPrism (this.scene, 0.25, 0.35);
	
	this.torpedoAppearance1 = new CGFappearance(this.scene);
	this.torpedoAppearance1.setAmbient(0.33, 0.33, 0.33, 1);
	this.torpedoAppearance1.setSpecular(0.9,0.9,0.9,1);	
	this.torpedoAppearance1.setDiffuse(0.3,0.3,0.3,1);	
	this.torpedoAppearance1.setShininess(30);
	this.torpedoAppearance1.loadTexture(this.scene.submarineAppearances[0][3]);

	this.torpedoAppearance2 = new CGFappearance(this.scene);
	this.torpedoAppearance2.setAmbient(0.33, 0.33, 0.33, 1);
	this.torpedoAppearance2.setSpecular(0.2,0.2,0.2,1);	
	this.torpedoAppearance2.setDiffuse(0.2,0.2,0.2,1);	
	this.torpedoAppearance2.setShininess(10);
	this.torpedoAppearance2.loadTexture(this.scene.submarineAppearances[1][3]);

	this.torpedoAppearance3 = new CGFappearance(this.scene);
	this.torpedoAppearance3.setAmbient(0.33, 0.33, 0.33, 1);
	this.torpedoAppearance3.setSpecular(0.2,0.2,0.2,1);	
	this.torpedoAppearance3.setDiffuse(0.2,0.2,0.2,1);	
	this.torpedoAppearance3.setShininess(10);
	this.torpedoAppearance3.loadTexture(this.scene.submarineAppearances[2][3]);
 };

 MyTorpedo.prototype = Object.create(CGFobject.prototype);
 MyTorpedo.prototype.constructor = MyTorpedo;

 MyTorpedo.prototype.display = function() {

	switch (parseInt(this.scene.currSubmarineAppearance)) {
	  case 0:
		this.torpedoAppearance1.apply();
		break;
	  case 1:
		this.torpedoAppearance2.apply();
		break;
	  case 2:
		this.torpedoAppearance3.apply();
		break;
	  default:
		this.torpedoAppearance1.apply();
		break;
	}

	//MyCylinder class generates a cylinder with 1 unit of radius -> 2 units of diameter
	//Main Body
	this.scene.pushMatrix();
		this.scene.scale (0.1/2, 0.2/2, 0.7);
		this.cylinder.display ();
	this.scene.popMatrix();
	
	//MyCircle class generates a circle with 1 unit of radius -> 2 units of diameter
	//Back HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0.7);
		this.scene.scale (0.1/2, 0.2/2, 0.15);
		this.halfSphere.display ();
	this.scene.popMatrix();
	
	//Front HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0);
		this.scene.scale (0.1/2, 0.2/2, 0.15);
		this.scene.rotate (180*degToRad, 0, 1, 0);
		this.halfSphere.display ();
	this.scene.popMatrix();

	//Vertical Back Trapezoid
	this.scene.pushMatrix();
		this.rotateVerticalRudder ();
		this.scene.translate (0, 0, -0.025);
		this.scene.rotate (90*degToRad, 0, 0, 1);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.scene.scale (1, 0.05 , 0.2);
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();

	//Horizontal Back Trapezoid
	this.scene.pushMatrix();
		this.rotateHorizontalRudder();
		this.scene.translate (0, 0, -0.025);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.scene.scale (1, 0.05 , 0.2);
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();
 };

MyTorpedo.prototype.changeSpeed = function (speedDelta){
	if (this.scene.speed+speedDelta<=5 && this.scene.speed+speedDelta>=-5){
		this.scene.speed += speedDelta;
	}
};

MyTorpedo.prototype.translateToPos = function(){
	this.scene.translate (this.x, this.y, this.z);
};

MyTorpedo.prototype.update = function(currTime){
	var deltaTime = currTime - this.oldCurrTime;
	this.oldCurrTime = currTime;

	// deltaTime / 1000 == change in seconds 

	this.updatePos(deltaTime);
	this.helix.updateHelixAngle(deltaTime); //in practice our "helixes" are just one
	this.updateVerticalRudderAngle (this.rudderMaxAngle, (this.rudderMaxAngle*0.5)*(deltaTime/1000), 1); //Takes two seconds to reset
	this.updateHorizontalRudderAngle (this.rudderMaxAngle, (this.rudderMaxAngle*0.5)*(deltaTime/1000), 1); //Takes two seconds to reset
};

MyTorpedo.prototype.updatePos = function(deltaTime){
	this.x += ((this.scene.speed/10)*Math.sin (this.rotationAngle))* (deltaTime/1000);
	this.y += ((this.scene.speed/10)*Math.sin (-this.verticalAngle))* (deltaTime/1000); //-this.verticalAngle because we start it off as 0 and due to the way the trigonometic circle works we want (180-this.verticalAngle)
	this.z += ((this.scene.speed/10)*Math.cos (this.rotationAngle))* (deltaTime/1000);
};


MyTorpedo.prototype.updateRotation = function(){
	//this.scene.rotate (this.rotationAngle, 0, Math.cos(this.verticalAngle), -Math.sin(this.verticalAngle)); //Uncomment to make the submarine rotate on its "butt" axis
	this.scene.rotate (this.rotationAngle, 0, 1, 0); //Uncomment to make the submarine rotate always in the y axis
	this.scene.rotate (this.verticalAngle, 1, 0, 0);
	
};

MyTorpedo.prototype.rotateTargetHor = function(factor){
	var rotationDelta;
	rotationDelta = (this.scene.speed/10) * factor;
	this.rotationAngle += rotationDelta;
};

MyTorpedo.prototype.rotateTargetVer =  function(factor){
	var rotationDelta;
	rotationDelta = (this.scene.speed/10) * factor;

	if (Math.abs(this.verticalAngle+rotationDelta) < this.maxVerticalAngle){
		this.verticalAngle += rotationDelta;
	}
}

MyTorpedo.prototype.rotateVerticalRudder = function(){
	this.scene.rotate (this.verticalRudderAngle, 0, 1, 0);
};


MyTorpedo.prototype.updateVerticalRudderAngle = function(maxAngle, rudderRotation, reset){

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

MyTorpedo.prototype.rotateHorizontalRudder = function(){
	this.scene.rotate (this.horizontalRudderAngle, 1, 0, 0);
};

MyTorpedo.prototype.updateHorizontalRudderAngle = function(maxAngle, rudderRotation, reset){

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
