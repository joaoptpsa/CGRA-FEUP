var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;
var WALL_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this, WALL_DIVISIONS);
	this.floor = new MyQuad(this);
	this.chair = new MyChair(this);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);


	this.materialWallR = new CGFappearance(this);
	this.materialWallR.setAmbient(1,0,0,1);
	this.materialWallR.setSpecular(0.1,0.1,0.1,1);
	this.materialWallR.setDiffuse(0.1,0.1,0.1,1);	
	this.materialWallR.setShininess(1);

	this.materialWallG = new CGFappearance(this);
	this.materialWallG.setAmbient(0,1,0,1);
	this.materialWallG.setSpecular(0.1,0.1,0.1,1);
	this.materialWallG.setDiffuse(0.1,0.1,0.1,1);	
	this.materialWallG.setShininess(1);

	this.materialWallB = new CGFappearance(this);
	this.materialWallB.setAmbient(0,0,1,1);
	this.materialWallB.setSpecular(0.1,0.1,0.1,1);
	this.materialWallB.setDiffuse(0.1,0.1,0.1,1);	
	this.materialWallB.setShininess(1);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(1,1,1, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[0].setAmbient(1, 1, 1, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular (1, 1, 1 , 1);
	this.lights[0].setQuadraticAttenuation (1);
	this.lights[0].enable();

	this.lights[1].setAmbient(1, 1, 1, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular (1, 1, 1 , 1);
	this.lights[1].setQuadraticAttenuation (1);
	this.lights[1].enable();

	this.lights[2].setAmbient(1, 1, 1, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular (1, 1, 1, 1);
	this.lights[2].setQuadraticAttenuation (0.02);
	this.lights[2].enable ();

	this.lights[3].setAmbient(1, 1, 1, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular (1, 1, 0 , 1);
	this.lights[3].setQuadraticAttenuation (0.02);
	this.lights[3].enable ();

	/*
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular (1, 1, 0 , 1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular (1, 1, 1, 1);
	this.lights[2].setConstantAttenuation (1);
	this.lights[2].setLinearAttenuation (1);
	this.lights[2].setQuadraticAttenuation (0);
	this.lights[2].enable ();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular (1, 1, 0 , 1);
	this.lights[3].setConstantAttenuation (0);
	this.lights[3].setLinearAttenuation (0);
	this.lights[3].setQuadraticAttenuation (1);
	this.lights[3].enable ();
	*/
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

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.materialWallG.apply();
		this.wall.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.materialWallB.apply();
		this.wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWallR.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialA.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialB.apply();
		this.boardB.display();
	this.popMatrix();


	// Chair A
	
	this.pushMatrix();
		this.translate(12, 0, 5);
		this.chair.display();
	this.popMatrix();


	// Chair B
	this.pushMatrix();
		this.translate(5, 0, 5);
		this.chair.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};
