var degToRad = Math.PI / 180.0;
/**

 * MyFish
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFish(scene) {
	CGFobject.call(this,scene);

	this.circle = new MyCircle (this.scene, 20, 1);
	this.triangle = new MyTriangle (this.scene);
	
	this.materialBody = new CGFappearance(this.scene);
	this.materialBody.setAmbient(0.6, 0.32, 0.004,1);
	this.materialBody.setSpecular(0.1,0.1,0.1,1);
	this.materialBody.setDiffuse(0.8,0.8,0.8,1);
	this.materialBody.setShininess(10);
	this.materialBody.loadTexture("resources/images/table.png");

	this.materialTail = new CGFappearance(this.scene);
	this.materialTail.setAmbient(0.6, 0.32, 0.004,1);
	this.materialTail.setSpecular(0.1,0.1,0.1,1);
	this.materialTail.setDiffuse(0.8,0.8,0.8,1);
	this.materialTail.setShininess(10);
	this.materialTail.loadTexture("resources/images/table.png");
	
};

MyFish.prototype = Object.create(CGFobject.prototype);
MyFish.prototype.constructor=MyFish;

MyFish.prototype.display = function () {
	// Body 
	this.scene.pushMatrix();
		//this.scene.translate(2.35,1.75,1.35);
		//this.scene.scale(0.3,3.5,0.3);
		//this.materialBody.apply();
		this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		//this.scene.translate(2.35,1.75,1.35);
		//this.scene.scale(0.3,3.5,0.3);
		this.scene.rotate (180*degToRad, 1, 0, 0);
		//this.materialBody.apply();
		this.circle.display();
	this.scene.popMatrix();
	
	//Tail
	this.scene.pushMatrix();
		//this.scene.scale(0.3,3.5,0.3);
		//this.materialTail.apply();
		this.triangle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		//this.scene.scale(0.3,3.5,0.3);
		this.scene.rotate (180*degToRad, 1, 0, 0);
		//this.materialTail.apply();
		this.triangle.display();
	this.scene.popMatrix();
};