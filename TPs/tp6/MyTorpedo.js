var degToRad = Math.PI / 180.0;
var X = 0;
var Y = 1;
var Z = 2;

/**
 * MyTorpedo
 * @constructor
 */
 function MyTorpedo(scene, x, y, z, rotationAngle, verticalAngle) {
	CGFobject.call(this,scene);
	
	var d = new Date();
	this.oldCurrTime = d.getTime();
	
	//Store the object's position 
	this.pos = [];
	this.pos.push (x||0, y||0, z||0)
	//Old position 
	this.oldPos = [];
	this.oldPos.push (0, 0, 0);

	this.rotationAngle = rotationAngle*degToRad || 0;
	this.verticalAngle = verticalAngle*degToRad || 0;
	
	this.maxVerticalAngle = 30*degToRad;
	this.verticalRudderAngle = 0;
	this.horizontalRudderAngle = 0;
	this.rudderMaxAngle = Math.PI/6;
	this.rudderAngleDelta = this.rudderMaxAngle/20;

	this.target = null;
	
	//P1 is the starting position for the torpedo
	this.p1 = [];
	this.p1.push (this.pos[X], this.pos[Y], this.pos[Z]);
	
	//P2 is the point 6 units ahead from the starting position for the torpedo
	this.directionArray = [];
	this.directionArray.push (Math.cos(verticalAngle)*Math.sin(rotationAngle), Math.cos(verticalAngle)*Math.cos(rotationAngle), Math.sin(verticalAngle));
	this.p2 = [];
	this.p2.push (this.pos[X]+6*this.directionArray[X], this.pos[Y]+6*this.directionArray[Y], this.pos[Z]+6*this.directionArray[Z]);

	//P3 is the point 3 units above from the target
	this.p3 = [];
	//P4 is the target position
	this.p4 = [];
	
	//distance between the starting torpedo position and the target
	this.distance;
	this.t = null //initialize at 0 when it gets a target

	this.cylinder = new MyCylinder (this.scene, 20, 8);
	this.halfSphere = new MyHalfSphere (this.scene, 20, 8);
	this.circle = new MyCircle (this.scene, 20, 1);
	this.rudderTrapezoidalPrism = new MyTrapezoidalPrism (this.scene, 0.25, 0.35);
	
	this.bodyAppearance = new CGFappearance(this.scene);
	this.bodyAppearance.setAmbient(0.33, 0.33, 0.33, 1);
	this.bodyAppearance.setSpecular(0.9,0.9,0.9,1);	
	this.bodyAppearance.setDiffuse(0.3,0.3,0.3,1);	
	this.bodyAppearance.setShininess(30);
	this.bodyAppearance.loadTexture("resources/images/torpedo_body.jpg"); 

	this.frontAppearance = new CGFappearance(this.scene);
	this.frontAppearance.setAmbient(0.33, 0.33, 0.33, 1);
	this.frontAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.frontAppearance.setDiffuse(0.2,0.2,0.2,1);	
	this.frontAppearance.setShininess(10);
	this.frontAppearance.loadTexture("resources/images/torpedo_body.jpg");

	this.backAppearance = new CGFappearance(this.scene);
	this.backAppearance.setAmbient(0.33, 0.33, 0.33, 1);
	this.backAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.backAppearance.setDiffuse(0.2,0.2,0.2,1);	
	this.backAppearance.setShininess(10);
	this.backAppearance.loadTexture("resources/images/torpedo_back.png");
 };

 MyTorpedo.prototype = Object.create(CGFobject.prototype);
 MyTorpedo.prototype.constructor = MyTorpedo;

 MyTorpedo.prototype.display = function() {

	//MyCylinder class generates a cylinder with 1 unit of radius -> 2 units of diameter
	//Main Body
	this.scene.pushMatrix();
		this.scene.scale (0.1/2, 0.2/2, 0.7);
		this.bodyAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();
	
	//MyCircle class generates a circle with 1 unit of radius -> 2 units of diameter
	//Back HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0.7);
		this.scene.scale (0.1/2, 0.2/2, 0.15);
		this.backAppearance.apply()
		this.halfSphere.display();
	this.scene.popMatrix();
	
	//Front HalfSphere
	this.scene.pushMatrix();
		this.scene.translate (0, 0, 0);
		this.scene.scale (0.1/2, 0.2/2, 0.15);
		this.scene.rotate (180*degToRad, 0, 1, 0);
		this.frontAppearance.apply();
		this.halfSphere.display();
	this.scene.popMatrix();

	//Vertical Back Trapezoid
	this.scene.pushMatrix();
		this.scene.translate (0, 0, -0.025);
		this.scene.rotate (90*degToRad, 0, 0, 1);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.scene.scale (1, 0.05 , 0.2);
		this.frontAppearance.apply();
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();

	//Horizontal Back Trapezoid
	this.scene.pushMatrix();
		this.scene.translate (0, 0, -0.025);
		this.scene.rotate (90*degToRad, 1, 0, 0);
		this.scene.scale (1, 0.05 , 0.2);
		this.frontAppearance.apply();
		this.rudderTrapezoidalPrism.display ();
	this.scene.popMatrix();
 };

