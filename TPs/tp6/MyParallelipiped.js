/**
 * MyParallelipiped
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyParallelipiped(scene, x, y, z) {
	CGFobject.call(this,scene);
	
	this.x = x || 1;
	this.y = y || 1;
	this.z = z || 1;
	this.cube= new MyUnitCubeQuad(this.scene);


	
};

MyParallelipiped.prototype = Object.create(CGFobject.prototype);
MyParallelipiped.prototype.constructor=MyParallelipiped;

MyParallelipiped.prototype.display = function () {

	//Parallelipiped
	this.scene.pushMatrix();
		this.scene.scale(this.x, this.y, this.z);
		this.cube.display();
	this.scene.popMatrix();

};