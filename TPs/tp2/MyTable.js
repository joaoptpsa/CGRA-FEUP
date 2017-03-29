/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.cube= new MyUnitCubeQuad(this.scene);

	this.materialBoard = new CGFappearance(this.scene);
	this.materialBoard.setAmbient(0.6, 0.32, 0.004,1);
	this.materialBoard.setSpecular(0.1,0.1,0.1,1);
	this.materialBoard.setDiffuse(0.8,0.8,0.8,1);
	this.materialBoard.setShininess(1);

	
	this.materialLegs = new CGFappearance(this.scene);
	this.materialLegs.setAmbient(0.33, 0.33, 0.33, 1);
	this.materialLegs.setSpecular(0.9,0.9,0.9,1);	
	this.materialLegs.setDiffuse(0.3,0.3,0.3,1);	
	this.materialLegs.setShininess(30);
	
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	// LEGS
	this.scene.pushMatrix();
		this.scene.translate(2.35,1.75,1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.materialLegs.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2.35,1.75,-1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.materialLegs.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.35,1.75,1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.materialLegs.apply();
		this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.35,1.75,-1.35);
		this.scene.scale(0.3,3.5,0.3);
		this.materialLegs.apply();
		this.cube.display();
	this.scene.popMatrix();

		// TABLE
	this.scene.pushMatrix();
		this.scene.translate(0,3.65,0);
		this.scene.scale(5,0.3,3);
		
		this.materialBoard.apply();
		this.cube.display();
	this.scene.popMatrix();

};