MyTorpedo.prototype.changeSpeed = function (speedDelta){
	if (this.scene.speed+speedDelta<=5 && this.scene.speed+speedDelta>=-5){
		this.scene.speed += speedDelta;
	}
};

MyTorpedo.prototype.translateToPos = function(){
	this.scene.translate (this.pos[X], this.pos[Y], this.pos[Z]);
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
	this.pos[X] += ((this.scene.speed/10)*Math.sin (this.rotationAngle))* (deltaTime/1000);
	this.pos[Y] += ((this.scene.speed/10)*Math.sin (-this.verticalAngle))* (deltaTime/1000); //-this.verticalAngle because we start it off as 0 and due to the way the trigonometic circle works we want (180-this.verticalAngle)
	this.pos[Z] += ((this.scene.speed/10)*Math.cos (this.rotationAngle))* (deltaTime/1000);
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

MyTorpedo.prototype.getTarget = function(){
	//if there are targets we should assign the first one to the torpedo

	if (this.scene.targets[0] != null){
		this.target = this.scene.targets[0];

		this.p3.push (this.target.pos[X], this.target.pos[Y]+3, this.target.pos[Z]);
		this.p4.push (this.target.pos[X], this.target.pos[Y], this.target.pos[Z]);

		this.distance = Math.sqrt(Math.pow(this.target.pos[X]-this.p1[X],2)+Math.pow(this.target.pos[Y]-this.p1[Y],2)+Math.pow(this.target.pos[Z]-this.p1[Z],2));
		this.t = 0;
	}
};

MyTorpedo.prototype.bezierCurve = function(deltaTime){
	if ((this.t + (deltaTime/1000)/this.distance) <= 1){
		this.t += (deltaTime/1000)/this.distance; //distance == time

		for (var i=0; i<3; i++){
			//store the old position
			this.oldPos[i] = this.pos[i];

			//calculate new position
			this.pos[i] = Math.pow((1-this.t),3)*this.p1[i]
		+3*this.t*Math.pow((1-this.t),2)*this.p2[i]
		+3*Math.pow(this.t,2)*(1-this.t)*this.p3[i]
		+Math.pow(this.t,3)*this.p4[i];
			/*
			//update directionArray
			this.directionArray[i] = this.pos[i]-this.oldPos[i];

			var directionArrayMod = Math.sqrt(Math.pow(this.directionArray[X],2)+Math.pow(this.directionArray[Y],2)+Math.pow(this.directionArray[Z],2));
			this.rotationAngle = Math.atan(this.directionArray[Y]/this.directionArray[X]);
			this.verticalAngle = Math.acos(this.directionArray[Z]/directionArrayMod);
			*/
		}

	}
	else{
		//arrived at target
		this.scene.targets.splice(0,1);
		this.scene.submarine.torpedo = null; // the garbage collector will free the torpedo in the next pass
		//even though we delete the only reference to (this) object it will not be destroyed until the current function is done executing
	}
};