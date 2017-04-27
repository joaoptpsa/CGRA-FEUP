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
	this.table = new MyTable(this);
	this.wall = new Plane(this, WALL_DIVISIONS);
	this.leftwall = new MyQuad (this, -1, 2, -1, 2); //(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.chair = new MyChair(this);

	this.cylinder = new MyCylinder (this, 10, 20);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,-1/6,1+1/6, 0, 1); //board width = 6 logo queremos que a textura fique centrada entre 1/6 e 5/6
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	this.clock = new MyClock (this);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	this.slidesAppearance.loadTexture("resources/images/slides.png");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.boardAppearance.setSpecular(0.8,0.8,0.8,1);	
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("resources/images/board.png");


	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(1, 1, 1, 1);
	this.materialWall.setSpecular(0.1,0.1,0.1,1);
	this.materialWall.setDiffuse(0.1,0.1,0.1,1);	
	this.materialWall.setShininess(1);
	this.materialWall.loadTexture("resources/images/wall.png");

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(1,1,1,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setDiffuse(0.1,0.1,0.1,1);	
	this.floorAppearance.setShininess(1);
	this.floorAppearance.loadTexture("resources/images/floor.png")

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(1,1,1,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
	this.windowAppearance.setDiffuse(0.1,0.1,0.1,1);;	
	this.windowAppearance.setShininess(1);
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	this.windowAppearance.loadTexture("resources/images/window.png");

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.setAmbient(1, 1, 1, 1);
	this.cylinderAppearance.setSpecular(0.1, 0.1, 0.1, 1);
	this.cylinderAppearance.setDiffuse (0.8, 0.8, 0.8, 1);
	this.cylinderAppearance.setShininess (20);
	this.cylinderAppearance.loadTexture("resources/images/brick.png");

	//Enable Textures
	this.enableTextures (true);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(1,1,1, 1.0);
	//this.setGlobalAmbientLight(0,0,0, 1.0);
	
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
	
};


LightingScene.prototype.update = function (currTime){
	this.clock.update(currTime);

};

LightingScene.prototype.doSomething = function (){
	console.log("Doing something...");
};