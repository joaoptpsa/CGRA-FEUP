/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.cube= new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	// LEGS
	this.scene.pushMatrix();
		this.scene.translate(2.35,1.75,1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2.35,1.75,-1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.35,1.75,1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.35,1.75,-1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.cube.display();
	this.scene.popMatrix();

		// TABLE
	this.scene.pushMatrix();
		this.scene.translate(0,3.65,0);
		this.scene.scale(5,0.3,3);
		this.cube.display();
	this.scene.popMatrix();

};