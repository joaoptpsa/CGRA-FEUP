var degToRad = Math.PI / 180.0;
/**

 * MyFish
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFish(scene) {
	CGFobject.call(this,scene);

	this.circle = new MyCircle (this.scene, 20, 0.5); //radius = 0.5 ; diameter = 1
	this.triangle = new MyTriangle (this.scene, 0.5, 0.2); //base = 0.5 ; height = 0.2
	
	this.materialBodyUp = new CGFappearance(this.scene);
	this.materialBodyUp.setAmbient(0.6, 0.32, 0.004,1);
	this.materialBodyUp.setSpecular(0.1,0.1,0.1,1);
	this.materialBodyUp.setDiffuse(0.8,0.8,0.8,1);
	this.materialBodyUp.setShininess(10);
	this.materialBodyUp.loadTexture("resources/images/fish_body_1.png");

	this.materialBodyDown = new CGFappearance(this.scene);
	this.materialBodyDown.setAmbient(0.6, 0.32, 0.004,1);
	this.materialBodyDown.setSpecular(0.1,0.1,0.1,1);
	this.materialBodyDown.setDiffuse(0.8,0.8,0.8,1);
	this.materialBodyDown.setShininess(10);
	this.materialBodyDown.loadTexture("resources/images/fish_body_2.png");

	this.materialTail = new CGFappearance(this.scene);
	this.materialTail.setAmbient(0.6, 0.32, 0.004,1);
	this.materialTail.setSpecular(0.1,0.1,0.1,1);
	this.materialTail.setDiffuse(0.8,0.8,0.8,1);
	this.materialTail.setShininess(10);
	this.materialTail.loadTexture("resources/images/fish_tail.png");
	
};

MyFish.prototype = Object.create(CGFobject.prototype);
MyFish.prototype.constructor=MyFish;

MyFish.prototype.display = function () {
	// Body 
	this.scene.pushMatrix();
		this.scene.rotate (90*degToRad, 0, 0, 1); //so it stands horizontal
		this.scene.scale(0.4,1,1);
		this.scene.rotate (180*degToRad, 0, 0, 1);
		this.materialBodyDown.apply();
		this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate (90*degToRad, 0, 0, 1); //so it stands horizontal
		this.scene.scale(0.4,1,1);
		this.scene.rotate (180*degToRad, 1, 0, 0);
		this.materialBodyUp.apply();
		this.circle.display();
	this.scene.popMatrix();
	
	//Tail
	this.scene.pushMatrix();
		this.scene.rotate (90*degToRad, 0, 0, 1); //so it stands horizontal
		this.scene.translate(0,-0.55,0); //0.55 instead of 0.6 so the tail blends a bit with the body
		this.materialTail.apply();
		this.triangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate (90*degToRad, 0, 0, 1); //so it stands horizontal
		this.scene.translate(0,-0.55,0);
		this.scene.rotate (180*degToRad, 0, 1, 0);
		this.materialTail.apply();
		this.triangle.display();
	this.scene.popMatrix();
};