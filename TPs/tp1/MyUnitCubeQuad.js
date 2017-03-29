/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad= new MyQuad(this.scene);
	//this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {
	this.deg2rad=Math.PI/180.0;
	var a_rad = 90 * this.deg2rad;
	var a_rad2 = 180 * this.deg2rad;
	
	// x front face
	this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(a_rad,0,1,0);
		this.quad.display();
	this.scene.popMatrix();


	//x back face
	this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(a_rad,0,-1,0);
		this.quad.display();
	this.scene.popMatrix();

	//y back face
	this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(a_rad,1,0,0);
		this.quad.display();
	this.scene.popMatrix();

	//y front face
	this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(a_rad,-1,0,0);
		this.quad.display();
	this.scene.popMatrix();

	//z front face
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad.display();
	this.scene.popMatrix(); 

	//z back face 
	this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(a_rad2,1,0,0);
		this.quad.display();
	this.scene.popMatrix();
};
