var degToRad = Math.PI / 180.0;

var OCEAN_DIVISIONS = 150;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.option1=true;
	this.option2=true;
	this.speed=3;

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 1.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.oceanPlane = new Plane (this, OCEAN_DIVISIONS);
	this.pole = new MyCylinder (this, 20, 10);
	this.clock = new MyClock (this);
	this.submarine = new MySubmarine (this);
	this.submarineRotation = 180 * degToRad;
	this.submarineAngle = this.submarineRotation;
	this.submarineX = 8;
	this.submarineY = 0;
	this.submarineZ = 8;

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.setAmbient(0.3,0.4,0.5,1);
	this.oceanAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.oceanAppearance.setSpecular(0.1,0.1,0.1,1);
	this.oceanAppearance.setShininess(10);
	this.oceanAppearance.setTextureWrap("REPEAT", "REPEAT");
	this.oceanAppearance.loadTexture("resources/images/ocean.jpg");

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.setAmbient(1, 1, 1, 1);
	this.cylinderAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.cylinderAppearance.setDiffuse (0.8, 0.8, 0.8, 1);
	this.cylinderAppearance.setShininess (20);
	this.cylinderAppearance.loadTexture("resources/images/brick.jpg");
	
	//Enable Textures
	this.enableTextures (true);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};


LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(1, 1, 1, 1);
	
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Ocean Plane
	this.pushMatrix();
		this.rotate (-90 * degToRad, 1, 0, 0);
		this.translate (8, -8, 0)
		this.scale (16, 16, 0);

		this.oceanAppearance.apply();
		this.oceanPlane.display ();
	this.popMatrix();

	//Pole
	this.pushMatrix();
		this.rotate (-90 * degToRad, 1, 0, 0);
		this.translate (8, 0.2, 0);
		this.scale (0.2, 0.2, 6);
		
		this.cylinderAppearance.apply ();
		this.pole.display ();
	this.popMatrix();

	//Clock
	this.pushMatrix();
		this.translate (8, 5, 0);
		this.scale (1, 1 , 0.2);
		this.clock.display ();
	this.popMatrix();
	
	//Submarine
	this.pushMatrix();
		this.translate (this.submarineX, this.submarineY , this.submarineZ);
		this.rotate (this.submarineRotation, 0, 1, 0);
		this.submarine.display ();
	this.popMatrix();

	this.setUpdatePeriod(100);
};


LightingScene.prototype.update = function (currTime){
	this.clock.update(currTime);

};


LightingScene.prototype.doSomething = function (){
	console.log("Doing something...");
};


LightingScene.prototype.changeDir = function (rotation){
	this.submarineRotation += rotation;
	this.submarineAngle += rotation;
};


LightingScene.prototype.changeSpeed = function (speed){
	this.submarineX += (speed/30) * Math.sin (this.submarineAngle);
	this.submarineZ += (speed/30) * Math.cos (this.submarineAngle);

};