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

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.oceanPlane = new Plane (this, OCEAN_DIVISIONS);
	this.submarine = new MySubmarine (this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.setAmbient(0.3,0.4,0.5,1);
	this.oceanAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.oceanAppearance.setSpecular(0.1,0.1,0.1,1);
	this.oceanAppearance.setShininess(10);
	this.oceanAppearance.setTextureWrap("REPEAT", "REPEAT");
	this.oceanAppearance.loadTexture("resources/images/ocean.jpg");

	//Enable Textures
	this.enableTextures (true);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};


LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0 ,0, 1);
	
	// Positions for lights
	
	this.lights[0].setPosition(5, 5, 5, 1);
	this.lights[0].setVisible(true);
	
	this.lights[1].setPosition(-5, 5, 5, 1);
	this.lights[1].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	
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
		this.oceanAppearance.apply();
		this.oceanPlane.display ();
	this.popMatrix();

	this.pushMatrix();
		this.submarine.display ();
	this.popMatrix();

};

/*
LightingScene.prototype.update = function (currTime){
	this.clock.update(currTime);

};
*/

LightingScene.prototype.doSomething = function (){
	console.log("Doing something...");
};