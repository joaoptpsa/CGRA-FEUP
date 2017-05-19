var degToRad = Math.PI / 180.0;
var FPSToUpdate = 1/1000;

var FPS = 120;

var OCEAN_DIVISIONS = 150;

var NUM_TARGETS = 4;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.luz1=true;
	this.luz2=true;
	this.luz3=true;
	this.luz4=true;
	//this.speed=3;
	this.speed=0;
	
	this.submarineAppearances = [[]];
	this.submarineAppearances[0] = [];
	this.submarineAppearances[0].push ("resources/images/metal.jpg", "resources/images/metal.jpg", "resources/images/metal.jpg"); //body, tower, periscope
	this.submarineAppearances[1] = [];
	this.submarineAppearances[1].push ("resources/images/blueCammo.jpg", "resources/images/blueCammo.jpg", "resources/images/blueCammo.jpg");
	this.submarineAppearances[2] = [];
	this.submarineAppearances[2].push ("resources/images/purpleCammo.png", "resources/images/diamondPlate.jpg", "resources/images/blueCammo.jpg"); 
	this.submarineAppearances[3] = [];
	this.submarineAppearances[3].push ("resources/images/yellow.jpg", "resources/images/yellow.jpg", "resources/images/yellow.jpg"); 
	this.submarineAppearances[4] = [];
	this.submarineAppearances[4].push ("resources/images/red-bull.jpg", "resources/images/red-bull.jpg", "resources/images/red-bull.jpg");
	this.submarineAppearances[5] = [];
	this.submarineAppearances[5].push ("resources/images/windows.jpg", "resources/images/windows.jpg", "resources/images/windows.jpg");

	this.currSubmarineAppearance = 0;

	this.submarineAppearanceList = {
		'Metallic' : 0,
		'BlueCammo' : 1,
		'HidingPlainSite' : 2,
		'Yellow' : 3,
		'Red Bull' : 4,
		'Windows' : 5
	};

	this.currentFPS = 144;

	this.fpsList = {
		'30' : 30,
		'60' : 60,
		'120' : 120,
		'144' : 144
	}

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 1.0, 1.0);
	//this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.oceanPlane = new Plane (this, OCEAN_DIVISIONS);
	this.cylinder = new MyCylinder (this, 20, 1);
	this.clock = new MyClock (this);
	this.submarine = new MySubmarine (this, 8, 5, 8, 180, 0);
	
	this.targetsPos = [[]];
	for (var i=0; i<NUM_TARGETS; i++){
		this.targetsPos[i] = [];
		//Generate random positions on the bottom of the ocean
		var x = Math.floor(Math.random()*16)+1;
		var y = 0.05; //so it stays abit above the ocean floor
		var z = Math.floor(Math.random()*16)+1;
		this.targetsPos[i].push (x, y , z);
	}

	this.targets = [];
	for (var i=0; i<NUM_TARGETS; i++){
		this.targets.push (new MyTarget (this, this.targetsPos[i][0], this.targetsPos[i][1], this.targetsPos[i][2]));
	}

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.setAmbient(0.3,0.4,0.5,1);
	this.oceanAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.oceanAppearance.setSpecular(0.1,0.1,0.1,1);
	this.oceanAppearance.setShininess(10);
	//this.oceanAppearance.setTextureWrap("REPEAT", "REPEAT");
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
	this.setGlobalAmbientLight(0, 0, 0, 1);
	
	// Positions for four lights
	this.lights[0].setPosition(12, 6, 12, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular (1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();
	
	this.lights[1].setPosition(12, 6, 4, 1);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular (1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setPosition(4, 6, 12, 1);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[2].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular (1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable ();

	this.lights[3].setPosition(4, 6, 4, 1);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular (1.0, 1.0, 1.0, 1.0);
	this.lights[3].enable ();
	
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
	}

	if (this.luz1){
		this.lights[0].enable();
	}
	else{
		this.lights[0].disable();
	}

	if (this.luz2){
		this.lights[1].enable();
	}
	else{
		this.lights[1].disable();
	}

	if (this.luz3){
		this.lights[2].enable();
	}
	else{
		this.lights[2].disable();
	}

	if (this.luz4){
		this.lights[3].enable();
	}
	else{
		this.lights[3].disable();
	}


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
		this.translate (8, 0, 8)
		this.scale (16, 1, 16);
		this.rotate (-90 * degToRad, 1, 0, 0);
		
		this.oceanAppearance.apply();
		this.oceanPlane.display ();
	this.popMatrix();
	
	//Pole
	this.pushMatrix();
		this.translate (8, 3, 0);
		this.scale (0.1, 6, 0.1);
		this.rotate (-90 * degToRad, 1, 0, 0);

		this.cylinderAppearance.apply ();
		this.cylinder.display ();
	this.popMatrix();
	
	//Clock
	this.pushMatrix();
		this.translate (8, 5, 0);
		this.scale (1, 1 , 0.2);
		this.clock.display ();
	this.popMatrix();
	
	//Submarine
	this.pushMatrix();
		this.submarine.translateToPos();
		this.submarine.updateRotation ();
		this.submarine.display ();
	this.popMatrix();

	//Submarine torpedo
	if (this.submarine.torpedo !=null){
		this.pushMatrix();
			this.submarine.torpedo.translateToPos();
			this.submarine.torpedo.updateRotation ();
			this.submarine.torpedo.display ();
		this.popMatrix();
	}

	//Targets
	for (var i=0; i<this.targets.length; i++){
		this.pushMatrix();
			this.targets[i].translateToPos();
			this.rotate (90*degToRad, 1, 0, 0);
			this.targets[i].display();
		this.popMatrix();
	};

	this.setUpdatePeriod (FPS*FPSToUpdate);
};


LightingScene.prototype.update = function (currTime){
	if (this.clock.running){
		this.clock.update(currTime);
	}
	
	this.submarine.update(currTime);

};


LightingScene.prototype.toggleClock = function (){
	this.clock.running = !this.clock.running;
};